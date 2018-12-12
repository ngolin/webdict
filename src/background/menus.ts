

chrome.contextMenus.onClicked.addListener(({ menuItemId }, { id, url }: any) => {
  try {
    if (menuItemId === 'REPORT_BUG') {
      console.log('Reporting bugs to server...');
    } else {
      chrome.tabs.sendMessage(id, { action: menuItemId, data: { url } }, title => {
        chrome.contextMenus.update(menuItemId, { title });
      });
    }
  } catch (e) { }
});

chrome.contextMenus.create({
  contexts: ['selection'],
  id: 'ADD_NOTE',
  title: chrome.i18n.getMessage('addNote'),
});

chrome.contextMenus.create({
  contexts: ['page'],
  id: 'REPORT_BUG',
  title: chrome.i18n.getMessage('reportBug'),
});
