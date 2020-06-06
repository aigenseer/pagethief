import ContentServer          from "../lib/class/ContentServer";
import LoggerUtils            from "../lib/utils/LoggerUtils";
import Thief                  from "../lib/class/Thief";
import Builder                from "../lib/class/Builder";


console.log("Background");


declare global {
    interface Window { 
        pageThief: {
            zipBlob: Blob|null;
            start: () => {};
        }      
    }
}

const contentServer = new ContentServer();

window["pageThief"] = {
    zipBlob: null,
    start: async () => {
        try {
            const currentClient = await contentServer.getCurrentClient();
    
            if(currentClient != null){
                currentClient.getCurrentPageDocumentParam( async (pageDocumentParam) => {
                    const thief = new Thief(currentClient, pageDocumentParam);
                    thief.start(() => {
                        const builder = new Builder(thief);
                        builder.getBlob().then(zipBlob => {
                            window.pageThief.zipBlob = zipBlob;                        
                        });
                    });
                })
            }else{
                console.warn("No client found");
            }    
        } catch (error) {
            LoggerUtils.error(error); 
        }

    }
};



