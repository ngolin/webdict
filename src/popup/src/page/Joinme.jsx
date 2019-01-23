import React, {useState, useEffect} from 'react';
import JoinForm from '../view/JoinForm';
import Fetch from '../fetch';
export default function Joinme() {
  const [step, setStep] = useState(0);
  const [label, setLabel] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      if (count < 1) return;
      const timer = setTimeout(setCount, 1000, count - 1);
      return () => clearTimeout(timer);
    },
    [count]
  );
  function onUsernameChange({target: {value}}) {
    if (loading) return;
    setUsername(value);
  }
  function onPasswordChange({target: {value}}) {
    setPassword(value);
  }
  function nextStep(event) {
    if (loading) return;
    event.preventDefault();
    if (!/^[-._a-z0-9]+@(?:[-a-z0-9]+\.)+[a-z]+$/.test(username)) {
      setLabel('用户邮箱格式错误');
      setPassword('');
      setUsername('');
      setStep(0);
      return;
    }
    if (step === 0) {
      setLoading(true);
      return Fetch.signup({username}).then(status => {
        setLoading(false);
        if (status > 0) {
          setStep(status);
          setCount(20);
        }
      });
    }
    if (/^[-_a-zA-Z0-9]{12}$/.test(password)) {
      setLoading(true);
      return Fetch.signin({username, password}).then(status => {
        setLoading(false);
        switch (status) {
          case 0:
            setLabel('用户密码错误');
            setPassword('');
            return;
          case 1:
            setLabel('成功！');
        }
      });
    }
    setLabel('登录密码格式错误');
    setPassword('');
  }
  function resendEmail() {
    Fetch.signup;
  }
  return (
    <JoinForm
      onUsernameChange={onUsernameChange}
      onPasswordChange={onPasswordChange}
      resendEmail={resendEmail}
      nextStep={nextStep}
      username={username}
      password={password}
      loading={loading}
      label={label}
      count={count}
      step={step}
    />
  );
}
