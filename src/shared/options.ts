interface Option {
  verhtml: string;
  version: string;
}

export function getOption(consume: (options: Option) => void) {
  chrome.storage.sync.get(null, options => {
    consume(options as Option);
  });
}

export function setOption(key: 'verhtml' | 'version', value: string): void;
export function setOption(key: string, value: any): void {
  chrome.storage.sync.get(key, options => {
    options[key] = value;
    chrome.storage.sync.set(options);
  });
}

export function delOption(key: string) {
  chrome.storage.sync.remove(key);
}
