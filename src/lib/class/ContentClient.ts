import IBrowser     from "../../interface/IBrowser";
import LoggerUtils  from "../utils/LoggerUtils";
import { IPageDocumentParam } from "./PageDocument";
import FormatUtils  from "../utils/FormatUtils";

export interface IContentTask{
    id: string;
    param: null|any;
    result: any|null
    onResultCallback(result: IContentTask["param"]): void;

}

export class ContentTask {
    
    private id: IContentTask["id"];
    private param: IContentTask["param"]  = null;
    private onResultCallback: IContentTask["onResultCallback"];

    constructor(id: IContentTask["id"], param: IContentTask["param"], onResultCallback: IContentTask["onResultCallback"]){
        this.id = id;
        this.param = param;
        this.onResultCallback = onResultCallback;
    }

    public getID(){
        return this.id;
    }

    public getParam(){
        return this.param;
    }

    public setResult(result: any|null){
        this.onResultCallback(result);
    }

    public run(sendResponse: IBrowser["sendResponse"]){
        sendResponse({ task: this.id,  param: this.param });
    }     
                
}

interface IContentClient{
    getCurrentPageDocumentParamCallback(pageDocumentParam: IPageDocumentParam): void;
}



export default class ContentClient {

    private id: string;
    private taskQueue: ContentTask[] = [];
    private currentTask: ContentTask = null;
    private currentResponse: null;

    constructor(id: string, currentResponse){
        this.id = id;
        this.currentResponse = currentResponse;
    }

    private startTask(){
        if(this.taskQueue.length > 0 && this.currentTask == null){
            let task         = this.taskQueue.shift();
            this.currentTask = task
            LoggerUtils.log("Client %s start task %s with param:", this.id, this.currentTask.getID(), this.currentTask.getParam());
            this.currentTask.run(this.currentResponse);    
        }        
    }

    public runTask(id: IContentTask["id"], param: IContentTask["param"], onResultCallback: IContentTask["onResultCallback"]){
        LoggerUtils.log("Client %s add task %s with param:", this.id, id, param);
        this.taskQueue.push(new ContentTask(id, param, onResultCallback));
        this.startTask();
    }

    public runTaskPromise(id: IContentTask["id"], param: IContentTask["param"]): Promise<IContentTask["param"]>
    {
        return new Promise(async (resolve, reject) => {
            this.runTask(id, param, (result) => resolve(result));
        });        
    }


    public responseTask(taskID: string, result: any|null, currentResponse){
        LoggerUtils.log("Client %s response task %s with result ", this.id, taskID, result);
        this.currentTask.setResult(result);
        this.currentTask     = null;
        this.currentResponse = currentResponse;
        this.startTask();              
    }


    public getCurrentPageDocumentParam(cb: IContentClient["getCurrentPageDocumentParamCallback"]){
        this.runTask("getCurrentPageDocumentParam", null, (param) => {
            cb(param);                    
        })
    }

  
    


    public getData(link: string, type: 'base64'|'string'|'blob'|'dataURL'): Promise<string|Blob>
    {
        return new Promise(async (resolve, reject) => {
            try {
                let requestType = type;
                switch (type) {
                    case "blob":
                            requestType = "base64";
                        break;            
                    default:
                        break;
                }
                let param = await this.runTaskPromise("getData", { link, type: requestType });
                switch (type) {
                    case "blob":
                            if(param != null){
                                param = await FormatUtils.getBlobFromBase64(param);
                            }                        
                        break;                
                    default:
                        break;
                }   
                resolve(param);   
            } catch (error) {
                reject(error)
            }                                        
        });        
    }

}