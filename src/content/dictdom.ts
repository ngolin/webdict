const styletext = require('!css-loader!sass-loader!./index.scss').toString();

export const DICTDOM = document.createElement('div');

DICTDOM.classList.add('lanx-root');
DICTDOM.innerHTML = [
  '<div class="lanx-main">',
  '  <div class="lanx-view">',
  '    <div class="lanx-head">',
  '      <div class="lanx-word"></div>',
  '      <div class="lanx-hide"></div>',
  '      <div class="lanx-mean"></div>',
  '    </div>',
  '  </div>',
  '  <form class="lanx-form lanx-none">',
  '    <div class="lanx-done">',
  '      <button class="lanx-dall" title="提交">共用</button>',
  '      <button class="lanx-down" title="提交">私用</button>',
  '    </div>',
  '    <div class="lanx-back"></div>',
  '  </form>',
  '</div>',
  '<div class="lanx-foot"></div>',
].reduce((a, b) => a + b.trim());

DICTDOM.addEventListener('mouseup', event => {
  event.stopPropagation();
});

const root = document.createElement('div');
const rootId = 'lanx-wedict-root';
root.style.boxSizing = 'border-box';
root.style.position = 'static';
root.style.outline = 'none';
root.style.border = 'none';
root.style.height = '0';
root.style.width = '0';
root.id = rootId;

const shadow = root.attachShadow({mode: 'open'});
const style = document.createElement('style');
style.textContent = styletext;
shadow.appendChild(style);
shadow.appendChild(DICTDOM);

export function ensureDomAttached() {
  if (!document.getElementById(rootId)) {
    // <body>'s and <html>'s position must be static
    let staticDom = document.body;
    while (staticDom) {
      staticDom.style.position = 'static';
      staticDom = staticDom.parentElement;
    }
    document.body.appendChild(root);
  }
  return true;
}
