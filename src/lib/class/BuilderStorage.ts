import BuilderFolder      from "./BuilderFolder";
import BuilderFileManager from "./BuilderFileManager";
import * as JSZip         from "jszip";
import { resolve } from "dns";
import { rejects } from "assert";

export default class BuilderStorage {

    private root: BuilderFolder;
    private builderFileManager = new BuilderFileManager();

    constructor(rootFolderName: string){
        this.root = new BuilderFolder(null, rootFolderName, this.builderFileManager);
    }

    getBuilderFileManager(){
        return this.builderFileManager;
    }

    createFolder(folderName: string): BuilderFolder
    {
        return this.root.createFolder(folderName);
    }    

    createFolderRecurively(folderNames: string[], parentBuildFolder: BuilderFolder = this.root): BuilderFolder
    {
        if(folderNames.length > 0){
            let currentFolderName = folderNames.shift();
            if(!parentBuildFolder.existFolder(currentFolderName)){
                parentBuildFolder = parentBuildFolder.createFolder(currentFolderName);
            }else{
                parentBuildFolder = parentBuildFolder.getFolderByName(currentFolderName);
            }   
            if(parentBuildFolder != null){
                return this.createFolderRecurively(folderNames, parentBuildFolder);
            }                     
        }  
        return parentBuildFolder;   
    }

    getFileBySourceURL(sourceURL: string){
        return this.builderFileManager.getFileBySourceURL(sourceURL);
    } 

    getZipBlob(): Promise<Blob>
    {
        return new Promise((resolve, reject) => {
            let jsZip         = new JSZip();    
            let rootZipFolder = jsZip.folder(this.root.getFolderName());
            this.buildZipFile(rootZipFolder, this.root);
            jsZip.generateAsync({type: "blob"}).then(resolve).catch(reject);
        });        
    }

    buildZipFile(zipFolder: any, builderFolder: BuilderFolder){
        for (const builderFile of builderFolder.getFiles()) {
            zipFolder.file(builderFile.getFileName(), builderFile.getData());          
        }
        const childrenBuilderFolders = builderFolder.getFolders();

        for (const childrenBuilderFolder of childrenBuilderFolders) {
            let childrenZipFolder   = zipFolder.folder(childrenBuilderFolder.getFolderName());
            childrenZipFolder       = this.buildZipFile(childrenZipFolder, childrenBuilderFolder);
        }
        return zipFolder;
    
    }

}
