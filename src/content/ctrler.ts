
import { updateStorage } from '../shared/storage';
import { Entry } from '../shared/typings';
import { dePinv, dePron } from './coder';
import { shorten, staticText } from './utility';

const enum Action { headClicked, defClicked, userClosed, resizeClosed, tryToPlayAudio, failToPlayAudio }

let rentry: Entry;
let absoluteRect: Rect;



function handler(action: { 'action': Action }) {
  // TODO: react to actions...
  console.log(action.action);
}

namespace Dict {
  let styles: any = {
    '#header': 'box-sizing:border-box;color:#222;cursor:pointer;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;padding-bottom:6px;text-align:center;user-select:none;white-space:nowrap;z-index:100000',
    '#ngl-blayer': 'border-left:12px solid transparent;border-right:12px solid transparent;box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;left:-12px;line-height:1.125;position:absolute;text-align:center;user-select:none;z-index:99997',
    '#ngl-edit': 'border:none;box-sizing:border-box;color:#222;cursor:pointer;display:none;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;margin:0;outline:none;padding:0;text-align:center;user-select:none;z-index:100000',
    '#ngl-hide': 'box-sizing:border-box;color:#222;cursor:pointer;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;height:16px;line-height:1.125;margin-left:2px;margin-right:2px;position:relative;text-align:center;top:3px;user-select:none;width:16px;z-index:100000',
    '#ngl-link': 'box-sizing:border-box;color:#222;cursor:pointer;display:none;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.125;padding-top:6px;text-align:center;text-decoration:underline;user-select:none;white-space:nowrap;z-index:100000',
    '#ngl-next': 'border:none;box-sizing:border-box;color:#222;cursor:pointer;display:none;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;margin:0;outline:none;padding:0;text-align:center;user-select:none;z-index:100000',
    '#ngl-pron': 'border:none;box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;margin:0;outline:none;padding:0;text-align:center;user-select:none;z-index:100000',
    '#ngl-tran': 'box-sizing:border-box;color:#222;cursor:pointer;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;padding-bottom:6px;text-align:left;user-select:none;word-wrap:break-word;z-index:100000',
    '#ngl-word': 'box-sizing:border-box;color:#222;cursor:pointer;display:inline;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:1.125;text-align:center;user-select:none;z-index:100000',
    '#pron-uk': 'box-sizing:border-box;color:#07255e;cursor:pointer;display:inline;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;text-align:center;user-select:none;z-index:100000',
    '#pron-item': 'box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;padding-top:2px;text-align:center;user-select:none;white-space:nowrap;z-index:100000',
    '#ngl-done': 'background-color:#E9DECF;border-radius:2px;box-sizing:border-box;color:#222;cursor:pointer;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.125;padding:6px 9px;text-align:center;user-select:none;z-index:100000',
    '#ngl-main': 'background-color:#FFF1E0;border:1px solid #E9DECF;border-radius:2px;box-shadow:0 0 16px #a7a59b;box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;min-width:220px;padding:6px 8px 12px;position:absolute;text-align:center;user-select:none;z-index:99998',
    '#ngl-show': 'border:none;box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;margin:0;outline:none;padding:0;text-align:center;user-select:none;z-index:100000',
    '#pinv-pos': 'box-sizing:border-box;color:#222;cursor:pointer;display:inline;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;text-align:center;user-select:none;z-index:100000',
    '#ngl-tlayer': 'border-left:11px solid transparent;border-right:11px solid transparent;box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;left:-11px;line-height:1.125;position:absolute;text-align:center;user-select:none;z-index:99999',
    '#origin': 'border:none;box-sizing:border-box;color:#222;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;height:0;line-height:1.125;margin:0;padding:0;position:absolute;text-align:center;user-select:none;width:0;z-index:100000',
    '#ngl-input': 'background-color:transparent;border:1px solid #a7a59b;border-radius:2px;box-sizing:border-box;color:#222;cursor:text;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;margin:6px 0;min-height:88px;padding:6px;resize:none;text-align:left;user-select:none;width:100%;z-index:100000',
    '#pron-us': 'box-sizing:border-box;color:#8f0610;cursor:pointer;display:inline;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.125;text-align:center;user-select:none;z-index:100000',
    '#ngl-head': 'box-sizing:border-box;color:#222;cursor:pointer;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:1.125;padding-bottom:6px;text-align:center;user-select:none;z-index:100000',
  };
  let html: any = '<div id="ngl-main"><div id="ngl-show"><span id="header"><span id="ngl-word"></span><svg id="ngl-hide" viewBox="0 0 24 24"><circle fill="#000000" cx="12" cy="12" r="8"/><path fill="#FFF1E0" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/></svg></span><span id="ngl-tran"></span><div id="ngl-pron"></div><a id="ngl-link" target="_blank"></a></div><div id="ngl-edit"><div id="ngl-head" title="取消"></div><textarea id="ngl-input"></textarea><div id="ngl-done">完成</div></div><div id="ngl-next"></div></div><div id="ngl-blayer"></div><div id="ngl-tlayer"></div>';
  export const dict = document.createElement('div');
  dict.setAttribute('style', styles['#origin']);
  dict.style.display = 'none';
  document.body.appendChild(dict);
  dict.innerHTML = html;
  html = null;
  export const [main, show, word, hide, tran, pron, link, edit, head, input, done, next, blay, tlay]
    = ['main', 'show', 'word', 'hide', 'tran', 'pron', 'link', 'edit', 'head', 'input', 'done', 'next', 'blayer', 'tlayer']
      .map((id) => dict.querySelector('#ngl-' + id) as HTMLElement);
  // tslint:disable-next-line forin
  for (const id in styles) {
    const element = dict.querySelector(id) as HTMLElement;
    if (element) {
      element.setAttribute('style', styles[id]);
      element.removeAttribute('id');
    }
  }
  const attrs = [styles['#pron-uk'], styles['#pinv-pos'], styles['#pron-us'], styles['#pron-item']];
  styles = null;
  hide.addEventListener('mouseup', (event) => {
    event.stopPropagation();
    dict.style.display = 'none';
    handler({ action: Action.userClosed });
  }, true);
  const mock = hide.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'circle')[0];
  const mark = hide.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'path')[0];
  hide.onmouseover = () => {
    mark.setAttribute('fill', word.style.color as string);
    mock.setAttribute('fill', main.style.backgroundColor as string);
  };
  hide.onmouseout = () => {
    mark.setAttribute('fill', main.style.backgroundColor as string);
    mock.setAttribute('fill', word.style.color as string);
  };
  word.addEventListener('click', (event) => {
    event.stopPropagation();
    if (rentry.family && rentry.family.length > 1) {
      const qword = rentry.family[(++rentry.index) % rentry.family.length];
      chrome.runtime.sendMessage({ query: qword, lang: rentry.cleng ? 'zh' : 'en' }, (entry: Entry) => {
        if (entry) {
          entry.family = rentry.family;
          entry.index = rentry.index;
          showDict(entry, absoluteRect);
        }
        return false;
      });
    }
  });
  [main, blay, tlay].forEach((element) => {
    element.addEventListener('mouseup', (event) => {
      event.stopPropagation();
    });
  });
  tran.addEventListener('click', (event) => {
    show.style.display = 'none';
    edit.style.display = 'block';
    event.stopPropagation();
    if (pinpoint(absoluteRect)) input.focus();
    else {
      show.style.display = 'none';
      edit.style.display = 'block';
    }
  });

  head.addEventListener('click', (event) => {
    show.style.display = 'block';
    edit.style.display = 'none';
    event.stopPropagation();
    pinpoint(absoluteRect);
    (input as HTMLTextAreaElement).value = rentry.trans;
  });

  const listener = (event: Event) => {
    show.style.display = 'block';
    edit.style.display = 'none';
    event.stopPropagation();
    const newVal = (input as HTMLTextAreaElement).value.trim();
    if (newVal && newVal !== rentry.trans) {
      if (newVal.charAt(0) !== '@' || rentry.qword.toLowerCase() === newVal.substr(1).toLowerCase()) {
        rentry.trans = newVal.charAt(0) !== '@' ? newVal : '[Ref Error]';
        updateContent(rentry);
        pinpoint(absoluteRect);
        chrome.runtime.sendMessage({ query: rentry.qword, newVal });
      } else {
        chrome.runtime.sendMessage({ query: rentry.qword, newVal }, (trans: string) => {
          rentry.trans = trans;
          updateContent(rentry);
          pinpoint(absoluteRect);
        });
      }
    } else pinpoint(absoluteRect);
  };
  done.addEventListener('click', listener);

  input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      listener(event);
    }
  }, true);


  window.addEventListener('resize', () => {
    if (dict.style.display !== 'none') {
      dict.style.display = 'none';
      handler({ action: Action.resizeClosed });
    }
  });
  function playAudio(event: Event) {
    event.stopPropagation();
    const el = event.target as HTMLElement;
    chrome.runtime.sendMessage({ play: el.getAttribute('data-url') });
    handler({ action: Action.tryToPlayAudio });
  }

  // on audio playing failed:
  chrome.runtime.onMessage.addListener((msg: { 'play': string }) => {
    const target = pron.querySelector(`[data-url="${msg.play}"]`) as HTMLElement;
    if (target) target.style.textDecoration = 'line-through';
    handler({ action: Action.failToPlayAudio });
  });


  function ensurePronItem(pron: HTMLElement, count: number) {
    const childCount = pron.childElementCount;
    const divs = new Array<HTMLElement>();
    if (childCount >= count) {
      for (let i = 0; i < childCount; i++) {
        const el = pron.children[i] as HTMLElement;
        if (i < count) {
          el.style.display = 'block';
          divs.push(el);
        } else el.style.display = 'none';
      }
    } else {
      for (let i = 0; i < childCount; i++) {
        const el = pron.children[i] as HTMLElement;
        el.style.display = 'block';
        divs.push(el);
      }
      while (count > childCount) {
        const div = document.createElement('div');
        div.setAttribute('style', attrs[3]);
        pron.appendChild(div);
        for (let i = 0; i < 3; i++) {
          const span = document.createElement('span');
          span.setAttribute('style', attrs[i]);
          div.appendChild(span);
        }
        divs.push(div);
        count--;
      }
    }
    return divs;
  }
  const setButton = (button: HTMLSpanElement, style: string) => {
    button.setAttribute('style', style);
    button.addEventListener('mouseup', playAudio, true);
    button.setAttribute('title', '播放 » [' + button.innerText + ']');
  };


  function updateContent(entry: Entry) {
    dict.style.display = 'block';
    if (entry.next) {
      show.style.display = 'none';
      edit.style.display = 'none';
      next.style.display = 'block';
      next.innerHTML = entry.next;
    } else {
      next.style.display = 'none';
      edit.style.display = 'none';
      show.style.display = 'block';
      head.innerText = word.innerText = entry.qword;
      if (entry.family && entry.family.length > 1) {
        done.style.color = head.style.color = word.style.color = '#8f0610';
        mock.setAttribute('fill', '#8f0610');
      } else {
        done.style.color = head.style.color = word.style.color = '#07255e';
        mock.setAttribute('fill', '#07255e');
      }
      if (entry.count) word.setAttribute('title', '第' + entry.count + '次查询');
      else word.removeAttribute('title');
      (input as HTMLTextAreaElement).value = tran.innerText = entry.trans;
      if (entry.link) {
        link.style.color = entry.link.color ? entry.link.color : main.style.color;
        link.setAttribute('title', entry.link.title);
        link.setAttribute('href', entry.link.href);
        link.innerHTML = entry.link.html;
        link.style.display = 'block';
      } else link.style.display = 'none';
      ensurePronItem(pron, entry.poses.length).forEach((div, c) => {
        const parts = entry.cleng ? ['»', entry.poses[c], '«'] : entry.poses[c].split('$$');
        parts[1] = ' ' + parts[1] + ' ';
        for (let p = 0; p < 3; p++) {
          const span = div.children[p];
          if (entry.cleng && p === 1) {
            span.innerHTML = dePinv(parts[p], 'zh:');
          } else if (!(entry.cleng || p === 1)) {
            span.innerHTML = dePron(parts[p], p === 0 ? 'uk:' : 'us:');
          } else {
            span.innerHTML = parts[p];
            continue;
          }
          const buttons = span.querySelectorAll('span[data-url]') as NodeListOf<HTMLSpanElement>;
          // tslint:disable-next-line: prefer-for-of
          for (let b = 0; b < buttons.length; b++) {
            setButton(buttons[b], attrs[p]);
          }
        }
      });
    }
  }

  function pinpoint(aRect: Rect): boolean {
    const x = window.pageXOffset, y = window.pageYOffset;
    const rRect = { left: aRect.left - x, right: aRect.right - x, top: aRect.top - y, bottom: aRect.bottom - y };
    if (Math.max(document.documentElement.clientWidth, document.documentElement.offsetWidth) < main.offsetWidth) {
      dict.style.display = 'none';
      return false;
    }
    if (rRect.left < 0 || rRect.right > document.documentElement.clientWidth) {
      dict.style.display = 'none';
      return false;
    }
    const margin = 14;
    let above = rRect.top >= main.offsetHeight + margin;
    let below = above || document.documentElement.clientHeight - rRect.bottom >= main.offsetHeight + margin;
    above = above || !below && rRect.top + y >= main.offsetHeight + margin;
    below = (above || below) || Math.max(document.documentElement.offsetHeight, document.documentElement.clientHeight) - rRect.bottom >= main.offsetHeight + margin;
    if (!(above || below)) {
      dict.style.display = 'none';
      return false;
    }
    if (above) {
      main.style.top = -main.offsetHeight + 'px';
    } else {
      main.style.top = '0';
    }
    let middle = rRect.left + rRect.right;
    let total = document.documentElement.clientWidth;
    if (total < main.offsetWidth) {
      middle += x;
      total = Math.max(total, document.documentElement.offsetWidth);
    }
    if (middle >= main.offsetWidth) {
      const offset = main.offsetWidth + middle - 2 * total;
      if (offset <= 0) {
        main.style.left = -main.offsetWidth / 2 + 'px';
      } else {
        main.style.left = (-offset - main.offsetWidth) / 2 + 'px';
      }
    } else {
      main.style.left = (-middle) / 2 + 'px';
    }
    dict.style.left = (rRect.right + rRect.left) / 2 + x + 'px';
    if (above) {
      dict.style.top = rRect.top + y - margin + 'px';
      tlay.style.borderTop = '11px solid #FFF1E0';
      blay.style.borderTop = '12px solid #E9DECF';
      tlay.style.borderBottom = 'none';
      blay.style.borderBottom = 'none';
      tlay.style.top = '-1px';
      blay.style.top = '0';
    } else {
      dict.style.top = rRect.bottom + y + margin + 'px';
      tlay.style.borderTop = 'none';
      blay.style.borderTop = 'none';
      tlay.style.borderBottom = '11px solid #FFF1E0';
      blay.style.borderBottom = '12px solid #E9DECF';
      tlay.style.top = '-10px';
      blay.style.top = '-12px';
    }
    return true;
  }

  function showDict(entry: Entry, rect: Rect) {
    updateContent(rentry = entry);
    return pinpoint(rect);
  }

  export function hideDict() {
    dict.style.display = 'none';
    handler({ action: Action.userClosed });
  }

  export function tryToShowDict(text: string, rect: Rect) {
    const qword = text.substr(2);
    chrome.runtime.sendMessage({ query: qword, lang: text.substr(0, 2) }, (entry: Entry) => {
      if (entry) {
        absoluteRect = rect;
        if (showDict(entry, rect)) {
          updateStorage(':ngl@vocabulary', entry.qword, (item, save) => {
            item.count = (item.count as number) + 1 || 1;
            item.moment = Date.now();
            save(item);
          });
        }
      }
    });
  }
}

