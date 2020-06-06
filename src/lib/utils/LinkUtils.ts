export default class LinkUtils {
    
    static getNormalizeLink(link: string, appendFileName: string, skipNormalizeExtension: String[] = [], rootURL: URL = null){
        if(link.includes(rootURL!= null && rootURL.href)){
            link = link.replace(rootURL.origin, "");
            link = LinkUtils.removeFirstSlashFromString(link);
        }

        let linkParts                 = link.split("/");
        let extFilename               = linkParts.slice(-1)[0];
        let extFilenameExtensionParts = extFilename.split(".");
        let appenFileExtension        = appendFileName.split(".").pop();

        if(extFilename.length == 0 || extFilenameExtensionParts.length < 2 || !skipNormalizeExtension.includes(appenFileExtension) ){
            link = this.removeLastSlashFromString(link);
            return [link, appendFileName].join("/"); 
        }
        return link;          
    }

    static removeFirstSlashFromString(s: string){
        if(s.substring(0, 1) == "/"){    
            s = s.slice(1, s.length); 
        }
        return s;
    }

    static removeLastSlashFromString(s: string){
        if(s.slice(-1)[0] == "/"){
            s = s.slice(0, -1); 
        }
        return s;
    }

    static creatCleanLink(link: string){
        return link.split("/").filter(s => s.length > 0).join("/");
    }

    

}