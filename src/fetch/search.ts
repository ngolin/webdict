import { WordData, PageScriptData } from '../shared/types';
import fetch from './_';
const MAP = new Map<string, WordData[]>();

export default ({ text, lang }: PageScriptData.Search): Promise<WordData[]> => {
  const key = text.toLowerCase();
  if (MAP.has(key)) {
    return Promise.resolve(MAP.get(key));
  } else {
    return fetch(`/app/v1/search/${lang}/${encodeURIComponent(text)}`).then(
      data => {
        MAP.set(key, data);
        return data;
      }
    );
  }
};

export function uncache(word) {
  for (const [key, data] of MAP) {
    if (data.some(e => e.word === word)) {
      MAP.delete(key);
    }
  }
}
