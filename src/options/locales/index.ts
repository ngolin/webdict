import zh from './zh';
import en from './en';
const get = (locale: string) => {
  switch (locale) {
    case 'zh':
      return zh;
    case 'en':
      return en;
    default:
      if (locale.includes('_')) {
        const _ = locale.lastIndexOf('_');
        return get(locale.substr(0, _));
      }
      return en;
  }
};

export default get;
