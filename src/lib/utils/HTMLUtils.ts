
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

    static createPageDocumentParam(link: string, html: string): IPageDocumentParam
    {
        let url = new URL(link);
        return {
            html:   html, 
            origin: url.origin,
            href:   url.href,
        };
    }

    static createPageDocument(link: string, html: string): PageDocument
    {
        return new PageDocument(PageDocumentUtils.createPageDocumentParam(link, html));
    }

    static getPageDocumentFromCurrentDocument(): PageDocument
    {
        return new PageDocument(PageDocumentUtils.getPageDocumentParameterFromCurrentDocument());
    }   

}