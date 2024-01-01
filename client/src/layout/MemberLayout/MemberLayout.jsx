import React, { useContext } from 'react'
import MemberSidebar from './../../components/MemberSidebar/MemberSidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import classNames from "classnames/bind";
import styles from "./MemberLayout.module.scss";
import HoverPanel from '../../components/HoverPanel/HoverPanel';
import GlobalContext from '../../context/GlobalContext';

const cx = classNames.bind(styles);

const MemberLayout = () => {

  const { showHoverPanel } = useContext(GlobalContext)  
  
  return (
    <div className={cx("container")}>
      <div className={cx("navbar")}>
        <Navbar />
      </div>
      <div className={cx("hover-container")} style={{display: showHoverPanel ? "flex" : "none"}}>
        <HoverPanel />
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar-container")}>
          <div className={cx("sidebar")}>
            <MemberSidebar />
          </div>
        </div>
        <div className={cx("content")}>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default MemberLayout