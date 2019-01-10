import {Injector} from '../shared/typings';
import inject from './ctrler';

const injector: Injector = {
  playme(data) {
    chrome.runtime.sendMessage({action: 'PLAY_SOUND', data});
  },
  // { text: string, lang: 'en' | 'zh' }, (entries: WordData[]) => void
  search(data, cb) {
    chrome.runtime.sendMessage({action: 'SEARCH_TEXT', data}, cb);
  },
  // { word: string, data: any }
  define(data) {
    chrome.runtime.sendMessage({action: 'DEFINE_WORD', data});
  },
  // { word: string, lang: 'zh' | 'en' }
  viewed(data) {
    chrome.runtime.sendMessage({action: 'WORD_VIEWED', data});
  }
};

const {onPlayError} = inject(injector);

chrome.runtime.onMessage.addListener(({action, data}) => {
  if (action === 'PLAY_ERROR') {
    onPlayError(data);
  } else if (action === 'ADD_NOTE') {
    const noteText = window
      .getSelection()
      .toString()
      .trim();
    if (noteText) {
      chrome.runtime.sendMessage({
        action,
        data: {
          note: noteText,
          furl: data.url
        }
      });
    }
  }
});
