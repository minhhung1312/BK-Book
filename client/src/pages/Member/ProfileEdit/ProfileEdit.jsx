import React, { useState, useEffect, useContext } from 'react'
import classNames from "classnames/bind"
import styles from "./ProfileEdit.module.scss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
import GlobalContext from './../../../context/GlobalContext';

const cx = classNames.bind(styles);

const Profileedit = () => {
  const {user, apiUrl} = useContext(GlobalContext)
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());

  useEffect(() => {
    if(user) {
      axios
        .get(
          `${apiUrl}/pages/Member/ProfileEdit/ProfileEdit.php?username=${user.USERNAME}`
        )
        .then((response) => {
          const data = response.data[0];
          setLastName(data.lastname);
          setFirstName(data.firstname);
          setPhoneNumber(data.phonenumber);
          setEmail(data.email);
          setGender(data.gender);
          setDob(new Date(data.dob));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSave = async (event) => {
    if (!lastName || !firstName || !phoneNumber || !email) {
      alert("Vui lòng điền đầy đủ thông tin");
    }
    else {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('username', user.USERNAME);
        formData.append('lastname', lastName);
        formData.append('firstname', firstName);
        formData.append('phonenumber', phoneNumber);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('dob', moment(dob).format('YYYY-MM-DD'));
        axios.post(`${apiUrl}/pages/Member/ProfileEdit/ProfileEdit.php`
          , formData);
        window.location.href = '/member';
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <div className={cx("profile-edit")}>
      <div className={cx("header")}>
        CHỈNH SỬA THÔNG TIN CÁ NHÂN
      </div>
      <div className={cx("content")}>
        <div className={cx("username")}>
          <div className={cx("field")}>Tên đăng nhập:</div>
          <div className={cx("info")}>{user && user.USERNAME}</div>
        </div>
        <div className={cx("lastname")}>
          <div className={cx("field")}>Họ:</div>
          <div className={cx("info")}>
            <input type="text" value={lastName} onChange={(event) => handleChange(event, setLastName)} />
          </div>
        </div>
        <div className={cx("firstname")}>
          <div className={cx("field")}>Tên:</div>
          <div className={cx("info")}>
            <input type="text" value={firstName} onChange={(event) => handleChange(event, setFirstName)} />
          </div>
        </div>
        <div className={cx("phonenumber")}>
          <div className={cx("field")}>Số điện thoại:</div>
          <div className={cx("info")}>
            <input type="text" value={phoneNumber} onChange={(event) => handleChange(event, setPhoneNumber)} />
          </div>
        </div>
        <div className={cx("email")}>
          <div className={cx("field")}>Email:</div>
          <div className={cx("info")}>
            <input type="text" value={email} onChange={(event) => handleChange(event, setEmail)} />
          </div>
        </div>
        <div className={cx("sex")}>
          <div className={cx("field")}>Giới tính:</div>
          <div className={cx("info")}>
            <label className={cx("container-radio")}>
              Nam
              <input type="radio" checked={gender === "Nam"} onChange={(event) => handleChange(event, setGender)} value="Nam" name="gender" />
              <span className={cx("checkmark")}></span>
            </label>
            <label className={cx("container-radio")}>
              Nữ
              <input type="radio" checked={gender === "Nữ"} onChange={(event) => handleChange(event, setGender)} value="Nữ" name="gender" />
              <span className={cx("checkmark")}></span>
            </label>
            <label className={cx("container-radio")}>
              Khác
              <input type="radio" checked={gender === "Khác"} onChange={(event) => handleChange(event, setGender)} value="Khác" name="gender" />
              <span className={cx("checkmark")}></span>
            </label>
          </div>
        </div>
        <div className={cx("dob")}>
          <div className={cx("field")}>Ngày sinh:</div>
          <div className={cx("info")}>
            <DatePicker selected={dob} onChange={(date) => setDob(date)} dateFormat="yyyy-MM-dd" />
          </div>
        </div>
        <div className={cx("button")}>
          <button className={cx("button-cancel")} onClick={() => window.location.href = '/member'}>
            Hủy
          </button>
          <button className={cx("button-save")} onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profileedit