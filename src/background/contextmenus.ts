import { BackgroundAction } from '../shared/enums';
import { BackgroundData } from '../shared/types';

chrome.contextMenus.onClicked.addListener(({ menuItemId }, { id, url }) => {
  const actionData: BackgroundData.AddNote = { url };
  chrome.tabs.sendMessage(
    id,
    { action: menuItemId, data: actionData },
    title => {
      chrome.contextMenus.update(menuItemId, { title });
    }
  );
});

// TODO: impl add note
// chrome.contextMenus.create({
//   contexts: ['selection'],
//   id: BackgroundAction.ADD_NOTE,
//   title: chrome.i18n.getMessage('addNote'),
// });
chrome.contextMenus.create({
  contexts: ['selection'],
  id: BackgroundAction.HIGHLIGHT,
  title: chrome.i18n.getMessage('highlight'),
});
