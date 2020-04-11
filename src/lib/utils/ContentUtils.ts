import LoggerUtils from "./LoggerUtils";

interface IContentUtils{
    callback(response: any): void;
}

export default class ContentUtils {

    static sendMessage(object: any, callback?: IContentUtils["callback"])
    {
        chrome.runtime.sendMessage(object, function(response) {
            LoggerUtils.log("Response: ", response);
            if(callback){                
                callback(response);
            }
        });
    }

}