import * as url      from "url";
import * as path     from "path";
import LinkUtils     from "../utils/LinkUtils";

export interface IThiefDocumentParam{
    data:   string|Blob;
    url:    URL;
}

export default class ThiefDocument {

    protected data:   IThiefDocumentParam["data"];    
    protected url:    IThiefDocumentParam["url"];
    protected skipNormalizeExtension: String[] = [];

    constructor(thiefDocumentParam: IThiefDocumentParam)
    {
        this.data    = thiefDocumentParam.data;
        this.url     = thiefDocumentParam.url;
    }

    public getData(){
        return this.data;
    }

    public getFullNormalizePathFromLink(url: URL){
        return [url.host, url.pathname].join("");        
    }

    public getRelativePathToRootPath(fromURL: string, toURL: string){
        let newPath = path.relative(fromURL, toURL)
        if(newPath.length == 0){
            newPath = toURL.split("/").slice(-1)[0];
        }
        let parts = newPath.split("/");
        if(parts.length > 0){
            parts.shift();
            newPath = parts.join("/");
        }
              
        return newPath;
    }

    public getNormalizeLink(link: string, appendFileName: string){
       return LinkUtils.getNormalizeLink(link, appendFileName, this.skipNormalizeExtension, this.getRootURL());       
    }

    public getNormalizeHref(){
        return this.getNormalizeLink(this.url.href, "index.html");
    }

    public getRootHref(){
        return this.url.href;
    }

    public getRootURL(){
        return this.getURLFromLink(this.getRootHref());
    }

    public getExtensionOrigin()
    {
        return window.location.origin;
    }

    protected getURLFromLink(link: string): URL
    {
        link = link.replace(this.getExtensionOrigin(), "");
        if(!link.includes(this.url.origin)){
            link = url.resolve(this.url.href, link);            
        }        
        return new URL(link);
    }

}