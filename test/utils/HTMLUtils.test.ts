import HTMLUtils from '../../src/lib/utils/HTMLUtils';

test('HTMLUtils::getPageDocumentParameterFromCurrentDocument', () => {
    let link              = "http://localhost/test/site1.html";
    let html              = "html";
    let pageDocumentParam = HTMLUtils.createPageDocumentParam(link, html);
    expect(pageDocumentParam.url).toEqual(new URL(link));
    expect(pageDocumentParam.data).toEqual(html);
});
