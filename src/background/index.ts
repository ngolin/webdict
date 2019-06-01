import {OptionProps} from '../options';
export {OptionProps} from '../options';
export interface BGWindow extends Window {
  setOptions<K extends keyof OptionProps>(key: K, val: OptionProps[K]): void;
  getOptions(): OptionProps;
}
