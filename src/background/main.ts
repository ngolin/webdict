import {BackgroundAction} from '../shared/enums';
import {PageScriptAction} from '../shared/enums';
import isDisabled from './contxt';
import notify from './notify';
import {host} from '../fetch';
import Fetch from '../fetch';
import play from './player';
import './request';
import './menus';
import './life';
type Message = {action: PageScriptAction; data: any};
chrome.runtime.onMessage.addListener(
  ({action, data}: Message, sender, sendRes) => {
    const [webdictDisabled, yuelangDisabled] = isDisabled();
    if (webdictDisabled) {
      return false;
    }
    switch (action) {
      case PageScriptAction.ADD_NOTE:
        Fetch.addnote(data);
        return false;
      case PageScriptAction.PLAY_SOUND:
        play(data, data => {
          chrome.tabs.sendMessage(sender.tab!.id!, {
            action: BackgroundAction.PLAY_ERROR,
            data
          });
        });
        return false;
      case PageScriptAction.SEARCH_TEXT:
        Fetch.search(data).then(worddata => {
          if (yuelangDisabled && data.lang === 'zh') {
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
      case PageScriptAction.DEFINE_WORD:
        Fetch.define(data).then(state => {
          if (state === -2) {
            notify('权限不足', '请注册登录');
            chrome.tabs.create({
              url: `${host}/`
            });
          }
        });
        return false;
      case PageScriptAction.WORD_VIEWED:
        return false;
      default:
        throw `Unknown action: ${action}`;
    }
  }
);
