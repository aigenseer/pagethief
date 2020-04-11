

export default class HTMLUtils {

    static getDocumentHTML()
    {
        return document.documentElement.innerHTML;
    }

    static getLinksFromDocumentString(html: string)
    {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        return doc.links;
    }

    static getLinksFromOwnDomain(html: string){
        return HTMLUtils.getLinksFromDocumentString(html).filter((e, i) => {
            
        });
    }

}