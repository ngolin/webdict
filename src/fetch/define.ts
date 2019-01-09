import fetch from './_';
import {uncache} from './search';

export default ({word, data}) => (uncache(word), fetch(`/app/v1/define/${encodeURIComponent(word)}`, data));
