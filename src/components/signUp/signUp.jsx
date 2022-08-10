import React, { useEffect, useRef, useState } from 'react';
import styles from './signUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button';
import { emailCheck, nameCheck, passwordCheck } from '../../service/validation';

const Signup = ({ onPageMove, onSingUp, error }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [errtxt, setErrTxt] = useState({});

  const handleSingUp = () => {
    const createdEmail = emailRef.current.value;
    const createdPassword = passwordRef.current.value;
    const createdName = nameRef.current.value;

    const emailErrTxt = emailCheck(createdEmail);
    const passwordErrTxt = passwordCheck(createdPassword);
    const nameErrTxt = nameCheck(createdName);

    const newErrorTxt = {
      email: emailErrTxt,
      password: passwordErrTxt,
      name: nameErrTxt,
    };
    if (emailErrTxt) emailRef.current.value = '';
    if (passwordErrTxt) passwordRef.current.value = '';
    if (nameErrTxt) nameRef.current.value = '';
    setErrTxt(newErrorTxt);
    if (emailErrTxt || passwordErrTxt || nameErrTxt) return;

    onSingUp(createdEmail, createdPassword, createdName);
  };

  useEffect(() => {
    emailRef.current.focus();
  });
  return (
    <form className={styles.form} action=''>
      <div className={styles.signUp_container}>
        {error && (
          <div className={styles.errormessage}>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className={styles.overlapError}
            />
            {error === 'auth/email-already-in-use' && (
              <p className={styles.overlapError}>이미 존재하는 이메일입니다.</p>
            )}
          </div>
        )}
        <div>
          <input
            ref={emailRef}
            type='text'
            className={`${styles.createInput} ${errtxt.email && styles.error}`}
            placeholder={`${
              errtxt.email ? errtxt.email : '이메일을 입력해주세요.'
            }`}
          />
        </div>
        <div>
          <input
            ref={passwordRef}
            type='password'
            className={`${styles.createInput} ${
              errtxt.password && styles.error
            }`}
            placeholder={`${
              errtxt.password ? errtxt.password : '비밀번호를 입력해주세요.'
            }`}
          />
        </div>
        <div>
          <input
            ref={nameRef}
            type='text'
            className={`${styles.createInput} ${errtxt.name && styles.error}`}
            placeholder={`${
              errtxt.name ? errtxt.name : '이름을 입력해주세요.'
            }`}
          />
        </div>
        <div className={styles.buttonWrap}>
          <Button
            message='취소'
            onClick={onPageMove}
            version='line'
            id='signIn'
            type='button'
          />
          <Button message='회원가입' onClick={handleSingUp} type='submit' />
        </div>
      </div>
    </form>
  );
};

export default Signup;
