import { Rect, Injector } from '../shared/typings';
import { shorten, staticText } from './utility';
import inject from './popup';

export default function (injector: Injector) {

  const Dict = inject(injector);

  let mousedownTargetIsNotLanxEdit = true;
  let deckeyDisabled = true;
  let mouseupEnabled = true;
  let dictEnabled = true;

  function capture(): [string | null, Rect | null] {
    try {
      const sele = window.getSelection();
      const text = shorten(sele.toString().trim());
      const rect = sele.getRangeAt(0).getBoundingClientRect();
      if (
        text && rect.left >= 0
        && rect.right <= document.documentElement.clientWidth
        && rect.right > rect.left && staticText(sele.anchorNode)
      ) {
        const x = window.pageXOffset, y = window.pageYOffset;
        return [
          text, {
            left: rect.left + x,
            right: rect.right + x,
            bottom: rect.bottom + y,
            top: rect.top + y
          }];
      }
    } catch (e) { }
    return [null, null];
  }

  document.addEventListener('mousedown', ({ target }) => {
    mouseupEnabled = dictEnabled && staticText(target);
    try {
      mousedownTargetIsNotLanxEdit = !(target as any).classList.contains('lanx-edit');
    } catch (e) {
      mousedownTargetIsNotLanxEdit = true;
    }
  }, true);

  document.addEventListener('mouseup', ({
    target, shiftKey, ctrlKey, altKey, metaKey
  }) => {
    if ((deckeyDisabled || shiftKey || ctrlKey || metaKey || altKey) && mouseupEnabled && staticText(target)) {
      if (target !== document) {
        const [text, rect] = capture();
        if (text) {
          Dict.tryToShowDict(text, rect as Rect);
        } else Dict.hideDict();
      }
    } else if (mousedownTargetIsNotLanxEdit) Dict.hideDict();
  });

  return {
    onPlayError: Dict.onPlayError,
    setDictStatus(dict: boolean, deckey: boolean) {
      if (dict) {
        return dictEnabled = !dictEnabled;
      }
      if (deckey) {
        return deckeyDisabled = !deckeyDisabled;
      }
    }
  }

}

