export const enum PageScriptAction {
  PLAY_SOUND,
  SEARCH_TEXT,
  DEFINE_WORD,
  WORD_VIEWED,
  ADD_NOTE,
}

// Note: set `string` initializers using as `string` key as well.
export const enum BackgroundAction {
  PLAY_ERROR = 'PLAY_ERRER',
  ADD_NOTE = 'ADD_NOTE',
  HIGHLIGHT = 'HIGHLIGHT_SELECTION',
  MASKING = 'MASKING',
}

/** 语言代号，用于请求_查词接口_等 */
export const enum LanguageCode {
  /** 汉语代号 */
  ZH = 'zh',
  /** 英语代号 */
  EN = 'en',
  /** 粤语代号 */
  JP = 'jp',
}

// export const enum DefineScope {
//   ALL = 'all',
//   OWN = 'own',
// }
