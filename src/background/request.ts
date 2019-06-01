const urld: any = {
  // http://fonts.googleapis.com/css?family=Inconsolata
  // https://fonts.proxy.ustclug.org/css?family=Inconsolata
  // 'fonts.googleapis.com': 'fonts.proxy.ustclug.org', # 封锁已解除
  // https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
  // https://ajax.proxy.ustclug.org/ajax/libs/jquery/1.12.4/jquery.min.js
  'ajax.googleapis.com': 'ajax.proxy.ustclug.org',
  'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn',
  // 'fonts.gstatic.com': 'fonts-gstatic.lug.ustc.edu.cn', # 封锁已解除
  'storage.googleapis.com': 'storage-googleapis.proxy.ustclug.o··rg',
  'gerrit.googlesource.com': 'gerrit-googlesource.proxy.ustclug.org'
};

chrome.webRequest.onBeforeRequest.addListener(
  ({url}) => {
    for (const key in urld) {
      url = url.replace(key, urld[key]);
    }
    return {redirectUrl: url};
  },
  {urls: Object.keys(urld).map(url => `*://${url}/*`)},
  ['blocking']
);
