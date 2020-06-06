import BuilderFileManager          from "./BuilderFileManager";
import BuilderFile, {IBuilderFile} from "./BuilderFile";

export default class BuilderFolder {

    private parent:     BuilderFolder|null;
    private folderName: string;
    private files:    {[key: string]: BuilderFile}   = {};
    private children: {[key: string]: BuilderFolder} = {};
    private builderFileManager: BuilderFileManager;

    constructor(parent: BuilderFolder, folderName: string, builderFileManager: BuilderFileManager){
        this.parent     = parent;
        this.folderName = folderName;
        this.builderFileManager = builderFileManager;
    }

    getFolderName(){
        return this.folderName;
    }

    createFolder(folderName: string): BuilderFolder
    {
        let folder = new BuilderFolder(this, folderName, this.builderFileManager);
        this.children[folderName] = folder;
        return folder;
    }

    existFolder(folderName: string){
        return Object.keys(this.children).includes(folderName);
    }

    getFolderByName(folderName: string): BuilderFolder|null
    {
        if(this.existFolder(folderName)){
            return this.children[folderName];
        }
        return null;
    }

    createFile(fileName: string, data: IBuilderFile["data"], sourceURL: string): BuilderFile
    {
        let file = new BuilderFile(this, fileName, data);
        this.builderFileManager.addFile(sourceURL, file);
        this.files[fileName] = file;
        return file;
    }

    getFiles(){
        return Object.values(this.files);
    }

    getFolders(){
        return Object.values(this.children);
    }

    getPath(){
        return this.getPathRecurively("", this);
    }

    private getPathRecurively(path: string, builderFolder: BuilderFolder|null){
        if(builderFolder!=null){
            path = [builderFolder.getFolderName(), path].join("/");
            return this.getPathRecurively(path, builderFolder.parent);
        }
        return path;
    }

}