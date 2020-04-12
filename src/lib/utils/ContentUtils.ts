import LoggerUtils from "./LoggerUtils";

interface Response {
    task: string,
    param: any|null
}

interface IContentUtils{
    callback(response: any): void;
}

export default class ContentUtils {

    static sendMessage(task: string, param: Response["param"], callback?: IContentUtils["callback"])
    {
        chrome.runtime.sendMessage({task, param}, function(response) {
            LoggerUtils.log("Response: ", response);
            if(callback){                
                callback(response);
            }
        });
    }

   static getConnection(){
        let connection = new ContentConnection();
        connection.openConnection();
        return connection;
   }

}


export interface IContentConnection{
    callback(param: Response["param"]): Response["param"]
}

export class ContentConnection{

    private currentResponse: Response = null; 
    private TASK_MAP: { [key: string]: IContentConnection["callback"] } = {
        onAnalysis: ()=>{}
    }  

    constructor(){
        this.handleRouting = this.handleRouting.bind(this);
    }

    private handleRouting(response: Response){
        if(response.task && Object.keys(this.TASK_MAP).includes(response.task)){
            let callParameter: Response["param"] = this.TASK_MAP[response.task](response.param);
            ContentUtils.sendMessage(response.task, callParameter, this.handleRouting);
        }else{
            throw "Response Task not found: "+JSON.stringify(response);
        }
    }
    
    public openConnection(){
        ContentUtils.sendMessage("openConnection", null, this.handleRouting);
    }

    public onGetAnalysis(callback: IContentConnection["callback"]){
        this.TASK_MAP.onAnalysis = callback;
    }

}