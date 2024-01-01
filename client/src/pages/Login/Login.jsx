import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios';
import GlobalContext from '../../context/GlobalContext';

const cx = classNames.bind(styles);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const {apiUrl} = useContext(GlobalContext)

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      // const response = await axios.post(
      //   '${apiUrl}/Login.php',
      //   formData,
      //   {
      //     withCredentials: true
      //   }
      // );
      const response = await axios.post(
        `${apiUrl}/pages/Login/Login.php`,
        formData,
        {
          withCredentials: true
        }
      );
      if (response.data.status === 'banned') {
        setErrorMessage(response.data.message);
      }
      else if (response.data.status === 'success') {
        // localStorage.setItem('username', response.data.username);
        window.location.href = '/';
        // navigate("/")
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("Login_content")}>
        <div className={cx("method", "flex")}>
          <div className={cx("a_method_grid")}>
            <a className={cx("login_and_register", "spec")} href="">
              Đăng nhập
            </a>
          </div>
          <div className={cx("a_method_grid")}>
            <a className={cx("login_and_register")} href="auth/register">
              Đăng ký
            </a>
          </div>
        </div>

        <form className={cx("Body_form", "center")} onSubmit={handleLogin}>
          <div className={cx("form_content")}>
            <label htmlFor="username" className={cx("block", "p-2", "label")}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className={cx("block", "p-2", "input")}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="password" className={cx("block", "p-2", "label")}>
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              className={cx("block", "p-2", "input")}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <div className={cx("Submit_section")}>
              <input type="submit" value="Đăng nhập" className={cx("submit_button")} />
            </div>
            {errorMessage && <div className={cx("error")}>{errorMessage}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
