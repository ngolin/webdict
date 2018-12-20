chrome.contextMenus.onClicked.addListener(({ menuItemId }, { id, url }: any) => {
  try {
    chrome.tabs.sendMessage(id, { action: menuItemId, data: { url } }, title => {
      chrome.contextMenus.update(menuItemId, { title });
    });
  } catch (e) { }
});

chrome.contextMenus.create({
  contexts: ['selection'],
  id: 'ADD_NOTE',
  title: chrome.i18n.getMessage('addNote'),
});
