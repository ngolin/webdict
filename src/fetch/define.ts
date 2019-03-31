import {PageScriptData} from '../shared/types';
import fetch from './_';
import {uncache} from './search';

export default ({word, data, type}: PageScriptData.Define) => (
  uncache(word),
  fetch(`/app/v1/define/${type}/${encodeURIComponent(word)}`, data)
);
