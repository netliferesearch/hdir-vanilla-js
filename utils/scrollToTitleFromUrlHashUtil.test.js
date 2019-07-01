import scrollToTitleFromUrlHash from './scrollToTitleFromUrlHashUtil';
import mockDocumentHTML from './scrollToTitleFromUrlHashUtil.mockDOM';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const { document } = (new JSDOM(mockDocumentHTML)).window;

delete global.window.location;
delete global.document;

beforeEach(() => {
  global.document = document;
});

describe('scrollToTitleFromUrlHash', () => {
  it('should find last hash "#arbeid-bidrar-til-raskere-bedring#im-so-last" from given url', () => {
    const url = 'http://localhost:3000/artikkel#bakgrunn#arbeid-bidrar-til-raskere-bedring#im-so-last';
    global.window.location = new URL(url);

    const theBuiltId = scrollToTitleFromUrlHash();
    expect(theBuiltId).toBe('im-so-last');
  });
  it('should find last hash "#arbeid-bidrar-til-raskere-bedring" from given url', () => {
    const url = 'http://localhost:3000/artikkel#bakgrunn#arbeid-bidrar-til-raskere-bedring';
    global.window.location = new URL(url);

    const theBuiltId = scrollToTitleFromUrlHash();
    expect(theBuiltId).toBe('arbeid-bidrar-til-raskere-bedring');
  });
  it('should return false when no hash in url', () => {
    const url = 'http://localhost:3000/artikkel';
    global.window.location = new URL(url);

    const theBuiltId = scrollToTitleFromUrlHash();
    expect(theBuiltId).toBe(false);
  });
  it('should return false when empty # is in url', () => {
    const url = 'http://localhost:3000/artikkel#';
    global.window.location = new URL(url);

    const theBuiltId = scrollToTitleFromUrlHash();
    expect(theBuiltId).toBe(false);
  });
  it('should find last hash "#ti-raad-for-et-inkluderende-arbeidsliv" from given url, even with special characters', () => {
    const url = 'http://localhost:3000/artikkel#ti-raad-for-et-inkluderende-arbeidsliv';
    global.window.location = new URL(url);

    const theBuiltId = scrollToTitleFromUrlHash();
    expect(theBuiltId).toBe('ti-raad-for-et-inkluderende-arbeidsliv');
  });
  it('should find last hash "#header-3-sok" from given url, even with if first character is a number', () => {
    const url = 'http://localhost:3000/artikkel#header-3-sok';
    global.window.location = new URL(url);

    const theBuiltId = scrollToTitleFromUrlHash();
    expect(theBuiltId).toBe('header-3-sok');
  });
});
