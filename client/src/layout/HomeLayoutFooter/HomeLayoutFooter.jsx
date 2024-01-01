import React, { useContext } from "react";
import Footer from "./../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import classNames from "classnames/bind";
import styles from "./HomeLayoutFooter.module.scss";
import HoverPanel from "../../components/HoverPanel/HoverPanel";
import GlobalContext from "../../context/GlobalContext";

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const cx = classNames.bind(styles);

const HomeLayoutFooter = () => {

  const { showHoverPanel } = useContext(GlobalContext)  

  return (
    // <div className={cx("container")}>
    //   <div className={cx("navbar")}>
    //     <Navbar />
    //   </div>
    //   <div className={cx("hover-container")} style={{display: showHoverPanel ? "flex" : "none"}}>
    //     <HoverPanel />
    //   </div>
    //   <div className={cx("wrapper")}>
    //     <div className={cx("content")}>
    //       <Outlet />
    //     </div>
    //     <div className={cx("footer")}>
    //       <Footer />
    //     </div>
    //   </div>
    // </div>
    
    <div style={{backgroundColor:"#f0f0f0"}}>
      <Navbar />
      <div className={cx("hover-container")} style={{display: showHoverPanel ? "flex" : "none"}}>
        <HoverPanel />
      </div>
      <div className="container" style={{maxWidth:"960px"}}>
        <div className="w-100 mb-4">
          <Outlet />
        </div>
        <div className={cx("footer")}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeLayoutFooter;
