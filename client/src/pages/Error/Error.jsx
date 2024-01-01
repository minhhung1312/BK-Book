import React from 'react'
import Navbar from "../../components/Navbar/Navbar";
import classNames from "classnames/bind";
import styles from "./Error.module.scss";
import error from "../../assets/error.png";
import HoverPanel from "../../components/HoverPanel/HoverPanel";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Error = () => {

  const { showHoverPanel } = useContext(GlobalContext)
  return (
    <div className={cx("container")}>
      <div className={cx("navbar")}>
        <Navbar />
      </div>
      <div className={cx("hover-container")} style={{ display: showHoverPanel ? "flex" : "none" }}>
        <HoverPanel />
      </div>
      <div className={cx("content")}>
        <div className={cx("image")}>
          <img className={cx("img-er")} src={error} />
        </div>

        <div className={cx("text")}>
          <h1>
            Rất tiếc, không thể tìm thấy trang này
          </h1>
          <p>
            Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
          </p>
        </div>

        <div className={cx("button")}>
          <button className={cx("button-back")} onClick={() => window.location.href = '/'}>
            <FontAwesomeIcon icon={faArrowLeft} className={cx("icon-back")} />
            Trở về trang chủ
          </button>
        </div>
      </div>
    </div>

  )
}

export default Error