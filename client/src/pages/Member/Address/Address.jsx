import React, { useState, useEffect, useContext } from 'react'
import classNames from "classnames/bind";
import styles from "./Address.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import GlobalContext from './../../../context/GlobalContext';

const cx = classNames.bind(styles);

const Address = () => {
  const { apiUrl, user } = useContext(GlobalContext)
  const [Addressdb, setAddressdb] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(-1);

  useEffect(() => {
    if(user) {
      axios.get(`${apiUrl}/pages/Member/Address/Address.php?username=${user.USERNAME}`)
        .then(response => {
          setAddressdb(response.data);
          const defaultAddressIndex = response.data.findIndex(address => address.isDefault === "True"); // Tìm kiếm index của địa chỉ mặc định hiện tại
          setDefaultIndex(defaultAddressIndex);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [user]);

  const deleteItem = (id, username) => {
    axios.delete(`${apiUrl}/pages/Member/Address/Address.php?id=${id}&username=${username}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleRemoveItem = (index) => {
    const id = Addressdb[index].id;
    deleteItem(id, user.USERNAME);
    const newAddress = [...Addressdb];
    newAddress.splice(index, 1);
    setAddressdb(newAddress);
  };

  const handleSetDefaultAddress = async (index) => {
    try {
      const formData = new FormData();
      const idDefault = Addressdb[defaultIndex].id;
      const id = Addressdb[index].id;
      formData.append('username', user.USERNAME);
      formData.append('idDefault', idDefault);
      formData.append('id', id);
      axios.post(`${apiUrl}/pages/Member/Address/Address.php`, formData);
      window.location.href = '/member/address';
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItem = (id) => {
    localStorage.setItem('SelectedIdAddress', id);
    window.location.href = '/member/address-edit';
  }

  return (
    <div className={cx("address")}>
      <div className={cx("header")}>
        ĐỊA CHỈ
      </div>
      <div className={cx("content")}>
        <div className={cx("button")}>
          <a href="#">
            <div className={cx("button-add")} onClick={() => window.location.href = '/member/address-add'}>
              <div className={cx("img-add")}>
                <FontAwesomeIcon icon={faPlus} className={cx("icon-add")} />
              </div>
              <div className={cx("text-add")}>Thêm địa chỉ mới</div>
            </div>
          </a>
        </div>


        {Addressdb.map((item, index) => (
          item.isDefault === "True" && (
            <div key={item.id}>
              <div className={cx("address-default")}>
                <div className={cx("info-default")}>
                  <p className={cx("text-bold")}> {`${item.lastname} ${item.firstname}`} | {item.phonenumber}</p>
                  <p> {`${item.addr}, ${item.ward}, ${item.district}, ${item.province}`} </p>
                  <div className={cx("default")}>
                    Mặc định
                  </div>
                </div>
                <div className={cx("button-modify-default")}>
                  <button className={cx("button-update")} onClick={() => handleUpdateItem(item.id)}>
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>)
        ))}

        {Addressdb.map((item, index) => (
          item.isDefault === "False" && (
            <div key={item.id}>
              <div className={cx("address-extra")}>
                <div className={cx("info-extra")}>
                  <p className={cx("text-bold")}> {`${item.lastname} ${item.firstname}`} | {item.phonenumber}</p>
                  <p> {`${item.addr}, ${item.ward}, ${item.district}, ${item.province}`} </p>
                </div>
                <div className={cx("button-modify-extra")}>
                  <button className={cx("button-delete")} onClick={() => handleRemoveItem(index)}>
                    Xóa
                  </button>
                  <button className={cx("button-update")} onClick={() => handleUpdateItem(item.id)}>
                    Cập nhật
                  </button>
                  <button className={cx("button-set-default")} onClick={() => handleSetDefaultAddress(index)}>
                    Thiết lập mặc định
                  </button>
                </div>
              </div>
            </div>)
        ))}
      </div>

    </div>
  )
}

export default Address