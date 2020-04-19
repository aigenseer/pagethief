import Thief, { IThief } from "./Thief";
const JSZip = require("jszip");


export interface IBuilder{}

export interface IBuilderFolder{
     name: string;
     files: IBuilderFile[];
     childrenFolders: {
         [key: string]: IBuilderFolder
     }
}

export interface IBuilderFile{
    name: string;
    data: string|Blob;
}

export default class Builder {

    private tree:       IBuilderFolder;
    private thief:      Thief;
    private jsZip:      any;
    private rootURL:    URL;

    constructor(thief: Thief){
        this.thief      = thief;
        this.rootURL    = this.thief.getStartPageDocument().getRootURL();
        this.tree       = this.createFolder(this.rootURL.host);
    }

    public getBlob(): Promise<Blob>
    {
        return new Promise((resolve, reject) => {
            this.jsZip = new JSZip();
            let rootZipFolder = this.jsZip.folder(this.rootURL.hostname);
    
            for (const asset of this.thief.getAssets()) {
                let hrefPart     = this.getHrefPartFromLink(asset.link);            
                let folderNames  = this.getFolderNamesFromHrefPart(hrefPart);                
                let folder       = this.createFolderRecurively(folderNames);   
                this.addFileToFolder(this.getFilenameFromLink(asset.link), asset.data as Blob, asset.type, folder);
            }
    
            for (const pageDocument of this.thief.getPageDocuments()) {
                let hrefPart     = this.getHrefPartFromLink(pageDocument.getNormalizeHref());
                let folderNames  = this.getFolderNamesFromHrefPart(hrefPart);                
                let folder       = this.createFolderRecurively(folderNames);                
                this.addFileToFolder(this.getFilenameFromLink(pageDocument.getRootHref()), pageDocument.getHTMLWithLocalLinks(), 'string', folder);
            }   
    
            rootZipFolder = this.buildZipFile(rootZipFolder, this.tree);
            this.jsZip.generateAsync({type:"blob"}).then(resolve).catch(reject);
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

    private createFolder(folderName: string): IBuilderFolder
    {
        return {
            name: folderName,
            files: [],
            childrenFolders: {}
        }
    }

    private createFolderRecurively(folderNames: string[], parentFolder: IBuilderFolder = this.tree): IBuilderFolder
    {
        if(folderNames.length > 0){
            let folderName = folderNames.shift();
            if(!parentFolder.childrenFolders.hasOwnProperty(folderName)){
                let folder                               = this.createFolder(folderName);
                parentFolder.childrenFolders[folderName] = folder;
            }            
            return this.createFolderRecurively(folderNames, parentFolder.childrenFolders[folderName]);
        }  
        return parentFolder;   
    }


    private addFileToFolder(filename: string, data: string|Blob, type: IThief["type"], folder: IBuilderFolder){        
        folder.files.push({
            name: filename,
            data
        });        
    }    

    private buildZipFile(zipFolder: any, folder: IBuilderFolder){
        for (const file of folder.files) {
            zipFolder.file(file.name, file.data);          
        }
        const childrenFolderNames = Object.keys(folder.childrenFolders);
        for (const childrenFolderName of childrenFolderNames) {
            const childrenFolder    = folder.childrenFolders[childrenFolderName];
            let childrenZipFolder   = zipFolder.folder(childrenFolderName);
            childrenZipFolder       = this.buildZipFile(childrenZipFolder, childrenFolder);
        }
        return zipFolder;
    }

}