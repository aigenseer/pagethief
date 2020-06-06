import BuilderFolder from "./BuilderFolder";

export interface IBuilderFile{
    name: string;
    data: string|Blob;
}

export default class BuilderFile {

    private parentFolder: BuilderFolder;
    private fileName:     string;
    private data:         IBuilderFile["data"];

    constructor(parentFolder: BuilderFolder, fileName: string, data: IBuilderFile["data"]){
        this.parentFolder = parentFolder;
        this.fileName     = fileName;
        this.data         = data;
    }

    getFileName(){
        return this.fileName;
    }

    getPath(){
        return [this.parentFolder.getPath(), this.getFileName()].join("");
    }

    getData(){
        return this.data;
    }

    updateData(data: IBuilderFile["data"]){
        this.data = data;
    }

}