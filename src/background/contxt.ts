import {host} from '../fetch';
declare const window: any;
let webdictDisabled = false;
let yuelangDisabled = false;
const dpath = {
  '16': 'disabled/icon16.png',
  '32': 'disabled/icon32.png',
  '48': 'disabled/icon48.png',
  '128': 'disabled/icon128.png'
};

const {icons: epath} = chrome.runtime.getManifest();

function setYuelang(disabled) {
  yuelangDisabled = disabled;
  chrome.storage.local.set({yuelang: disabled});
}

function setWebdict(disabled = false) {
  webdictDisabled = disabled;
  chrome.browserAction.setIcon({
    path: disabled ? dpath : epath
  });
  chrome.storage.local.set({webdict: disabled});
}

chrome.storage.local.get('webdict', ({webdict = false, yuelang = false}) => {
  setWebdict(webdict);
  setYuelang(yuelang);
});

chrome.browserAction.onClicked.addListener(({id, url}) => {
  if (url.toLowerCase().startsWith(host)) {
    setWebdict(!webdictDisabled);
  } else {
    chrome.tabs.query({currentWindow: true, url: `${host}/*`}, tabs => {
      if (tabs && tabs[0]) {
        chrome.tabs.update(tabs[0].id, {active: true});
      } else if (/^((http|ws|ftp)s?|file|data):/i.test(url)) {
        chrome.tabs.create({url: `${host}/`});
      } else {
        chrome.tabs.update(id, {url: `${host}/`});
      }
    });
  }
});

export default function isDisabled() {
  return [webdictDisabled, yuelangDisabled];
}

window.setWebdict = setWebdict;
window.setYuelang = setYuelang;
window.isDisabled = isDisabled;
