const enum Action { AddNote, StopFind }

interface Message {
  action: Action;
}
type Response = (res: any) => void;

type Sender = chrome.runtime.MessageSender;

namespace Runtime {
  export function addEventListener(callback: (msg: Message, sender: Sender, sendRes: Response) => void) {
    chrome.runtime.onMessage.addListener(callback);
  }

  export function sendMessageToTab(tabId: number, message: Message, sendRes?: Response) {
    if (sendRes) chrome.tabs.sendMessage(tabId, message, sendRes);
    else chrome.tabs.sendMessage(tabId, message);
  }
  export function sendMessage(message: Message, sendRes?: Response) {
    if (sendRes) chrome.runtime.sendMessage(message, sendRes);
    else chrome.runtime.sendMessage(message);
  }
}

export default Runtime;
