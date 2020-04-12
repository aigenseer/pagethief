import ContentUtils from "../lib/utils/ContentUtils";
import HTMLUtils    from "../lib/utils/HTMLUtils";


const contentConnection = ContentUtils.getConnection();
contentConnection.onGetAnalysis( (param) => {
    return HTMLUtils.getPageDocumentParameterFromCurrentDocument();
});


// ContentUtils.getAnalysis(() => {
//     console.log(response);
// });

// ContentUtils.sendMessage({startPageDocumentParam: HTMLUtils.getPageDocumentParameterFromCurrentDocument()}, (response) => {
//     console.log(response);
// });