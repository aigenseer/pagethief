import StringUtils from '../../src/lib/utils/StringUtils';

test('StringUtils::getHash', () => {
    expect(StringUtils.getHash("mystring")).toBe(109542589);
});

test('StringUtils::getHashString', () => {
    expect(StringUtils.getHashString("mystring")).toEqual("109542589");
});

test('StringUtils::validURL', () => {
    expect(StringUtils.validURL("http://localhost/test/")).toBeTruthy();
    expect(StringUtils.validURL("index.html")).toBeFalsy();
});