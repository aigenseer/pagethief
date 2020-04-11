import LoggerUtils from "./utils/LoggerUtils";



export default class ContentScriptWorker {
    
    static fetchPage(url: string)
    {
        return document.documentElement.innerHTML;
    }

}