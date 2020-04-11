import LoggerUtils from "./LoggerUtils";
import IBrowser    from "../../interface/IBrowser";


interface IContentUtils{
    onListen(msg: IBrowser["msg"], sender: IBrowser["sender"], sendResponse: IBrowser["sendResponse"]): void;
}

export default class BackgroundUtils {

    static onMessage(onListen?: IContentUtils["onListen"])
    {
        chrome.runtime.onMessage.addListener((msg: IBrowser["msg"], sender: IBrowser["sender"], sendResponse: IBrowser["sendResponse"]) => {
            LoggerUtils.log("Received %o from %o, frame", msg, sender.tab, sender.frameId)
            onListen(msg, sender, sendResponse);
            return true;
        });
    }

}