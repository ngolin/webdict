const urld: any = {
  'fonts.googleapis.com': 'fonts.lug.ustc.edu.cn',
  'ajax.googleapis.com': 'ajax.lug.ustc.edu.cn',
  'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn',
  'fonts.gstatic.com': 'fonts-gstatic.lug.ustc.edu.cn',
  'storage.googleapis.com': 'storage-googleapis.proxy.ustclug.org',
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
