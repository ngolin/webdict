const styletext = require('!css-loader!sass-loader!./index.scss').toString();

export const Dict = document.createElement('div');

Dict.classList.add('lanx-root');
Dict.innerHTML = [
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
  '<div class="lanx-foot"></div>'
].reduce((a, b) => a + b.trim());

Dict.addEventListener('mouseup', event => {
  event.stopPropagation();
});

export const Root = document.createElement('div');
export const RootID = 'lanx-wedict-root';
Root.style.boxSizing = 'border-box';
Root.style.position = 'static';
Root.style.outline = 'none';
Root.style.border = 'none';
Root.style.height = '0';
Root.style.width = '0';
Root.id = RootID;

const shadow = Root.attachShadow({mode: 'open'});
const style = document.createElement('style');
style.textContent = styletext;
shadow.appendChild(style);
shadow.appendChild(Dict);
