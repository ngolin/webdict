const Dict = document.createElement('div');
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
  '    <button type="submit" class="lanx-done">完成</button>',
  '    <div class="lanx-back"></div>',
  '  </form>',
  '</div>',
  '<div class="lanx-foot"></div>'
].reduce((a, b) => a + b.trim());

Dict.addEventListener('mouseup', event => {
  event.stopPropagation();
});


export default Dict;
