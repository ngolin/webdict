/**
 * 李鸿章<lihz@hugeinfo.com.cn>
 * 2019年1月11日 11:49
 *
 */

import React from 'react';
// import { Link } from 'react-router-dom';
// import { Modal } from 'antd-mobile';
// import { Icon } from 'antd';
// import chunk from 'lodash/chunk';
// import tree from 'hife/tree';

import './style.scss';

export default function StyledForm({children, ...props}) {
  return (
    <form className="styled-form-main" {...props}>
      {children}
    </form>
  );
}

// export default class StyledForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ''
//     };
//   }

//   render() {
//     return (
//       <div className="styled-form-main">
//         StyledForm
//       </div>
//     );
//   }

// }
