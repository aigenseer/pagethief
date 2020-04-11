import ContentUtils from "../lib/utils/ContentUtils";
import HTMLUtils from "../lib/utils/HTMLUtils";




ContentUtils.sendMessage({startPage: HTMLUtils.getDocumentHTML()}, (response) => {
    console.log(response);
});