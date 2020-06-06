import RegExUtils                             from "../utils/RegExUtils";
import BuilderFileManager                     from "./BuilderFileManager";
import ThiefDocument, { IThiefDocumentParam } from "./ThiefDocument";
import PageLink                               from "./PageLink";
import StringUtils                            from "../utils/StringUtils";


export interface IPageDocumentParam extends IThiefDocumentParam{
    data:  string;
}


export default class PageDocument extends ThiefDocument{

    protected skipNormalizeExtension = ["html"];

    constructor(pageDocumentParam: IPageDocumentParam)
    {
        super(pageDocumentParam);
    }

    public getHTML(){
        return this.data as string;
    }

    public getHTMLWithLocalLinks(builderFileManager: BuilderFileManager){

        let html            = this.getHTML();
        let assetsPageLinks = this.getCssPageLinksFromCurrentOrigin();
        assetsPageLinks     = assetsPageLinks.concat(this.getScriptPageLinksFromCurrentOrigin());
        assetsPageLinks     = assetsPageLinks.concat(this.getImagePageLinksFromCurrentOrigin());        
        
        let currentBuilderFile = builderFileManager.getFileBySourceURL(this.url.origin+this.url.pathname);
        let currentFilePath    = currentBuilderFile.getPath();     
                   

        for (const pageLink of this.getPageLinksFromCurrentOrigin()) {
            let builderFile = builderFileManager.getFileBySourceURL(pageLink.getURL().origin+pageLink.getURL().pathname);
            let newPath     = this.getRelativePathToRootPath(currentFilePath, builderFile.getPath());
            html            = html.replace(pageLink.getSourceLink(), newPath);
        }

        for (const pageLink of assetsPageLinks) {
            let builderFile = builderFileManager.getFileBySourceURL(pageLink.getSourceLink());
            if(builderFile == null){
                console.log(pageLink.getSourceLink()+" not found");
                console.log(builderFileManager.getAll());
                
                throw "stop";
                
            }else{
                let newPath     = this.getRelativePathToRootPath(currentFilePath, builderFile.getPath());
                html = html.replace(pageLink.getSourceLink(), newPath);     
            }               
        }

        return html;
    }

    private getRegexByTagType(tag: string, attributeID: string)
    {
        return new RegExp("<"+tag+"\\s+(?:[^>]*?\\s+)?"+attributeID+"=([\"'])(.*?)\\1", "gm");
    }

    private getAllLinksFromHTML()
    {
        return RegExUtils.getMatchList(this.getHTML(), this.getRegexByTagType("a", "href"))
        .map((match: RegExpExecArray) => {
            return match[2];
        });
    }  
    
    private getAllCSSLinksFromHTML()
    {
        return RegExUtils.getMatchList(this.getHTML(), this.getRegexByTagType("link", "href"))
        .map((match: RegExpExecArray) => {
            return match[2];
        });
    }  

    private getAllScriptLinksFromHTML()
    {
        return RegExUtils.getMatchList(this.getHTML(), this.getRegexByTagType("script", "src"))
        .map((match: RegExpExecArray) => {
            return match[2];
        });
    }  

    private getAllImageLinksFromHTML()
    {
        return RegExUtils.getMatchList(this.getHTML(), this.getRegexByTagType("img", "src"))
        .map((match: RegExpExecArray) => {
            return match[2];
        });
    }  
    
    private getPageLinkFromLink(link: string): PageLink
    {
        if(!StringUtils.validURL(link) && StringUtils.validURL(this.getRootHref()+link)){
            link = this.getRootHref()+link;
        }
        return new PageLink(link);
    }

    private getPageLinksFromLinks(links: string[]): PageLink[]
    {
        let pageLinks: PageLink[] = [];
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

    private isURLfromCurrentOrigin(url: URL){
        return url.origin == this.url.origin;
    }

    private filterPageLinksFromCurrentOrigin(pageLinks: PageLink[]){
        return pageLinks.filter((e: PageLink) => this.isURLfromCurrentOrigin(e.getURL()));
    }

    public getPageLinksFromCurrentOrigin()
    {
        return this.filterPageLinksFromCurrentOrigin(this.getPageLinks());
    }

    public getCssPageLinks(){
       let cssLinks = this.getAllCSSLinksFromHTML();
       return this.getPageLinksFromLinks(cssLinks);
    }

    public getCssPageLinksFromCurrentOrigin(){
        return this.filterPageLinksFromCurrentOrigin(this.getCssPageLinks());
    }

    public getScriptPageLinks(){
        let scriptLinks = this.getAllScriptLinksFromHTML();
        return this.getPageLinksFromLinks(scriptLinks);
    }

    public getScriptPageLinksFromCurrentOrigin(){
        return this.filterPageLinksFromCurrentOrigin(this.getScriptPageLinks());
    }

    public getImagePageLinks(){
        let imageLinks = this.getAllImageLinksFromHTML();
        return this.getPageLinksFromLinks(imageLinks);
    }

    public getImagePageLinksFromCurrentOrigin(){
        return this.filterPageLinksFromCurrentOrigin(this.getImagePageLinks());
    }
    


}