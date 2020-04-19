import axios       from "axios";
import FormatUtils from "../utils/FormatUtils";


export default class ContentScriptWorker {
    
    static fetchPage(url: string)
    {
        return document.documentElement.innerHTML;
    }

    static fetchData(url: string, type: 'base64'|'string'|'dataURL' ){
        switch (type) {
            case 'base64':
                return ContentScriptWorker.fetchDataAsBase64(url);
                break;
            case 'dataURL':
                return ContentScriptWorker.fetchDataAsDataURL(url);
                break;        
            default:
                return ContentScriptWorker.fetchDataAsString(url);
                break;
        }
    }

    static fetchDataAsString(url: string){
        return new Promise( (resolve, reject) => {
            axios.get(url).then(response => {
                if(response.data){
                    resolve(response.data);
                }else{
                    resolve(null);
                }
            }).catch(reject);
        });
    }
    

    static fetchDataAsDataURL(url: string){
        return new Promise( (resolve, reject) => {
            axios.get(url, { responseType: 'blob' }).then((response) => {
                if(response.data){
                    FormatUtils.getDataURLFromBlob(response.data).then(resolve).catch(reject);
                }else{
                    resolve(null);
                }                
            }).catch(reject);
        });
    }

    static fetchDataAsBase64(url: string){
        return new Promise( (resolve, reject) => {
            axios.get(url, { responseType: 'arraybuffer' }).then((response) => {
                if(response.data){
                    let image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    resolve(`data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
                }else{
                    resolve(null);
                }
                
            }).catch(reject);
        });
    }

}