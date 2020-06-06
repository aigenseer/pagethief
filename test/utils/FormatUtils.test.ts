import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import FormatUtils from '../../src/lib/utils/FormatUtils';


enableFetchMocks();
const TEST_TEXT     = "blobfile";
const TEST_BLOB     = new Blob([TEST_TEXT], {type: "application/octet-stream"});
const TEST_DATA_URL = 'data:application/octet-stream;base64,YmxvYmZpbGU=';


test('FormatUtils::getBlobFromBase64', async () => {
    fetchMock.mockOnce(TEST_TEXT)
    let blob = await FormatUtils.getBlobFromBase64(TEST_DATA_URL);
    expect(await blob.text()).toEqual(TEST_TEXT);
});

