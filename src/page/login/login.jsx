import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faStar } from '@fortawesome/free-solid-svg-icons';

import SignIn from '../../components/signIn/signIn';
import Signup from '../../components/signUp/signUp';
import Dots from '../../components/dots/dots';

const Login = ({ auth, userRepository }) => {
  const navigate = useNavigate();

  const welcomeTxt = 'RECORD OF MEMORIES!';
  const [letters, setLetters] = useState('');
  const [lettersCount, setLettersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState('signIn');
  const [error, setError] = useState('');

  //welcome문구 타이핑 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setLetters(letters + welcomeTxt[lettersCount]);
      setLettersCount(lettersCount + 1);
    }, 200);
    if (lettersCount === welcomeTxt.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  //페이지 이동
  const onPageMove = (e) => {
    setError('');
    setCurrentPage(e.target.id);
  };

  //회원가입
  const onSingUp = (email, password, name) => {
    auth
      .signUp(email, password)
      .then((data) => {
        setError('');
        setCurrentPage('signIn');
        userRepository.saveUser(data.user.uid, {
          userId: data.user.uid,
          userEmail: email,
          userName: name,
        });
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  //로그인
  const onSingIn = (email, password) => {
    auth
      .signIn(email, password)
      .then((data) => {
        setError('');
        navigate('/record', {
          state: { user: { id: data.user.uid, name: data.user.name } },
        });
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  //소셜 로그인
  const onSocialLogin = () => {
    auth.googleLogin().then((data) => {
      navigate('/record', {
        state: { user: { id: data.user.uid } },
      });
    });
  };

  return (
    <>
      <section id='login'>
        <div className={styles.login_container}>
          <div className={styles.login}>
            <div className={styles.login_mark}>
              <Dots />
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                className={styles.arrowRotate}
              />
              <div className={styles.url}>https://www.yoonjin.com</div>
              <FontAwesomeIcon icon={faStar} className={styles.star} />
            </div>
            {currentPage === 'signIn' && (
              <SignIn
                letters={letters}
                onSocialLogin={onSocialLogin}
                onPageMove={onPageMove}
                onSingIn={onSingIn}
                error={error}
              />
            )}
            {currentPage === 'signUp' && (
              <Signup
                onPageMove={onPageMove}
                onSingUp={onSingUp}
                error={error}
              />
            )}
          </div>
          <div className={styles.rights}>
            2022 YoonJin - All rights reserved
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
