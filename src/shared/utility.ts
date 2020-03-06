export function shuffle<T>(array: T[]): T[] {
  let index = array.length;
  while (index > 0) {
    const random = Math.floor(Math.random() * index--);
    [array[index], array[random]] = [array[random], array[index]];
  }
  return array;
}

export function detect(char: string) {
  const code = char.charCodeAt(0);
  if (code < 128) {
    if (
      ('a' <= char && char <= 'z') ||
      ('A' <= char && char <= 'Z') ||
      char === '-'
    )
      return 1;
    return 0;
  }
  if (code >= 0x2e80) {
    if (
      (0x4e00 <= code && code <= 0x9fd5) ||
      (0x3400 <= code && code <= 0x4db5) ||
      (0xf900 <= code && code <= 0xfaff) ||
      (0x2f00 <= code && code <= 0x2fdf) ||
      (0x2e80 <= code && code <= 0x2eff) ||
      (0x31c0 <= code && code <= 0x31ef) ||
      (0x2ff0 <= code && code <= 0x2fff)
    ) {
      return 2;
    }
  }
  if (code <= 0x02ff) {
    if (char === 'ª' || char === 'º') return 1;
    if (char < 'À') return 0;
    if (char <= 'ʯ') {
      if (char === '×' || char === '÷') return 0;
      else return 1;
    }
    return 0;
  }
  if ('Ḁ' <= char && char <= 'ỿ') {
    return 1;
  }

  return 0;
}
