import classNames from "classnames/bind";
import styles from "./MemberSidebar.module.scss";
import {
  faHomeAlt,
  faUserAlt,
  faClock,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const MemberSidebar = () => {
  const items = [
    {
      text: "Thông tin cá nhân",
      icon: faUserAlt,
      link: "/member"
    },
    {
      text: "Địa chỉ",
      icon: faHomeAlt,
      link: "/member/address"
    },
    {
      text: "Thông tin đơn hàng",
      icon: faClock,
      link: "/member/Order"
    },
    {
      text: "Danh sách yêu thích",
      icon: faHeart,
      link: "/member/wishlist"
    },
  ];

  const location = useLocation();
  const activeLink = location.pathname;

  return (
    <div className={cx("container")}>
      {items.map((item, index) => (
        <Link className={cx("item-container")} key={item.text} to={item.link}>
          <FontAwesomeIcon
            icon={item.icon}
            color={item.link === activeLink ? "#c00000" : null}
            size="1x"
          />
          <p
            className={cx("item-text", item.link === activeLink && "item-text-active")}
          >
            {item.text}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MemberSidebar;
