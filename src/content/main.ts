import {Injector, PageScriptData, BackgroundData} from '../shared/types';
import {PageScriptAction, BackgroundAction} from '../shared/enums';
import inject from './ctrler';
type Message = {action: BackgroundAction; data: any};
const injector: Injector = {
  playme(data) {
    const action = PageScriptAction.PLAY_SOUND;
    chrome.runtime.sendMessage({action, data});
  },
  search(data, cb) {
    const action = PageScriptAction.SEARCH_TEXT;
    chrome.runtime.sendMessage({action, data}, cb);
  },
  define(data) {
    const action = PageScriptAction.DEFINE_WORD;
    chrome.runtime.sendMessage({action, data});
  },
  viewed(data) {
    const action = PageScriptAction.WORD_VIEWED;
    chrome.runtime.sendMessage({action, data});
  }
};

const {onPlayError} = inject(injector);

chrome.runtime.onMessage.addListener(({action, data}: Message) => {
  switch (action) {
    case BackgroundAction.PLAY_ERROR:
      return onPlayError(data);
    case BackgroundAction.ADD_NOTE:
      const noteText = window
        .getSelection()
        .toString()
        .trim();
      if (noteText) {
        const {url: furl} = data as BackgroundData.AddNote;
        const actionData: PageScriptData.AddNote = {
          note: noteText,
          furl
        };
        chrome.runtime.sendMessage({
          action: PageScriptAction.ADD_NOTE,
          data: actionData
        });
      }
    default:
      throw `Unknown action: ${action}`;
  }
});
