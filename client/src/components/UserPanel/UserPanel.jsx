import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import {
  faRightFromBracket,
  faUserAlt,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./UserPanel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

const UserPanel = () => {
  const { user, apiUrl } = useContext(GlobalContext);
  const navigate = useNavigate();

  const items = [
    {
      icon: faUserAlt,
      text: "Tài khoản",
      link: "/member",
    },
    {
      icon: faUserGear,
      text: "Admin",
      link: "/admin",
    },
    {
      icon: faRightFromBracket,
      text: "Đăng xuất",
      link: "/",
    },
  ];

  const handleLogout = async () => {
    try {
      localStorage.removeItem("checkoutItems")
      await axios.get(`${apiUrl}/utils/logout.php`);
      window.location.href = "/"
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={cx("container")}>
      {items.map((item, index) => {
        if (index !== 1 || (user && user.isAdmin === "True"))
          return (
            <Link
              className={cx("item-container")}
              key={item.text + index}
              onClick={index === items.length - 1 ? handleLogout : null}
              to={index !== items.length - 1 ? item.link : null}
            >
              <div className={"item-icon"}>
                <FontAwesomeIcon icon={item.icon} size={"xl"} />
              </div>
              <p className={cx("item-text")}>{item.text}</p>
            </Link>
          );
      })}
    </div>
  );
};

export default UserPanel;
