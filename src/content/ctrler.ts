import {Rect, Injector} from '../shared/typings';
import {shorten, staticText} from './utility';
import inject from './popup';

export default function(injector: Injector) {
  const Dict = inject(injector);

  let mousedownTargetIsNotLanxEdit = true;
  let mouseupEnabled = true;
  let dictEnabled = true;

  function capture(): [string, Rect] {
    const sele = window.getSelection();
    const text = shorten(sele.toString().trim());
    const rect = sele.getRangeAt(0).getBoundingClientRect();
    if (
      text &&
      rect.left >= 0 &&
      rect.right <= document.documentElement.clientWidth &&
      rect.right > rect.left &&
      staticText(sele.anchorNode)
    ) {
      const x = window.pageXOffset,
        y = window.pageYOffset;
      return [
        text,
        {
          left: rect.left + x,
          right: rect.right + x,
          bottom: rect.bottom + y,
          top: rect.top + y
        }
      ];
    }
    throw new Error();
  }

  document.addEventListener(
    'mousedown',
    ({target}) => {
      mouseupEnabled = dictEnabled && staticText(target);
      try {
        mousedownTargetIsNotLanxEdit = !(target as any).classList.contains('lanx-edit');
      } catch (e) {
        mousedownTargetIsNotLanxEdit = true;
      }
    },
    true
  );

  document.addEventListener('mouseup', ({target}) => {
    if (mouseupEnabled && staticText(target)) {
      if (target !== document) {
        try {
          const [text, rect] = capture();
          Dict.tryToShowDict(text, rect as Rect);
        } catch (e) {
          Dict.hideDict();
        }
      }
    } else if (mousedownTargetIsNotLanxEdit) {
      Dict.hideDict();
    }
  });

  return {
    onPlayError: Dict.onPlayError,
    toggleDictEnabled() {
      return (dictEnabled = !dictEnabled);
    }
  };
}
