import LinkUtils from "../utils/LinkUtils";

export default class PageLink {

    private url: URL;
    private sourceLink: string;    

    constructor(link: string) {
        this.sourceLink = link
        this.url = new URL(link);        
    }    

    getURL(){
        return this.url;
    }

    getSourceLink(){
        return this.sourceLink;
    }

    getCleanSourceLink(){
        return LinkUtils.creatCleanLink(this.sourceLink);
    }

}