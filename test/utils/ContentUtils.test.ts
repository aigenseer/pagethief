import { chrome } from '@bumble/jest-chrome';
import ContentUtils, { ContentConnection, IContentUtils } from '../../src/lib/utils/ContentUtils';
import ContentServer from '../../src/lib/class/ContentServer';

jest.mock('../../src/lib/utils/BrowserUtils');


test('ContentUtils::sendMessage', () => {
    const TEST_MSG     = { task: "mytask", param: { param1: "param1" } };
    chrome.runtime.sendMessage.mockImplementation((msg, callback) => {
        expect(msg).toEqual(TEST_MSG);
    });
    ContentUtils.sendMessage(TEST_MSG.task, TEST_MSG.param);    
});


test('Test Server Client connection', () => {
    const contentServer  = new ContentServer();
    ContentUtils.getConnection();
    expect(contentServer.getClientIDs()).toContain("100");
});

