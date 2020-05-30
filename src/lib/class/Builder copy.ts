import Thief, { IThief } from "./Thief";
import * as path from "path";
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
    dataEntryID: string;
}



console.log(path.relative('localhost/wordpress/assets', 'localhost/wordpress/index.php/abos/'));


class DataURLManager {

    private entrys: {[string: string]: 
        {
            url:  string,
            type: string,
            data: Blob|string
        }
    } = {};

    create(url: string, data: Blob|string, type: string = "unknown"){
        let id = (Object.keys(this.entrys).length +1).toString();
        this.entrys[id] = { type, data, url };
        return id;
    }

    getDataByEntryID(id: string){
        return this.entrys[id].data;
    }

    getEntryByID(id: string){
        return this.entrys[id];
    }

    getDataEntryByType(type: string){
        return Object.values(this.entrys).filter(dataValue => dataValue.type === type);
    }

    getDataEntrys(){
        return Object.values(this.entrys);
    }

    getDataEntryIDs(){
        return Object.keys(this.entrys);
    }

    updateDataByID(id: string, data: Blob|string){
        this.entrys[id].data = data;
    }

}

export default class Builder {

    private tree:         IBuilderFolder;
    private thief:        Thief;
    private jsZip:        any;
    private rootURL:      URL;
    private dataURLManager = new DataURLManager();

    constructor(thief: Thief){
        this.thief      = thief;
        this.rootURL    = this.thief.getStartPageDocument().getRootURL();
        this.tree       = this.createFolder(this.rootURL.host); 
        
        console.log(path);
        
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
                this.addFileToFolder(this.getFilenameFromLink(asset.link), this.dataURLManager.create(hrefPart, asset.data as Blob), asset.type, folder);
            }

            for (const pageDocument of this.thief.getPageDocuments()) {
                let hrefPart          = this.getHrefPartFromLink(pageDocument.getNormalizeHref());
                let folderNames       = this.getFolderNamesFromHrefPart(hrefPart);    
                let folder            = this.createFolderRecurively(folderNames); 
                // this.addFileToFolder(this.getFilenameFromLink(hrefPart), this.dataURLManager.create(hrefPart, pageDocument.getHTML(), "html") , 'string', folder);
                this.addFileToFolder(this.getFilenameFromLink(hrefPart), pageDocument.getHTMLWithLocalLinks(), 'string', folder);
            }  

            
            // for (const htmlDataEntrys of this.dataURLManager.getDataEntryByType("html")) {
            //     let html = htmlDataEntrys.data as string;
                
            //     for (const dataEntryID of dataEntryIDs) {
            //         html = html.replace(this.dataURLManager.getEntryByID(dataEntryID).url, this.getLocalPathFromEntryID(dataEntryID));
            //     }                
                
            // }
    
            
            
            console.log(this.tree);
            
    
            // rootZipFolder = this.buildZipFile(rootZipFolder, this.tree);
            // this.jsZip.generateAsync({type:"blob"}).then(resolve).catch(reject);
        });
    }


    private getLocalPathFromEntryID(dataEntryID: string, paths: string[] = [])
    {
        
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


    private addFileToFolder(filename: string, dataEntryID: string, type: IThief["type"], folder: IBuilderFolder){        
        folder.files.push({
            name: filename,
            dataEntryID
        });        
    }    

    private buildZipFile(zipFolder: any, folder: IBuilderFolder){
        for (const file of folder.files) {
            zipFolder.file(file.name, this.dataURLManager.getDataByEntryID(file.dataEntryID));          
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