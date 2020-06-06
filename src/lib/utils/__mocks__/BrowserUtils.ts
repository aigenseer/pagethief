import { IContentUtils, IBrowserUtils }  from "../BrowserUtils";
import IBrowser                          from "../../../interface/IBrowser";
import { chrome }                        from '@bumble/jest-chrome';

export interface IBrowserSenderMock {
    tab: {
        id: number
    }
}

export default class BrowserUtils {

    static senderMock: IBrowserSenderMock = {
        tab: {
            id: 100
        }
    };

    static onMessage(onListen?: IContentUtils["onListen"])
    {
        chrome.runtime.sendMessage.mockImplementation((msg: IBrowser["msg"], sendResponse: IBrowser["sendResponse"]) => {
            onListen(msg, BrowserUtils.senderMock, sendResponse);
        });
    }

    static getCurrentTab(cb: IBrowserUtils["tabCallback"])
    {
        cb(BrowserUtils.senderMock.tab as chrome.tabs.Tab);
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
    

}