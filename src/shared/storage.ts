interface Item {
  [pron: string]: string | number;
}
interface Section {
  [key: string]: Item;
}
type sectionKey = ':ngl@vocabulary' | ':ngl@notebook';
interface Storage {
  [':ngl@vocabulary']: Section;
  [':ngl@notebook']: Section;
}

export function queryStorage(
  sectionKey: sectionKey,
  consume: (section?: Section, modify?: (section: Section) => void) => void
) {
  try {
    chrome.storage.local.get(sectionKey, (storage: Storage) => {
      consume(storage[sectionKey], section => {
        storage[sectionKey] = section;
        chrome.storage.local.set(storage);
      });
    });
  } catch (e) {}
}

export function updateStorage(
  sectionKey: sectionKey,
  itemKey: string,
  update: (oldItem: Item, save: (newItem: Item) => void) => void
) {
  try {
    chrome.storage.local.get(sectionKey, (storage: Storage) => {
      if (!storage[sectionKey]) storage[sectionKey] = Object.create(null);
      update(storage[sectionKey][itemKey] || Object.create(null), item => {
        storage[sectionKey][itemKey] = item;
        chrome.storage.local.set(storage);
      });
    });
  } catch (e) {}
}

export function insertStorage(sectionKey: sectionKey, itemKey: string, item: Item) {
  try {
    chrome.storage.local.get(sectionKey, (storage: Storage) => {
      if (!storage[sectionKey]) storage[sectionKey] = Object.create(null);
      storage[sectionKey][itemKey] = item;
      chrome.storage.local.set(storage);
    });
  } catch (e) {}
}

export function removeStorage(sectionKey: sectionKey, itemKey: string) {
  try {
    chrome.storage.local.get(sectionKey, (storage: Storage) => {
      if (storage[sectionKey] && storage[sectionKey][itemKey]) {
        delete storage[sectionKey][itemKey];
        chrome.storage.local.set(storage);
      }
    });
  } catch (e) {}
}
