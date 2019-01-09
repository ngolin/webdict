/**
 * 李鸿章<lihz@hugeinfo.com.cn>
 * 2018年12月16日 17:54
 *
 */

import React from 'react';
// import { Link } from 'react-router-dom';
// import { Modal } from 'antd-mobile';
// import { Icon } from 'antd';
// import chunk from 'lodash/chunk';
import tree from 'hife/tree';

import './style.scss';

export default function SwitchView({disabled, text, onClick}) {
  return (
    <div className="switch-view-main">
      <div className={tree({'switch-view-text': {disabled}})}>{text}</div>
      <div className={tree({'switch-view-slider': {disabled}})} onClick={onClick} />
    </div>
  );
}

// export default class SwitchView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ''
//     };
//   }

//   render() {
//     return (
//       <div className="switch-view-main">
//         SwitchView
//       </div>
//     );
//   }

// }
