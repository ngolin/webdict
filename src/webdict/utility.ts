import { detect } from '../shared/utility';

export function legalWord(word: string) {
  for (let i = 0; i < word.length; i++) {
    const char = word.charAt(i);
    if ("，’' ".indexOf(char) < 0 && detect(char) === 0) return false;
  }
  return true;
}

export function shorten(text: string | null | undefined): string | null {
  if (!text || text.length > 64 || text.includes('\n')) return null;
  let max = 0;
  let len = 0;
  let count = 0;
  while (len < text.length) {
    const flag = detect(text.charAt(len));
    max = Math.max(max, flag);
    if (flag === 0) {
      if ("，’' ".indexOf(text.charAt(len)) >= 0) {
        if (count > 4) break;
        else if (max === 2 && count > 0) break;
        count++;
      } else {
        if (len === 0) return null;
        if (text.charAt(len) === '.') len++;
        break;
      }
    }
    len++;
  }
  if (max === 1 && len === 1) return null;
  return (
    (max === 2 ? 'zh' : 'en') +
    text.substr(0, Math.min(len, 32)).replace("'", '’')
  );
}

export function staticText(element: any) {
  if (document.designMode && 'on' === document.designMode.toLowerCase().trim())
    return false;
  while (element) {
    if (element.isContentEditable) return false;
    if (element.tagName) {
      const name = element.tagName.toLowerCase().trim();
      if (['input', 'textarea', 'button'].indexOf(name) > -1) return false;
    }
    element = element.parentNode as HTMLElement;
  }
  return true;
}

export function removeATag(text) {
  return text.replace(/<\/?a[^>]*>/g, '');
}
