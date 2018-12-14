import Fetch from '../fetch';
declare const window: any;
let webdictDisabled = false;
let yuelangDisabled = true;
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
function setYuelang(disabled) {
  yuelangDisabled = disabled;
  chrome.storage.local.set({ yuelang: disabled });
}
chrome.storage.local.get('webdict', ({ webdict, yuelang }) => {
  setWebdict(webdict);
  setYuelang(yuelang);
});

// chrome.browserAction.onClicked.addListener(({ url }) => {
//   // "http", "https", "ws", "wss", "ftp", "ftps", "data" or "file"
//   if (/^((http|ws|ftp)s?|file|data):/i.test(url)) {
//     setWebdict(!webdictDisabled);
//   } else {
//     const url = chrome.runtime.getURL('console.html');
//     chrome.tabs.create({ url });
//   }
// });

export default function isDisabled() {
  return [webdictDisabled, yuelangDisabled];
}

window.setWebdict = setWebdict;
window.setYuelang = setYuelang;
window.isDisabled = isDisabled;

Fetch.contxt().then(
  contxt => window.contxt = contxt,
  () => window.contxt = {}
);