import React, { useRef } from 'react';
import styles from './signIn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button';

const SignIn = ({ letters, onSocialLogin, onPageMove, onSingIn, error }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSingIn = () => {
    const loginEmail = emailRef.current.value || '';
    const loginPassword = passwordRef.current.value || '';
    onSingIn(loginEmail, loginPassword);
  };

  return (
    <div className={styles.signIn_container}>
      <div className={styles.welcome}>
        <div>WELCOME TO</div>
        <div className={styles.letters}>
          <div className={styles.letter}>{letters}</div>
        </div>
      </div>
      <form className={styles.form} action=''>
        <div className={styles.inputWrap}>
          <p className={styles.p}>이메일 </p>
          <input
            ref={emailRef}
            className={`${styles.input} ${error && styles.inputError}`}
            type='text'
            name='email'
            id='email'
          />
          {error && (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className={styles.error}
            />
          )}
        </div>
        <div className={styles.inputWrap}>
          <p className={styles.p}>비밀번호 </p>
          <input
            ref={passwordRef}
            className={`${styles.input} ${error && styles.inputError}`}
            type='password'
            name='password'
            id='password'
          />
          {error && (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className={styles.error}
            />
          )}
        </div>
        <div className={styles.buttonWrap}>
          <Button
            message='회원가입'
            onClick={onPageMove}
            version='line'
            id='signUp'
            type='button'
          />
          <Button message='로그인' onClick={handleSingIn} type='submit' />
        </div>
      </form>
      {/* <button onClick={onSocialLogin}>
        <img className={styles.googleLogo} src='/images/google.svg' />
      </button> */}
    </div>
  );
};

export default SignIn;
