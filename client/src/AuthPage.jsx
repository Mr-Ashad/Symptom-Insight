import React from 'react'
import styles from './AuthPage.module.css';
import { Link } from 'react-router-dom';

import user_icon from './Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'


export const AuthPage = ({ isRegisterPage }) => {
  return (
    <div className={styles.container}> {/* Use styles.container */}
      <form action="">
        <div className={styles.text1}>{isRegisterPage ? 'Register' : 'Login'}</div> {/* Use styles.text1 */}
        <div className={styles['input-box']}> {/* Use styles['input-box'] */}
          <input required type="text" placeholder='Username' /><img className={styles.img1} src={user_icon} alt="" />
        </div>
        {isRegisterPage && (
          <div className={styles['input-box']}> {/* Use styles['input-box'] */}
            <input required type="email" placeholder="Email" /><img className={styles.img1} src={email_icon} alt="" srcSet="" />
          </div>
        )}
        <div className={styles['input-box']}> {/* Use styles['input-box'] */}
          <img src={password_icon} alt="" />
          <input required type="password" placeholder='Password' />
        </div>
        {!isRegisterPage && (
          <div className={styles['forgot-password']}> {/* Use styles['forgot-password'] */}
            <input type="checkbox" /> <span>Remember Me</span>
          </div>
        )}
        <button className={styles.btnn} type='submit'> {isRegisterPage ? "Register" : "Login"} </button> {/* Use styles.btnn */}
        <div className={styles['register-link']}> {/* Use styles['register-link'] */}
          <p className={styles.para}>{isRegisterPage ? 'Already have an account?' : "Don't have an account?"}
            <Link to={isRegisterPage ? '/auth' : '/register'}>{isRegisterPage ? 'Login' : 'Register'}</Link></p>
        </div>
      </form>
    </div>
  );
}

export default AuthPage;