import LoggerUtils  from "./LoggerUtils";
import IBrowser     from "../../interface/IBrowser";

export interface IBrowserUtils{
    tabCallback(tab: chrome.tabs.Tab): void
    tabIDCallback(tabID: number|null): void;
    sendMessageCallback(response: any): void;
    onMessageListen(msg: IBrowser["msg"], sender: IBrowser["sender"], sendResponse: IBrowser["sendResponse"]): void;
    response: {
        task: string,
        param: any|null
    }
}


export default class BrowserUtils {
    
    static onMessage(onListen?: IBrowserUtils["onMessageListen"])
    {
        chrome.runtime.onMessage.addListener((msg: IBrowser["msg"], sender: IBrowser["sender"], sendResponse: IBrowser["sendResponse"]) => {
            LoggerUtils.log("Received %o from %o, frame", msg, sender.tab, sender.frameId)
            onListen(msg, sender, sendResponse);
            return true;
        });
    }

    static getCurrentTab(cb: IBrowserUtils["tabCallback"])
    {
        chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true}, function(tabs) { 
            let tab: chrome.tabs.Tab = null;
            if(tabs && tabs.length > 0){
               tab = tabs[0];
            }            
            cb(tab);
        })
    }

    static getCurrentTabID(cb: IBrowserUtils["tabIDCallback"]){
        BrowserUtils.getCurrentTab(tab => {
            let tabId = null;
            if(tab!=null){
                tabId = tab.id;
            }
            cb(tabId);
        })
    }

    static sendMessage(task: string, param: any|null, callback?: IBrowserUtils["sendMessageCallback"])
    {
        chrome.runtime.sendMessage({task, param}, function(response) {
            LoggerUtils.log("Response: ", response);
            if(callback){                
                callback(response);
            }
        });
    }

    static getBackground(){
        return chrome.extension.getBackgroundPage()
    }

}