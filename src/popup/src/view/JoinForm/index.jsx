/**
 * 李鸿章<lihz@hugeinfo.com.cn>
 * 2019年1月14日 19:34
 *
 */

import React from 'react';
// import { Link } from 'react-router-dom';
// import { Modal } from 'antd-mobile';
import {Icon} from 'antd';
// import chunk from 'lodash/chunk';

import './style.scss';

export default function JoinForm({
  loading,
  step,
  label,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  count,
  resendEmail,
  nextStep
}) {
  return (
    <form className="join-form-main" onSubmit={nextStep}>
      <label for="username" className="join-form-label">
        {label || '# Welcome #'}
      </label>
      <input
        className="join-form-username"
        placeholder="使用邮箱登录或注册"
        onChange={onUsernameChange}
        value={username}
        name="username"
      />
      {step > 0 && (
        <div className="join-form-flex">
          <input
            className="join-form-password"
            placeholder="在收信箱查收密码"
            onChange={onPasswordChange}
            value={password}
            type="password"
            name="password"
          />
          {count > 0 && (
            <button className="join-form-resend" onClick={resendEmail}>
              重发({count})
            </button>
          )}
        </div>
      )}
      <button type="sumbit" className="join-form-submit" onClick={nextStep}>
        {step === 0 ? '下一步 ' : step === 1 ? '登录 ' : '注册 '}
        <Icon
          style={{visibility: loading ? 'visible' : 'hidden'}}
          type="loading"
        />
      </button>
    </form>
  );
}
