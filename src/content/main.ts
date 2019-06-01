import {PageScriptData, BackgroundData} from '../shared/types';
import {PageScriptAction, BackgroundAction} from '../shared/enums';
import trigger from './trigger';

type Message = {action: BackgroundAction; data: any};

const {onPlayError} = trigger({
  playme(data) {
    const action = PageScriptAction.PLAY_SOUND;
    chrome.runtime.sendMessage({action, data});
  },
  search(data) {
    const action = PageScriptAction.SEARCH_TEXT;
    return new Promise(resolve =>
      chrome.runtime.sendMessage({action, data}, resolve)
    );
  },
  define(data) {
    const action = PageScriptAction.DEFINE_WORD;
    chrome.runtime.sendMessage({action, data});
  },
  viewed(data) {
    const action = PageScriptAction.WORD_VIEWED;
    chrome.runtime.sendMessage({action, data});
  },
});

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
          furl,
        };
        chrome.runtime.sendMessage({
          action: PageScriptAction.ADD_NOTE,
          data: actionData,
        });
      }
    default:
      throw `Unknown action: ${action}`;
  }
});
