import RegExUtils from '../../src/lib/utils/RegExUtils';

test('RegExUtils::getMatchList', () => {
    let source    = '<p><a title="test" href="site1.html">Site1</a></p>';
    let regExp    = new RegExp("<a\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1", "gm");
    let matchList = RegExUtils.getMatchList(source, regExp);
    expect(matchList.length).toBe(1);
    //console.log(matchList[0][2]);
    // expect(matchList.length).toBe(1);
});
