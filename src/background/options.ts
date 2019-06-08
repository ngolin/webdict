import { host } from '../fetch';
// declare const window: any;
import { BGWindow, OptionProps } from '.';

declare const window: BGWindow;

let options: OptionProps = {
  on: true,
  zh: true,
  en: true,
  jp: false,
};

const dpath = {
  '16': 'disabled/icon16.png',
  '32': 'disabled/icon32.png',
  '48': 'disabled/icon48.png',
  '128': 'disabled/icon128.png',
};

const { icons: epath } = chrome.runtime.getManifest();

function setIcon(enabled) {
  chrome.browserAction.setIcon({
    path: enabled ? epath : dpath,
  });
}

chrome.storage.sync.get('options', ({ options: _options }) => {
  setIcon(_options.on);
  options = _options;
});

chrome.browserAction.onClicked.addListener(({ id, url }) => {
  if (url.toLowerCase().startsWith(host)) {
    // setWebdict(!webdictDisabled);
  } else {
    chrome.tabs.query({ currentWindow: true, url: `${host}/*` }, tabs => {
      if (tabs && tabs[0]) {
        chrome.tabs.update(tabs[0].id, { active: true });
      } else if (/^((http|ws|ftp)s?|file|data):/i.test(url)) {
        chrome.tabs.create({ url: `${host}/` });
      } else {
        chrome.tabs.update(id, { url: `${host}/` });
      }
    });
  }
});

export default function getOptions() {
  return options;
}

window.getOptions = getOptions;

window.setOptions = (key, val) => {
  if (key == 'on') {
    setIcon(val);
  }
  options = { ...options, [key]: val };
  chrome.storage.sync.set({ options });
  console.log(options);
};
