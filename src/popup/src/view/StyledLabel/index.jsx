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

export default function StyledLabel({children, ...props}) {
  return (
    <label className="styled-label-main" {...props}>
      {children}
    </label>
  );
}
