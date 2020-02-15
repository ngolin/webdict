import { host } from '../fetch';
// declare const window: any;
import { BGWindow, OptionProps } from '.';
import { BackgroundAction } from '../shared/enums';

declare const window: BGWindow;

let options: OptionProps = {
  on: true,
  zh: true,
  en: true,
  jp: false,
};

const dIcons = {
  '16': 'disabled/icon16.png',
  '32': 'disabled/icon32.png',
  '48': 'disabled/icon48.png',
  '128': 'disabled/icon128.png',
};

const { icons: eIcons } = chrome.runtime.getManifest();

function setIcon(enabled: boolean) {
  chrome.browserAction.setIcon({
    path: enabled ? eIcons : dIcons,
  });
}

chrome.storage.sync.get('options', ({ options: _options }) => {
  if (_options) {
    setIcon(_options.on);
    options = _options;
  }
});

chrome.browserAction.onClicked.addListener(({ id, url }) => {
  if (/^((http|ws|ftp)s?|file|data):/i.test(url)) {
    chrome.tabs.sendMessage(id, {
      action: BackgroundAction.MASKING,
    });
  } else {
    chrome.tabs.query({ currentWindow: true, url: `${host}/*` }, tabs => {
      if (tabs && tabs[0]) {
        // 已有，不重复打开
        chrome.tabs.update(tabs[0].id, { active: true });
      } else {
        // 当前空白页
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
  if (key === 'on') {
    setIcon(val);
  }
  options = { ...options, [key]: val };
  chrome.storage.sync.set({ options });
};
