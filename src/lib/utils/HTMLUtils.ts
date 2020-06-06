
import PageDocument, { IPageDocumentParam } from "../class/PageDocument";

export default class HTMLUtils {

    static getPageDocumentParameterFromCurrentDocument(): IPageDocumentParam
    {
        return {
            data:  document.documentElement.outerHTML, 
            url:   new URL(window.location.href),
        };
    } 

    static createPageDocumentParam(link: string, html: string): IPageDocumentParam
    {
        return {
            data:   html, 
            url:    new URL(link)
        };
    }

    static createPageDocument(link: string, html: string): PageDocument
    {
        return new PageDocument(HTMLUtils.createPageDocumentParam(link, html));
    }

    static getPageDocumentFromCurrentDocument(): PageDocument
    {
        return new PageDocument(HTMLUtils.getPageDocumentParameterFromCurrentDocument());
    }   

}