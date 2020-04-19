import ContentServer          from "../lib/class/ContentServer";
import LoggerUtils            from "../lib/utils/LoggerUtils";
import Thief, { IThiefAsset } from "../lib/class/Thief";
import Builder                from "../lib/class/Builder";


declare global {
    interface Window { 
        pageThief: {
            zipBlob: Blob|null;
        }      
    }
}

window["pageThief"] = {
    zipBlob: null
};

const contentServer = new ContentServer();

setTimeout(async () => {
        
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
        }    
    } catch (error) {
        LoggerUtils.error(error); 
    }


}, 3000);
