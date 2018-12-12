let webdictDisabled = false;

const dpath = {
  '16': 'disabled/icon16.png',
  '32': 'disabled/icon32.png',
  '48': 'disabled/icon48.png',
  '128': 'disabled/icon128.png'
};

const {
  icons: epath
} = chrome.runtime.getManifest();

function setWebdict(disabled) {
  webdictDisabled = disabled;
  chrome.browserAction.setIcon({
    path: disabled ? dpath : epath
  });
  chrome.browserAction.setTitle({
    title: disabled
      ? chrome.i18n.getMessage('browserActionDisabledTitle')
      : chrome.i18n.getMessage('browserActionEnabledTitle')
  });
  chrome.storage.local.set({ webdict: disabled });
}

chrome.storage.local.get('webdict', ({ webdict }) => {
  setWebdict(webdict);
});

chrome.browserAction.onClicked.addListener(({ url }) => {
  // "http", "https", "ws", "wss", "ftp", "ftps", "data" or "file"
  if (/^((http|ws|ftp)s?|file|data):/i.test(url)) {
    setWebdict(!webdictDisabled);
  } else {
    const url = chrome.runtime.getURL('console.html');
    chrome.tabs.create({ url });
  }
});

export default () => webdictDisabled;


export function loginPopup() {

}

