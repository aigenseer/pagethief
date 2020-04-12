const url = require('url');
import RegExUtils from "../utils/RegExUtils";

export interface IPageDocumentParam{
    html:   string;
    origin: string;
    href:   string;
}


export interface IPageLink{
    sourceLink: string,
    url: URL
}

export default class PageDocument {

    private html:   string;
    private origin: string;
    private href:   string;

    constructor(pageDocumentParam: IPageDocumentParam)
    {
        this.html    = pageDocumentParam.html;
        this.origin  = pageDocumentParam.origin;
        this.href    = pageDocumentParam.href;        
    }

    private getExtensionOrigin()
    {
        return window.location.origin;
    }

    private getAllLinksFromHTML()
    {
        const regExp = new RegExp("<a\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1", "gm");
        return RegExUtils.getMatchList(this.html, regExp).map((match: RegExpExecArray) => {
            return match[2];
        });
    }  
    
    private getAllCSSLinksFromHTML()
    {
        const regExp = new RegExp("<link\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1", "gm");
        return RegExUtils.getMatchList(this.html, regExp).map((match: RegExpExecArray) => {
            return match[2];
        });
    }  

    private getAllScriptLinksFromHTML()
    {
        const regExp = new RegExp("<script\\s+(?:[^>]*?\\s+)?src=([\"'])(.*?)\\1", "gm");
        return RegExUtils.getMatchList(this.html, regExp).map((match: RegExpExecArray) => {
            return match[2];
        });
    }  

    private getAllImageLinksFromHTML()
    {
        const regExp = new RegExp("<img\\s+(?:[^>]*?\\s+)?src=([\"'])(.*?)\\1", "gm");
        return RegExUtils.getMatchList(this.html, regExp).map((match: RegExpExecArray) => {
            return match[2];
        });
    }  

    private getURLFromLink(link: string): URL
    {
        link = link.replace(this.getExtensionOrigin(), "");
        if(!link.includes(this.origin)){
            link = url.resolve(this.href, link);            
        }
        return new URL(link);
    }
    
    private getPageLinkFromLink(link: string): IPageLink
    {
        return {
            sourceLink: link,
            url: this.getURLFromLink(link)
        }
    }

    private getPageLinksFromLinks(links: string[]): IPageLink[]
    {
        let pageLinks: IPageLink[] = [];
        for (const link of links) {
            pageLinks.push(this.getPageLinkFromLink(link));            
        }
        return pageLinks;
    }
    
    public getPageLinks()
    {
        let links = this.getAllLinksFromHTML();
        return this.getPageLinksFromLinks(links);
    }

    public getPageLinksFromCurrentOrigin()
    {
        let links = this.getAllLinksFromHTML();
        return this.getPageLinksFromLinks(links).filter((e: IPageLink) => {
            return e.url.origin == this.origin;
        })
    }

    public getCssPageLinks(){
       let cssLinks = this.getAllCSSLinksFromHTML();
       return this.getPageLinksFromLinks(cssLinks);
    }

    public getScriptPageLinks(){
        let scriptLinks = this.getAllScriptLinksFromHTML();
        return this.getPageLinksFromLinks(scriptLinks);
    }

    public getImagePageLinks(){
        let imageLinks = this.getAllImageLinksFromHTML();
        return this.getPageLinksFromLinks(imageLinks);
    }
    


}