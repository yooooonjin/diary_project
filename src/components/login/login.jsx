import React from 'react';
import Authentication from '../service/authentication';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ auth }) => {
  const navigate = useNavigate();
  const socialLoginBtn = () => {
    auth.googleLogin().then((data) => {
      console.log(data.user.uid);
      console.log('name : ' + data.user.displayName);
      navigate('/diary', {
        state: { userId: data.user.uid, userName: data.user.displayName },
      });
    });
  };
  return (
    <section id='login'>
      <div className={styles.login_cotainer}>
        <form className={styles.form} action=''>
          <input className={styles.input} type='text' name='id' id='id' />
          <input
            className={styles.input}
            type='password'
            name='password'
            id='password'
          />
          <button className={styles.Btn}>login</button>
        </form>
        <button className={styles.Btn} onClick={socialLoginBtn}>
          GOOGLE
        </button>
      </div>
    </section>
  );
};

export default Login;
