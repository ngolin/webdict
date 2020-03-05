import { Rect, Fetcher } from '../shared/types';
import { shorten, staticText } from './utility';
import handler from './handler';

export default function(fetcher: Fetcher) {
  const { tryToShowDict, hideDict, onPlayError } = handler(fetcher);
  let mousedownTargetIsNotLanxEdit = true;
  let mouseupEnabled = true;
  let dictEnabled = true;

  document.addEventListener(
    'mousedown',
    ({ target }) => {
      mouseupEnabled = dictEnabled && staticText(target);
      try {
        mousedownTargetIsNotLanxEdit = !(target as Element).classList.contains(
          'lanx-edit'
        );
      } catch (e) {
        mousedownTargetIsNotLanxEdit = true;
      }
    },
    true
  );

  document.addEventListener('mouseup', ({ target }) => {
    if (mouseupEnabled && staticText(target)) {
      if (target !== document) {
        try {
          const [text, rect] = captureSelection();
          tryToShowDict(text, rect);
        } catch (e) {
          hideDict();
        }
      }
    } else if (mousedownTargetIsNotLanxEdit) {
      hideDict();
    }
  });

  return {
    toggleDictEnabled() {
      dictEnabled = !dictEnabled;
      return dictEnabled;
    },
    onPlayError,
    hideDict,
  };
}

function captureSelection(): [string, Rect] {
  const sltn = window.getSelection();
  const text = shorten(sltn.toString().trim());
  const rect = sltn.getRangeAt(0).getBoundingClientRect();
  if (
    text &&
    rect.left >= 0 &&
    rect.right <= document.documentElement.clientWidth &&
    rect.right > rect.left &&
    staticText(sltn.anchorNode)
  ) {
    const x = window.pageXOffset;
    const y = window.pageYOffset;
    return [
      text,
      {
        left: rect.left + x,
        right: rect.right + x,
        bottom: rect.bottom + y,
        top: rect.top + y,
      },
    ];
  }
  throw new Error();
}
