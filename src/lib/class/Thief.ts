import LoggerUtils                                     from "../utils/LoggerUtils";
import PageDocument, { IPageLink, IPageDocumentParam } from "./PageDocument";
import HTMLUtils                                       from "../utils/HTMLUtils";
import ContentClient                                   from "./ContentClient";

export interface IThiefAsset {
    link: string;
    data: Blob;
    type: IThief["type"]
}

export interface IThief{
    type: 'base64'|'string'|'blob',    
    assetQueue: {
        link: string;
        type: IThief["type"]
    }
    options: {
        recursive?:       boolean;
        donwloadImages?:  boolean;
        downloadCSS?:     boolean;
        downloadScripts?: boolean;
    }
}

const DEFAULT_THIEF_OPTIONS: IThief["options"] = {
    recursive:       true,
    donwloadImages:  true,
    downloadCSS:     true,
    downloadScripts: true
}


export default class Thief {
    
    private pageDocuments:     PageDocument[]                           = [];
    private assets:            IThiefAsset[]                        = [];
    private assetQueue:        IThief["assetQueue"][]                   = [];
    private linkBuckets:       string[]                                 = [];
    private queueURL:          { link: string, type: IThief["type"] }[] = [];
    private startPageDocument: PageDocument;
    private options:           IThief["options"];
    private finishCallback:    Function = () => {};
    private contentClient:     ContentClient;
    
    constructor(contentClient: ContentClient, pageDocumentParam: IPageDocumentParam, options: IThief["options"] = {})
    {
        this.options           = Object.assign({}, DEFAULT_THIEF_OPTIONS, options);
        this.startPageDocument = new PageDocument(pageDocumentParam);
        this.contentClient     = contentClient;
    }

    public start(cb: Function){
        this.finishCallback = cb;
        LoggerUtils.log("Start download page with options", this.options);
        let pageLinks = this.startPageDocument.getPageLinksFromCurrentOrigin();
        this.addPageLinksToQueue(pageLinks);
        LoggerUtils.log("URL queue: %d", this.queueURL.length);
        this.fetchPages();    
    }

    public getStartPageDocument(){
        return this.startPageDocument;
    }

    public getPageDocuments(){
        return this.pageDocuments;
    }

    public getAssets(){
        return this.assets;
    }

    private addPageLinksToQueue(pageLinks: IPageLink[]){
        for (const pageLink of pageLinks) {
            this.addLinkToQueue(pageLink.url.origin+pageLink.url.pathname, "string");
        }            
    }    

    private addLinkToQueue(link: string, type: IThief["type"] ){
        if( this.linkBuckets.indexOf(link) < 0 ){
            this.linkBuckets.push(link);          
            this.queueURL.push({ link, type });
        }
    }

    private fetchPages(){
        if(this.queueURL.length > 0){
            let task = this.queueURL.shift();         
            this.contentClient.getData(task.link, task.type).then( (data) => {
                if(data != null){
                    let currentPageDocument = HTMLUtils.createPageDocument(task.link, data as string);
                    this.pageDocuments.push(currentPageDocument);
    
                    if(this.options.recursive){
                        this.addPageLinksToQueue( currentPageDocument.getPageLinksFromCurrentOrigin() );
                    }
                }
                this.fetchPages();
            }).catch(() => this.fetchPages());
        }else{
            LoggerUtils.log("Finished download %d pages", this.pageDocuments.length);
            this.startFetchAssets();
           
        }
    }

    private getAssetsQueueFromPageDocuments(){
        let assets: IThief["assetQueue"][] = [];

        for (const pageDocument of this.pageDocuments) {

            if(this.options.downloadCSS){
                assets = assets.concat(pageDocument.getCssPageLinksFromCurrentOrigin().map((pageLink: IPageLink) =>  ({
                    link: pageLink.url.href,
                    type: 'blob'
                })));
            }

            if(this.options.downloadScripts){
                assets = assets.concat(pageDocument.getScriptPageLinksFromCurrentOrigin().map((pageLink: IPageLink) =>  ({
                    link: pageLink.url.href,
                    type: 'blob'
                })))
            }

            if(this.options.donwloadImages){
                assets = assets.concat(pageDocument.getImagePageLinksFromCurrentOrigin().map((pageLink: IPageLink) =>  ({
                    link: pageLink.url.href,
                    type: 'blob'
                })))
            }
        }            
        let assetLinks = assets.map(asset => asset.link);

        return assets.filter((asset, index) => assetLinks.indexOf(asset.link) === index);

    }

    private startFetchAssets(){
        this.assetQueue = this.getAssetsQueueFromPageDocuments();   
        LoggerUtils.log("Start download assets %d", this.assetQueue.length);       
        this.fetchAssets();        
    }

    private fetchAssets(){
        if(this.assetQueue.length > 0){
            let task = this.assetQueue.shift();
            this.contentClient.getData(task.link, task.type).then( (data) => {
               if(data != null){
                    this.assets.push({ ...task, data: data as Blob })
               }               
               this.fetchAssets();
            }).catch(() => this.fetchAssets());
        }else{
            LoggerUtils.log("Finished to download %d assets", this.assets.length);   
            this.finishCallback();
        }
    }   

}