import isDisabled from './contxt';
import notify from './notify';
import {host} from '../fetch';
import Fetch from '../fetch';
import play from './player';
import './request';
import './menus';
import './life';
import {ActionData} from '../shared/typings';
chrome.runtime.onMessage.addListener((ad: ActionData, sender, sendRes) => {
  const [webdictDisabled, yuelangDisabled] = isDisabled();
  if (webdictDisabled) {
    return false;
  }
  switch (ad.action) {
    case 'ADD_NOTE':
      Fetch.addnote(ad.data);
      return false;
    case 'PLAY_SOUND':
      play(ad.data, data => {
        chrome.tabs.sendMessage(sender.tab!.id!, {
          action: 'PLAY_ERROR',
          data
        });
      });
      return false;
    case 'SEARCH_TEXT':
      Fetch.search(ad.data).then(worddata => {
        if (yuelangDisabled && ad.data.lang === 'zh') {
          sendRes(
            worddata.map(({word, data}) => ({
              word,
              data: Object.keys(data)
                .filter(x => !x.startsWith('yue'))
                .reduce((o, k) => ((o[k] = data[k]), o), {})
            }))
          );
        } else {
          sendRes(worddata);
        }
      });
      return true;
    case 'DEFINE_WORD':
      Fetch.define(ad.data).then(state => {
        if (state === -2) {
          notify('权限不足', '请注册登录');
          chrome.tabs.create({
            url: `${host}/`
          });
        }
      });
      return false;
    case 'WORD_VIEWED':
      return false;
    default:
      throw `Unknown action: ${ad}`;
  }
});
