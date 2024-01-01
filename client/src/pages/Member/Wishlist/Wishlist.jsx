import React, { useContext, useState } from "react";
import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Wishlist.module.scss";
import images from "./../../../images/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import axios from "axios";
import GlobalContext from "../../../context/GlobalContext";

const cx = classNames.bind(styles);

const Wishlist = () => {
  const { apiUrl, user } = useContext(GlobalContext);

  const handleDelete = async (id) => {
    // const newOrderbook = orderbook.filter((item) => item.id !== id);
    // setOrderbook(newOrderbook);
    try {
      var url = `${apiUrl}/pages/Member/Wishlist/Wishlist.php?id=${id}&username=${user.USERNAME}`;
      await axios.get(url);
      const response = await axios.get(
        `${apiUrl}/pages/Member/Wishlist/Wishlist.php?id=0&username=${user.USERNAME}`
      );
      getTable(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async (id) => {
    // const newOrderbook = orderbook.filter((item) => item.id !== id);
    // setOrderbook(newOrderbook);
    try {
      var url = `${apiUrl}/pages/Member/Wishlist/Wishlist_Add_cart.php?id=${id}&username=${user.USERNAME}`;

      const response = await axios.get(url);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [table, getTable] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/pages/Member/Wishlist/Wishlist.php?id=0&username=${user.USERNAME}`
        );
        getTable(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) fetchUser();
  }, [user]);

  return (
    <div className={cx("wishlist")}>
      <div className={cx("header")}>
        <h1>DANH SÁCH YÊU THÍCH</h1>
      </div>

      <div className={cx("content")}>
        {table &&
          table.map((item, index) => (
            <div key={index}>
              <div className={cx("book")}>
                <div className={cx("info")}>
                  <div className={cx("number")}>
                    <p>{index + 1}.</p>
                  </div>
                  <div className={cx("image")}>
                    <img src={item.image} width="86px" height="122px" />
                  </div>
                  <div className={cx("name")}>
                    <p>{item.name}</p>
                  </div>
                </div>

                <div className={cx("button-price-delete")}>
                  <div className={cx("button-price")}>
                    <div className={cx("price")}>
                      <div className={cx("initial-price")}>
                        <p>{getPriceExpr(item.price)}</p>
                      </div>
                      <div className={cx("last-price")}>
                        <p>{getPriceExpr(item.price, item.discount)}</p>
                      </div>
                    </div>
                    <div className={cx("button")}>
                      <button
                        className={cx("button-add")}
                        onClick={() => handleAddCart(item.ID)}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                  <button className={cx("button-delete")}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={cx("icon-trashcan")}
                      onClick={() => handleDelete(item.ID)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
