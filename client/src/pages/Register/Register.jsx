import React, { useContext, useState } from 'react'
import axios from 'axios'
import classNames from "classnames/bind"
import styles from "./Register.module.scss"
import GlobalContext from '../../context/GlobalContext'

const cx = classNames.bind(styles)

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const {apiUrl} = useContext(GlobalContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu không khớp')
      return
    }
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post(
        `${apiUrl}/pages/Register/Register.php`,
        formData
      );
      if (response.data.status === 'success') {
        window.location.href = '/auth';
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={cx("container")}>
      <div className={cx("Login_content")}>

        <div className={cx("method", "flex")}>
          <div className={cx("a_method_grid")}>
            <a className={cx("login_and_register")} href="/auth">
              Đăng nhập
            </a>
          </div>
          <div className={cx("a_method_grid")}>
            <a className={cx("login_and_register", "spec")} href="">
              Đăng ký
            </a>
          </div>
        </div>

        <form className={cx("Body_form", "center")} onSubmit={handleSubmit}>
          <div className={cx("form_content")}>
            <label htmlFor="username" className={cx("block", "p-2", "label")}>Username</label>
            <input type="text" name="username" className={cx("block", "p-2", "input")} onChange={(e) => setUsername(e.target.value)} value={username} />
            <label htmlFor="password" className={cx("block", "p-2", "label")}>Mật khẩu</label>
            <input type="password" name="password" className={cx("block", "p-2", "input")} onChange={(e) => setPassword(e.target.value)} value={password} />
            <label htmlFor="confirm_password" className={cx("block", "p-2", "label")}>Nhập lại mật khẩu</label>
            <input type="password" name="confirm_password" className={cx("block", "p-2", "input")} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            <div className={cx("Submit_section")}>
              <input type="submit" value="Đăng ký" className={cx("submit_button")} />
            </div>
            {errorMessage && <div className={cx("error")}>{errorMessage}</div>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register