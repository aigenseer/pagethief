import axios       from "axios";

import LoggerUtils from "../utils/LoggerUtils";


export default class ContentScriptWorker {
    
    static fetchPage(url: string)
    {
        return document.documentElement.innerHTML;
    }

    static fetchData(url: string, type: 'binary'|'string' ){
        return new Promise( (resolve, reject) => {
            axios.get(url).then(result => {
                if(result.data){
                    resolve(result.data);
                }else{
                    resolve(null);
                }
            }).catch(reject);
        });
    }

}