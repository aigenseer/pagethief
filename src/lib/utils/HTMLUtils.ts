
import PageDocument, { IPageDocumentParam } from "../class/PageDocument";

export default class PageDocumentUtils {

    static getPageDocumentParameterFromCurrentDocument(): IPageDocumentParam
    {
        return {
            html:   document.documentElement.outerHTML, 
            origin: window.location.origin,
            href:   window.location.href,
        };
    } 

    static getPageDocumentFromCurrentDocument(): PageDocument
    {
        return new PageDocument(PageDocumentUtils.getPageDocumentParameterFromCurrentDocument());
    }   

}