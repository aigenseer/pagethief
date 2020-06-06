import BuilderFile from "./BuilderFile";

export default class BuilderFileManager {

    private sourceURLFiles: {[key: string]: BuilderFile} = {};
    
    addFile(sourceURL: string, builderFile: BuilderFile){
        this.sourceURLFiles[sourceURL] = builderFile;
    }

    sourceURLFileExist(sourceURL: string){
        return Object.keys(this.sourceURLFiles).includes(sourceURL);
    }

    getAll(){
        return this.sourceURLFiles;
    }

    getFileBySourceURL(sourceURL: string): BuilderFile|null
    {
        if(this.sourceURLFileExist(sourceURL)){
            return this.sourceURLFiles[sourceURL];
        }
        return null;
    }

}