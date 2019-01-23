/**
 * 李鸿章<lihz@hugeinfo.com.cn>
 * 2019年1月11日 11:49
 *
 */

import React from 'react';
// import { Link } from 'react-router-dom';
// import { Modal } from 'antd-mobile';
import {Icon} from 'antd';
// import chunk from 'lodash/chunk';
// import tree from 'hife/tree';

import './style.scss';

export default function StyledButton({loading, children, ...props}) {
  return (
    <button className="styled-button-main" {...props}>
      {children}
      &nbsp;
      <Icon
        style={{visibility: loading ? 'visible' : 'hidden'}}
        type="loading"
      />
    </button>
  );
}

// export default class StyledButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ''
//     };
//   }

//   render() {
//     return (
//       <div className="styled-button-main">
//         StyledButton
//       </div>
//     );
//   }

// }
