import React from 'react'
import AdminNavbar from './../../components/AdminNavbar/AdminNavbar';
import AdminSidebar from './../../components/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";

const cx = classNames.bind(styles);

const AdminLayout = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("navbar")}>
        <AdminNavbar />
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar")}>
          <AdminSidebar />
        </div>
        <div className={cx("content-container")}>
          <div className={cx("content")}>
            <Outlet />
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminLayout