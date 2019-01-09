import React from 'react';

import './style.scss';

export default function UpdateView() {
  return (
    <div className="update-view-main">
      <div className="update-view-version">当前版本：v1.1.0</div>
      <div className="update-view-update">
        <a href="https://webdict.github.io/?v=1.1.0" target="_blank">
          检查更新
        </a>
      </div>
    </div>
  );
}
