import LoggerUtils from "./LoggerUtils";
import BrowserUtils, { IBrowserUtils } from "../utils/BrowserUtils";


export default class ContentUtils {

    static sendMessage(task: string, param: IBrowserUtils["response"]["param"], callback?: IBrowserUtils["sendMessageCallback"])
    {
        BrowserUtils.sendMessage(task, param, callback);
    }

   static getConnection(){
        let connection = new ContentConnection();
        connection.openConnection();
        return connection;
   }

   

}


export interface IContentConnection{
    callback(param: IBrowserUtils["response"]["param"]): IBrowserUtils["response"]["param"]
}

export class ContentConnection {
    
    private TASK_MAP: { [key: string]: IContentConnection["callback"] } = {
        getCurrentPageDocumentParam: ()=> { console.error("No listener found onRequireCurrentPageDocumentParam") },
        getData:() => { console.error("No listener found onFetchData") }
    }  

    constructor(){
        this.handleRouting = this.handleRouting.bind(this);
    }

    private handleRouting(response: IBrowserUtils["response"])
    {
        if(response.task && Object.keys(this.TASK_MAP).includes(response.task)){
            this.TASK_MAP[response.task](response.param).then((callParameter: IBrowserUtils["response"]["param"]) => {
                ContentUtils.sendMessage(response.task, callParameter, this.handleRouting);
            });
        }else{
            throw "Response Task not found: "+JSON.stringify(response);
        }
    }
    
    public openConnection(){
        ContentUtils.sendMessage("openConnection", null, this.handleRouting);
    }

    public onRequireCurrentPageDocumentParam(callback: IContentConnection["callback"]){
        this.TASK_MAP.getCurrentPageDocumentParam = callback;
    }

    public onFetchData(callback: IContentConnection["callback"]){
        this.TASK_MAP.getData = callback;
    }

}