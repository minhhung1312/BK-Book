import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import HoverPanel from '../../components/HoverPanel/HoverPanel';

const cx = classNames.bind(styles);

const AuthLayout = () => {

  const { showHoverPanel } = useContext(GlobalContext)

  return (
    <div className={cx("container")}>
      <div className={cx("navbar")}>
        <Navbar />
      </div>
      <div className={cx("hover-container")} style={{display: showHoverPanel ? "flex" : "none"}}>
        <HoverPanel />
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>

  )
}

export default AuthLayout