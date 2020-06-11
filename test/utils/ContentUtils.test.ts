import { chrome }                     from '@bumble/jest-chrome';
import ContentUtils                   from '../../src/lib/utils/ContentUtils';
import ContentServer                  from '../../src/lib/class/ContentServer';
import ContentClient, { ContentTask } from '../../src/lib/class/ContentClient';
import HTMLUtils                      from "../../src/lib/utils/HTMLUtils";


jest.mock('../../src/lib/utils/BrowserUtils');


describe('Test Server Client connection', () => {
    const TEST_MSG = { task: "mytask", param: { param1: "param1" } };

    it('ContentUtils::sendMessage', () => {
        chrome.runtime.sendMessage.mockImplementation((msg, callback) => {
            expect(msg).toEqual(TEST_MSG);
        });
        ContentUtils.sendMessage(TEST_MSG.task, TEST_MSG.param);    
    });
    
    it('Test Server Client connection', () => {
        const contentServer  = new ContentServer();
        ContentUtils.getConnection();
        expect(contentServer.getClientIDs()).toContain("100");
    });
    
    it('Test ContentServer::getCurrentClient', async () => {
        const contentServer      = new ContentServer();
        ContentUtils.getConnection();
        const contentClient      = await contentServer.getCurrentClient();
        expect(contentClient).toBeInstanceOf(ContentClient);
        expect(contentClient.getID()).toEqual("100");
    });

    it('Test ContentTask', () => {
        const sendResponseSpy = jest.fn();
        const task            = new ContentTask(TEST_MSG.task, TEST_MSG.param, null);
        task.run(sendResponseSpy);
        expect(task.getID()).toEqual(TEST_MSG.task);
        expect(sendResponseSpy).toHaveBeenCalledWith(TEST_MSG);
    });


    it('Test ContentClient getData', async () => {
        const TEST_DATA = {
            param: {
                link: "http://example.js",
                type: "base64"
            }
        };       

        const contentServer = new ContentServer();
        const contentConnection = ContentUtils.getConnection();        

        // contentConnection.onRequireCurrentPageDocumentParam( (param) => new Promise( async (resolve) => {
        //     resolve(HTMLUtils.getPageDocumentParameterFromCurrentDocument());
        // }));

        contentConnection.onFetchData( (param) => new Promise( async () => {
            expect(param).toStrictEqual(TEST_DATA.param);  
        }));

        const contentClient = await contentServer.getCurrentClient();
        contentClient.getData(TEST_DATA.param.link, TEST_DATA.param.type as "blob");

    });
    

});


