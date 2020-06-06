import Thief, { IThief } from "./Thief";
import BuilderStorage    from "./BuilderStorage";
import BuilderFolder     from "./BuilderFolder";
import BuilderFile       from "./BuilderFile";


export default class Builder {

    private storage:    BuilderStorage;
    private thief:      Thief;
    private rootURL:    URL;

    constructor(thief: Thief){
        this.thief      = thief;
        this.rootURL    = this.thief.getStartPageDocument().getRootURL();
        this.storage    = new BuilderStorage(this.rootURL.host);
    }

    public getBlob(): Promise<Blob>
    {
        return new Promise((resolve, reject) => {
            
            for (const assetDocument of this.thief.getAssetDocuments()) {
                let hrefPart      = this.getHrefPartFromLink(assetDocument.getRootHref()); 
                let builderFolder = this.createFolderRecurively(hrefPart);   
                builderFolder.createFile(this.getFilenameFromLink(assetDocument.getRootHref()), assetDocument.getData(), assetDocument.getRootHref());
            }                            

            let pageDocumentFiles: BuilderFile[] = [];
            for (const pageDocument of this.thief.getPageDocuments()) {
                let hrefPart      = this.getHrefPartFromLink(pageDocument.getNormalizeHref());
                
                let builderFolder = this.createFolderRecurively(hrefPart);
                let builderFile   = builderFolder.createFile(this.getFilenameFromLink(pageDocument.getRootHref()), pageDocument.getHTML(), pageDocument.getRootHref());
                pageDocumentFiles.push(builderFile);
            }     
            
            console.log("==getHTMLWithLocalLinks==");
            
            
            const sourceURLBuilderFiles = this.storage.getBuilderFileManager().getAll();

            for (const pageDocument of this.thief.getPageDocuments()) {
                let builderFile = sourceURLBuilderFiles[pageDocument.getRootHref()];
                builderFile.updateData(pageDocument.getHTMLWithLocalLinks(this.storage.getBuilderFileManager()));
            } 

            this.storage.getZipBlob().then(resolve).catch(reject);

        });
    }

    private getFilenameFromLink(link: string){
        return link.split('/').pop();
    }

    private getHrefPartFromLink(link: string){
        return link.replace(this.rootURL.origin, "");
    }
    
    private getFolderNamesFromHrefPart(hrefPart: string){
        let folderNames = hrefPart.split('/').filter(s => s.length > 0);            
            folderNames.pop();  
        return folderNames; 
    }

    private createFolderRecurively(hrefPart: string): BuilderFolder
    {
        let folderNames   = this.getFolderNamesFromHrefPart(hrefPart); 
        return this.storage.createFolderRecurively(folderNames);   
    } 

}