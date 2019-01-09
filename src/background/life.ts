import {host} from '../fetch';
// chrome.runtime.onInstalled.addListener(({ reason }) => {
//   if (reason === 'install' || reason === 'update') {
//     chrome.tabs.create({ url: `https://ngolin.github.io/webdict?reason=${reason}` });
//   }
// });

chrome.runtime.setUninstallURL(`${host}/dict/app/see/you`);
