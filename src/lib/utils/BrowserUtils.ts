export interface IBrowserUtils{
    tabCallback(tab: chrome.tabs.Tab): void
    tabIDCallback(tabID: number|null): void;
}


export default class BrowserUtils {

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

}