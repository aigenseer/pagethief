import ContentServer  from "../lib/class/ContentServer";
import PageDocument   from "../lib/class/PageDocument";

const contentServer = new ContentServer();
setTimeout(() => {
    
    contentServer.getAnalysisFromCurrentClient( pageDocumentParam => {
        
        let startPageDocument: PageDocument = new PageDocument(pageDocumentParam);
        console.log("getPageLinks",       startPageDocument.getPageLinks());
        console.log("getCssPageLinks",    startPageDocument.getCssPageLinks());
        console.log("getScriptPageLinks", startPageDocument.getScriptPageLinks());
        console.log("getImagePageLinks",  startPageDocument.getImagePageLinks());
        
    });

}, 3000);
