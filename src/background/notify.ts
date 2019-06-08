export default (title, message) => {
  chrome.notifications.create(`lanx-${Date.now()}`, {
    type: 'basic',
    title,
    message,
    silent: true,
    iconUrl: chrome.extension.getURL('enabled/icon32.png'),
  } as any);
};
