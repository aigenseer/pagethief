import ThiefDocument, { IThiefDocumentParam } from "./ThiefDocument";
import LinkUtils                              from "../utils/LinkUtils";

export interface IAssetDocumentParam extends IThiefDocumentParam{
    type: 'base64'|'string'|'blob'
}

export default class AssetDocument extends ThiefDocument{

    private type: IAssetDocumentParam["type"];    

    constructor(assetDocumentParam: IAssetDocumentParam)
    {
        super(assetDocumentParam);
        this.type = assetDocumentParam.type;
    }

    static createAssetDocumentParamObject(link: string, data: IAssetDocumentParam["data"], type: IAssetDocumentParam["type"]){
        return {
            url: new URL(link),
            data,
            type
        }
    }

    getType(){
        return this.type;
    }

    // getCleanLink(){
    //     return LinkUtils.creatCleanLink(this.getRootURL().href.split("?")[0]);
    // }


}