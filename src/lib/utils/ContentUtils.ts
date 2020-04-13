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
    
    private TASK_MAP: { [key: string]: IContentConnection["callback"] } = {
        getCurrentPageDocumentParam: ()=>{},
        getData:() => {}
    }  

    constructor(){
        this.handleRouting = this.handleRouting.bind(this);
    }

    private handleRouting(response: Response){
        if(response.task && Object.keys(this.TASK_MAP).includes(response.task)){
            this.TASK_MAP[response.task](response.param).then(callParameter => {
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