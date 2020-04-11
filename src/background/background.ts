import BackgroundUtils from "../lib/utils/BackgroundUtils";
import HTMLUtils       from "../lib/utils/HTMLUtils";


BackgroundUtils.onMessage((msg, sender, sendResponse) => {
    if(msg.startPage){
        console.log(HTMLUtils.getLinksFromDocumentString(msg.startPage));
        

        //let regEx = ParameterUtils.getRegEx();
        //console.log(msg.startPage.match(regEx));
    }    
});