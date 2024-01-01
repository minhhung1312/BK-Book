import React, { useContext, useState } from 'react';
import { useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import images from "./../../../images/index";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import axios from 'axios';
import GlobalContext from "../../../context/GlobalContext"

const cx = classNames.bind(styles);

const Order = () => {
  const {apiUrl, user} = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState('All');
  const {orderBook, setOrderBook} = useState([])
  const [table, getTable] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(user) {
          const response = await axios.get(
            `${apiUrl}/pages/Member/Order/Order.php?id=0&username=${user.USERNAME}`
          );
          getTable(response.data);
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [user])

  const handleTabClick = async (event, cityName) => {
    setActiveTab(cityName);
    if (cityName == "All")
    {
      try {
        const response = await axios.get(
          `${apiUrl}/pages/Member/Order/Order.php?id=0&username=${user.USERNAME}`
        );
        getTable(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (cityName == "Wait-pay")
    {
      try {
        const response = await axios.get(
          `${apiUrl}/pages/Member/Order/Order.php?id=1&username=${user.USERNAME}`
        );
        getTable(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    if (cityName == "Transport")
    {
      try {
        const response = await axios.get(
          `${apiUrl}/pages/Member/Order/Order.php?id=2&username=${user.USERNAME}`
        );
        getTable(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    if (cityName == "Delivered")
    {
      try {
        const response = await axios.get(
          `${apiUrl}/pages/Member/Order/Order.php?id=3&username=${user.USERNAME}`
        );
        getTable(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    if (cityName == "Cancelled")
    {
      try {
        const response = await axios.get(
          `${apiUrl}/pages/Member/Order/Order.php?id=4&username=${user.USERNAME}`
        );
        getTable(response.data);

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={cx('order')}>
      <div className={cx('header')}>
        <h1>THÔNG TIN ĐƠN HÀNG</h1>
      </div>

      <div className={cx('tab')}>
        <button
          className={cx('tablinks', { active: activeTab === 'All' })}
          onClick={(e) => handleTabClick(e, 'All')}
        >
          Tất cả
        </button>
        <button
          className={cx('tablinks', { active: activeTab === 'Wait-pay' })}
          onClick={(e) => handleTabClick(e, 'Wait-pay')}
        >
          Chờ thanh toán
        </button>
        <button
          className={cx('tablinks', { active: activeTab === 'Transport' })}
          onClick={(e) => handleTabClick(e, 'Transport')}
        >
          Đang vận chuyển
        </button>
        <button
          className={cx('tablinks', { active: activeTab === 'Delivered' })}
          onClick={(e) => handleTabClick(e, 'Delivered')}
        >
          Đã giao
        </button>
        <button
          className={cx('tablinks', { active: activeTab === 'Cancelled' })}
          onClick={(e) => handleTabClick(e, 'Cancelled')}
        >
          Đã hủy
        </button>
      </div>

      <div className={cx('content')}>
        <div className={cx('tabcontent', { active: activeTab === 'All' })}>
          <div className={cx("state")}>
            Giao hàng thành công
          </div>
          {
          table.length != 0 ? 
          table.map((item, index) => (
            <div key={index}>
              <div className={cx("book-detail")}>
                <div className={cx("book-info")}>
                  <div className={cx("image")}>
                    <img src={item.image} width="86px" height="122px" />
                  </div>
                  <div className={cx("name-count")}>
                    <p>{item.name}</p>
                    <p>x{item.amount}</p>
                  </div>
                </div>
                <div className={cx("price")}>
                  <div className={cx("initial-price")}>
                    <p>{getPriceExpr(item.price)}</p>
                  </div>
                  <div className={cx("last-price")}>
                    <p>{getPriceExpr(item.price, item.discount)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
          : <div> Chưa có sản phẩm phù hợp</div>
          }

          <div className={cx("total")}>
            <div className={cx("repurchase")}>
              <button className={cx("button-repurchase")}>
                Mua lại
              </button>
            </div>
          </div>
        </div>

        <div className={cx('tabcontent', { active: activeTab === 'Wait-pay' })}>
        <div className={cx("state")}>
              Chờ thanh toán
        </div>
        {
          table.length != 0 ? 
          table.map((item, index) => (
            <div key={index}>
              <div className={cx("book-detail")}>
                <div className={cx("book-info")}>
                  <div className={cx("image")}>
                    <img src={item.image} width="86px" height="122px" />
                  </div>
                  <div className={cx("name-count")}>
                    <p>{item.name}</p>
                    <p>x{item.amount}</p>
                  </div>
                </div>
                <div className={cx("price")}>
                  <div className={cx("initial-price")}>
                    <p>{getPriceExpr(item.price)}</p>
                  </div>
                  <div className={cx("last-price")}>
                    <p>{getPriceExpr(item.price, item.discount)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
          : <div> Chưa có sản phẩm phù hợp</div>
          }
        </div>

        <div className={cx('tabcontent', { active: activeTab === 'Transport' })}>
        <div className={cx("state")}>
            Đang vận chuyển
        </div>
        {
          table.length != 0 ? 
          table.map((item, index) => (
            <div key={index}>
              <div className={cx("book-detail")}>
                <div className={cx("book-info")}>
                  <div className={cx("image")}>
                    <img src={item.image} width="86px" height="122px" />
                  </div>
                  <div className={cx("name-count")}>
                    <p>{item.name}</p>
                    <p>x{item.amount}</p>
                  </div>
                </div>
                <div className={cx("price")}>
                  <div className={cx("initial-price")}>
                    <p>{getPriceExpr(item.price)}</p>
                  </div>
                  <div className={cx("last-price")}>
                    <p>{getPriceExpr(item.price, item.discount)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
          : <div> Chưa có sản phẩm phù hợp</div>
          }
        </div>

        <div className={cx('tabcontent', { active: activeTab === 'Delivered' })}>
        <div className={cx("state")}>
            Đã giao
        </div>
        {
          table.length != 0 ? 
          table.map((item, index) => (
            <div key={index}>
              <div className={cx("book-detail")}>
                <div className={cx("book-info")}>
                  <div className={cx("image")}>
                    <img src={item.image} width="86px" height="122px" />
                  </div>
                  <div className={cx("name-count")}>
                    <p>{item.name}</p>
                    <p>x{item.amount}</p>
                  </div>
                </div>
                <div className={cx("price")}>
                  <div className={cx("initial-price")}>
                    <p>{getPriceExpr(item.price)}</p>
                  </div>
                  <div className={cx("last-price")}>
                    <p>{getPriceExpr(item.price, item.discount)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
          : <div> Chưa có sản phẩm phù hợp</div>
          }
        </div>

        <div className={cx('tabcontent', { active: activeTab === 'Cancelled' })}>
          <div className={cx("state")}>
            Đã Hủy
          </div>
        {
          table.length != 0 ? 
          table.map((item, index) => (
            <div key={index}>
              <div className={cx("book-detail")}>
                <div className={cx("book-info")}>
                  <div className={cx("image")}>
                    <img src={item.image} width="86px" height="122px" />
                  </div>
                  <div className={cx("name-count")}>
                    <p>{item.name}</p>
                    <p>x{item.amount}</p>
                  </div>
                </div>
                <div className={cx("price")}>
                  <div className={cx("initial-price")}>
                    <p>{getPriceExpr(item.price)}</p>
                  </div>
                  <div className={cx("last-price")}>
                    <p>{getPriceExpr(item.price, item.discount)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
          :<div> Chưa có sản phẩm phù hợp</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Order;
