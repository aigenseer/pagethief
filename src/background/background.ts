import ContentServer  from "../lib/class/ContentServer";
import PageDocument, { IPageLink, IPageDocumentParam } from "../lib/class/PageDocument";
import LoggerUtils    from "../lib/utils/LoggerUtils";
import HTMLUtils      from "../lib/utils/HTMLUtils";

const contentServer = new ContentServer();

interface IThief{
    type: 'base64'|'string',
    asset: {
        link: string;
        data: string
    }
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


class Thief {
    
    private pageDocuments:    PageDocument[] = [];
    private assets:           IThief["asset"][] = [];
    private assetQueue:       IThief["assetQueue"][] = [];
    private linkBuckets:      string[] = [];
    private queueURL:   { link: string, type: IThief["type"] }[] = [];
    private startPageDocument: PageDocument;
    private options: IThief["options"];

    constructor(pageDocumentParam: IPageDocumentParam, options: IThief["options"] = {})
    {
        this.options = Object.assign({}, DEFAULT_THIEF_OPTIONS, options);
        this.startPageDocument = new PageDocument(pageDocumentParam);
        
    }

    public start(){
        LoggerUtils.log("Start download page with options", this.options);
        let pageLinks = this.startPageDocument.getPageLinksFromCurrentOrigin();
        this.addPageLinksToQueue(pageLinks);
        LoggerUtils.log("URL queue: %d", this.queueURL.length);
        this.fetchPages();          
    }

    private addPageLinksToQueue(pageLinks: IPageLink[]){
        for (const pageLink of pageLinks) {
            this.addLinkToQueue(pageLink.url.href, "string");
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
            contentServer.getData(task.link, task.type).then( (data) => {
                let currentPageDocument = HTMLUtils.createPageDocument(task.link, data);
                this.pageDocuments.push(currentPageDocument);

                if(this.options.recursive){
                    this.addPageLinksToQueue( currentPageDocument.getPageLinksFromCurrentOrigin() );
                }

                this.fetchPages();
            });
        }else{
            LoggerUtils.log("Downloaded %d pages", this.pageDocuments.length);
            this.startFetchAssets();
           
        }
    }

    private getAssetsQueueFromPageDocuments(){
        let assets: IThief["assetQueue"][] = [];

        for (const pageDocument of this.pageDocuments) {

            if(this.options.downloadCSS){
                assets = assets.concat(pageDocument.getCssPageLinks().map((pageLink: IPageLink) =>  ({
                    link: pageLink.url.href,
                    type: 'string'
                })));
            }

            if(this.options.downloadScripts){
                assets = assets.concat(pageDocument.getScriptPageLinks().map((pageLink: IPageLink) =>  ({
                    link: pageLink.url.href,
                    type: 'string'
                })))
            }

            if(this.options.donwloadImages){
                assets = assets.concat(pageDocument.getImagePageLinks().map((pageLink: IPageLink) =>  ({
                    link: pageLink.url.href,
                    type: 'base64'
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
            contentServer.getData(task.link, task.type).then( (data) => {
               this.assets.push({
                link: task.link,
                data
               })
               this.fetchAssets();
            });
        }else{
            LoggerUtils.log("Downloaded %d assets", this.assets.length);   
        }
    }
    

}


setTimeout(() => {
    
    contentServer.getCurrentPageDocumentParam( async (pageDocumentParam) => {
        try {

            const thief = new Thief(pageDocumentParam);
            thief.start();

                       

            // console.log("getPageLinks",       startPageDocument.getPageLinksFromCurrentOrigin());
            // console.log("getCssPageLinks",    startPageDocument.getCssPageLinks());
            // console.log("getScriptPageLinks", startPageDocument.getScriptPageLinks());
            // console.log("getImagePageLinks",  startPageDocument.getImagePageLinks());
        } catch (error) {
            LoggerUtils.error(error); 
        }
    });

}, 3000);
