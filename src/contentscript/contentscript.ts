import ContentUtils from "../lib/utils/ContentUtils";
import HTMLUtils    from "../lib/utils/HTMLUtils";
import ContentScriptWorker    from "../lib/class/ContentScriptWorker";

const contentConnection = ContentUtils.getConnection();

contentConnection.onRequireCurrentPageDocumentParam( (param) => new Promise( async (resolve) => {
    resolve(HTMLUtils.getPageDocumentParameterFromCurrentDocument());
}));

contentConnection.onFetchData( (param) => new Promise( async (resolve) => {
    ContentScriptWorker.fetchData(param.link, param.type).then(resolve).catch(() => resolve(null));
}));
    