interface Rect { left: number; right: number; top: number; bottom: number; }


let mouseupEnabled = true;
let dictEnabled = true;
let mousedownTargetIsInput = false;



function capture(): [string | null, Rect | null] {
  try {
    const sel = window.getSelection();
    const text = shorten(sel && sel.toString().trim());
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (text && rect.left >= 0 && rect.right <= document.documentElement.clientWidth) {
      if (staticText(sel.anchorNode)) {
        const x = window.pageXOffset, y = window.pageYOffset;
        return [text, { left: rect.left + x, right: rect.right + x, bottom: rect.bottom + y, top: rect.top + y }];
      }
    }
  } catch { }
  return [null, null];
}
import input = Dict.input;

document.addEventListener('mousedown', (event: Event) => {
  mouseupEnabled = dictEnabled && staticText(event.target);
  mousedownTargetIsInput = event.target === input;
}, true);
document.addEventListener('mouseup', (event) => {
  if (mousedownTargetIsInput) return;
  if (mouseupEnabled && staticText(event.target)) {
    if (event.target !== document) {
      const [text, rect] = capture();
      if (text) {
        Dict.tryToShowDict(text, rect as Rect);
      } else Dict.hideDict();
    }
  } else Dict.hideDict();
});

export default function setEnable(enable: boolean) {
  dictEnabled = enable;
}