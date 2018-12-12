const urld: any = {
    'ajax.googleapis.com': 'ajax.lug.ustc.edu.cn',
    'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn'
};


chrome.webRequest.onBeforeRequest.addListener(({ url }) => {
    for (const key in urld) {
        url = url.replace(key, urld[key]);
    }
    return { redirectUrl: url };
}, { urls: Object.keys(urld).map(url => `*://${url}/*`) }, ['blocking']);
