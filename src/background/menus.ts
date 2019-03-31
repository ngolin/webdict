import {BackgroundAction} from '../shared/enums';
import {BackgroundData} from '../shared/types';

chrome.contextMenus.onClicked.addListener(({menuItemId}, {id, url}: any) => {
  try {
    const actionData: BackgroundData.AddNote = {url};
    chrome.tabs.sendMessage(
      id,
      {action: menuItemId, data: actionData},
      title => {
        chrome.contextMenus.update(menuItemId, {title});
      }
    );
  } catch (e) {}
});

chrome.contextMenus.create({
  contexts: ['selection'],
  id: BackgroundAction.ADD_NOTE,
  title: chrome.i18n.getMessage('addNote')
});
