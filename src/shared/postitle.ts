export default (mark: string) => {
  if (mark.startsWith('han-CN')) {
    return '简体中国';
  }
  if (mark.startsWith('han-TW')) {
    return '繁體臺灣';
  }
  if (mark.startsWith('han-HK')) {
    return '繁體香港';
  }
  if (mark.startsWith('han-MO')) {
    return '繁體澳門';
  }
  if (mark.startsWith('han')) {
    return '汉语';
  }
  if (mark.startsWith('yue')) {
    return '粤语';
  }
  switch (mark.toLowerCase()) {
    case '':
      return '（空白）';
    case 'noun':
      return '名词';
    case 'verb':
      return '动词';
    case 'adj':
      return '形容词';
    case 'adv':
      return '副词';
    default:
      return mark;
  }
};
