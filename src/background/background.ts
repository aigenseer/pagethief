import ContentServer  from "../lib/class/ContentServer";
import PageDocument, { IPageLink, IPageDocumentParam } from "../lib/class/PageDocument";
import LoggerUtils    from "../lib/utils/LoggerUtils";

const contentServer = new ContentServer();

function getChildrenPages(pageLinks: IPageLink[])
{

     
}


interface IThief{
    type: 'binary'|'string'
}

class Thief {
    
    private linkPages:  { [key: string]: string } = {};
    private queueURL:   { url: string, type: IThief["type"] }[] = [];
    private startPageDocument: PageDocument

    constructor(pageDocumentParam: IPageDocumentParam)
    {
        this.startPageDocument = new PageDocument(pageDocumentParam);
    }

    public start(){
        let pageLinks = this.startPageDocument.getPageLinksFromCurrentOrigin();
        for (const pageLink of pageLinks) {
            this.addLinkToQueue(pageLink.url.href, "string");
        }
        this.run();
       
    }

    private addLinkToQueue(url: string, type: IThief["type"] ){
        if( !Object.keys(this.linkPages).includes(url) ){
            this.queueURL.push({ url, type });
        }
    }

    private run(){
        if(this.queueURL.length > 0){
            let task = this.queueURL.shift();
            contentServer.getData(task.url, task.type).then( (data) => {
                this.linkPages[task.url] = data as string;

                this.run();
            });
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
