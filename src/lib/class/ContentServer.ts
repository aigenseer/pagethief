import BrowserUtils           from "../utils/BrowserUtils";
import BackgroundUtils        from "../utils/BackgroundUtils";
import IBrowser               from "../../interface/IBrowser";
import { IPageDocumentParam } from "./PageDocument";
import ContentClient          from "./ContentClient";
import LoggerUtils            from "../utils/LoggerUtils";

interface IContentServer{
    getCurrentClientCallback(client: ContentClient): void;
    getAnalysisFromCurrentClientCallback(pageDocumentParam: IPageDocumentParam): void;
}

export default class ContentServer {

    private client: { [key: string]: ContentClient } = {};
   
    constructor(){
        this.onConnect = this.onConnect.bind(this);
        BackgroundUtils.onMessage(this.onConnect);
    }

    private isNewClientID(clientID){
        return !Object.keys(this.client).includes(clientID);
    }
   
    private onConnect(response: IBrowser["msg"], sender: IBrowser["sender"], sendResponse: IBrowser["sendResponse"]){
        if(response.task){
            
            let clientID = sender.tab.id.toString();  

            switch (response.task) {
                case "openConnection":
                    if(this.isNewClientID(clientID)){
                        LoggerUtils.log("New client", clientID);
                        this.client[clientID] = new ContentClient(clientID, sendResponse);
                    } 
                    break;
            
                default:
                    if(!this.isNewClientID(clientID)){
                        LoggerUtils.log("Client response", response.param);
                        this.client[clientID].responseTask(response.task, response.param, sendResponse);
                    }
                    break;
            }                             
                       
        }else{
            LoggerUtils.error("Response Task not found: "+JSON.stringify(response));
        }
    }

    private getCurrentClient(cb: IContentServer["getCurrentClientCallback"] ){
        BrowserUtils.getCurrentTabID(tabID => {
            let client = null;
            if(tabID != null && Object.keys(tabID) ){
                client = this.client[tabID];               
            }else{
                LoggerUtils.warn("Current client not found on ContentServer::getCurrentClient");
            }     
            cb(client);
        });
    }
         
    public getAnalysisFromCurrentClient(cb: IContentServer["getAnalysisFromCurrentClientCallback"]){
        this.getCurrentClient(client => {
            if(client != null){
                client.runTask("onAnalysis", null, (param) => {
                    cb(param);                    
                })
            }else{
                LoggerUtils.warn("No client found");         
            }              
        });
    }


}

