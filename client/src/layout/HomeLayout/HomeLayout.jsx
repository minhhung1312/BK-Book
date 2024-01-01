import React, { useContext } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./HomeLayout.module.scss";
import HoverPanel from "../../components/HoverPanel/HoverPanel";
import GlobalContext from "../../context/GlobalContext";

const cx = classNames.bind(styles);

const HomeLayout = () => {

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
  );
};

export default HomeLayout;
