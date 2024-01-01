import React, { useState, useEffect, useContext } from 'react'
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import axios from 'axios';
import GlobalContext from '../../../context/GlobalContext';

const cx = classNames.bind(styles);

const Profile = () => {
  const {apiUrl, user} = useContext(GlobalContext)

  const [Profiledb, setProfiledb] = useState([]);
  useEffect(() => {
    if(user) {
      axios.get(`${apiUrl}/pages/Member/Profile/Profile.php?username=${user.USERNAME}`)
        .then(response => {
          setProfiledb(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div className={cx("profile")}>
      <div className={cx("header")}>
        THÔNG TIN CÁ NHÂN
      </div>

      <div className={cx("content")}>
        {Profiledb.map((item) => (
          <div className={cx("detail-content")} key={item.id}>
            <div className={cx("username")}>
              <div className={cx("field")}>Tên đăng nhập:</div>
              <div className={cx("info")}>{item.username}</div>
            </div>
            <div className={cx("lastname")}>
              <div className={cx("field")}>Họ:</div>
              <div className={cx("info")}>{item.lastname}</div>
            </div>
            <div className={cx("firstname")}>
              <div className={cx("field")}>Tên:</div>
              <div className={cx("info")}>{item.firstname}</div>
            </div>
            <div className={cx("phonenumber")}>
              <div className={cx("field")}>Số điện thoại:</div>
              <div className={cx("info")}>{item.phonenumber}</div>
            </div>
            <div className={cx("email")}>
              <div className={cx("field")}>Email:</div>
              <div className={cx("info")}>{item.email}</div>
            </div>
            <div className={cx("sex")}>
              <div className={cx("field")}>Giới tính:</div>
              <div className={cx("info")}>{item.sex}</div>
            </div>
            <div className={cx("dob")}>
              <div className={cx("field")}>Ngày sinh:</div>
              <div className={cx("info")}>{item.dob}</div>
            </div>
          </div>
        ))}
        <div className={cx("button")}>
          <button className={cx("button-edit")} onClick={() => window.location.href = '/member/profile-edit'} >
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile