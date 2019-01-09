import './conf/init.scss';
import {render} from 'react-dom';
import React from 'react';
import Update from './page/Update';
import Joinme from './page/Joinme';
import Option from './page/Option';
new Promise(resolve => {
  try {
    chrome.runtime.getBackgroundPage(background => {
      resolve(background);
    });
  } catch (e) {
    const background = {
      contxt: {userflag: 12},
      webdictDisabled: false,
      yuelangDisabled: true,
      isDisabled: () => {
        return [background.webdictDisabled, background.yuelangDisabled];
      },
      setWebdict: value => {
        background.webdictDisabled = value;
      },
      setYuelang: value => {
        background.yuelangDisabled = value;
      }
    };
    resolve(background);
  }
}).then(background => {
  const {
    contxt: {userflag = -1}
  } = background;
  const root = document.getElementById('root');
  if (userflag === -1) {
    render(<Update />, root);
  } else if (userflag === 0) {
    render(<Joinme />, root);
  } else {
    render(<Option {...background} />, root);
  }
});
