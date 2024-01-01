import classNames from "classnames/bind";
import images from "../../images";
import { useNavigate } from "react-router-dom";

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

const Logo = () => {

  const navigate = useNavigate();

  return (
    // <div className={cx("container")} onClick={() => {
    //   navigate("/")
    // }}>
    //   <img className={cx("logo-image")} src={images.logoImage} />
    // </div>

    <img className={cx("logo-image")} src={images.logoImage} style={{height:"3rem"}} onClick={() => navigate("/")}/>
  )
}

export default Logo