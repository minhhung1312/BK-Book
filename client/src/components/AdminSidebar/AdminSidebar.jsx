import classNames from "classnames/bind";
import styles from "./AdminSidebar.module.scss";
import images from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import {
  faHome,
  faEnvelope,
  faPenFancy,
  faUserAlt,
  faBook,
  faFolder,
  faPlus,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const cx = classNames.bind(styles);

const AdminSidebar = () => {
  const items = [
    {
      text: "Dashboard",
      icon: faHome,
      link: "/admin",
    },
    {
      text: "Hộp thư đến",
      icon: faEnvelope,
      link: "/admin/mailbox",
    },
    {
      text: "Quản lý tin tức",
      icon: faNewspaper,
      link: "/admin/manage-news",
    },
    {
      text: "Quản lý sách",
      icon: faBook,
      link: "/admin/manage-book",
    },
    {
      text: "Quản lý thành viên",
      icon: faUserAlt,
      link: "/admin/manage-user",
    },
    {
      text: "Quản lý tài nguyên",
      icon: faFolder,
      link: "/admin/manage-resource",
    },
  ];
  const location = useLocation();
  const activeLink = location.pathname;

  const {user} = useContext(GlobalContext)

  return (
    <div className={cx("container")}>
      <div className={cx("top")}>
        <img src={images.adminAvatar} className={cx("admin-avatar")} />
        <div className={cx("admin-infos")}>
          <h6 className={cx("admin-name")}>{`${user.lname} ${user.fname}`}</h6>
          <p className={cx("admin-role")}>Admin</p>
        </div>
      </div>
      <div className={cx("bottom")}>
        {items.map((item) => (
          <Link to={item.link} className={cx("item-container")} key={item.text}>
            <div className={cx("sidebar-icon")}>
              <FontAwesomeIcon
                icon={item.icon}
                color={item.link === activeLink ? "#c00000" : null}
                size="1x"
              />
            </div>
            <p
              className={cx(
                "item-text",
                item.link === activeLink && "item-text-active"
              )}
            >
              {item.text}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
