import React, { useContext, useEffect, useState } from "react";
import images from "./../../images/index";
import AddButton from "../../components/AddButton/AddButton";
import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import { getPriceExpr } from "../../utils/getPriceRepr";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Checkout = () => {

  const { chosenCartItems, apiUrl, user } = useContext(GlobalContext)
  const navigate = useNavigate()
  const expressDeliveryProvinces = ["TPHCM", "Hà Nội", "Đà Nẵng"];

  
  const getTotalPrice = (deliveryFee = 0) =>
  getPriceExpr(
    chosenCartItems.reduce((prev, curr) => {
      return prev + curr.price * (1 - curr.discount / 100) * curr.count;
    }, deliveryFee)
    );
    
  const [userAddresses, setUserAddresses] = useState([])
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressChoice, setAddressChoice] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [hasExpress, setHasExpress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`${apiUrl}/pages/Checkout/Checkout.php`)
      const temp = res.data
      setUserAddresses(temp.sort((a, b) => {
        if (a.isDefault === "True") return 1;
        return -1;
      }))
    }
    fetchUserInfo()
  }, [])

  useEffect(() => {
    setName(
      `${userAddresses[addressChoice]?.lname} ${userAddresses[addressChoice]?.fname}`
    );
    setPhone(userAddresses[addressChoice]?.phone);
    setHasExpress(
      expressDeliveryProvinces.includes(userAddresses[addressChoice]?.province)
    );
  }, [addressChoice, userAddresses[addressChoice]?.lname]);

  const deliveryMethodTexts = [
    "Thông thường",
    "Nhanh",
    `Hỏa tốc ${!hasExpress ? "(không hỗ trợ)" : ""}`,
  ];

  const deliveryMethods = ["Thông thường", "Nhanh", "Hỏa tốc"];

  const paymentMethods = [
    {
      text: "Ví Momo",
      logo: images.momoLogo,
    },
    {
      text: "Ví ZaloPay",
      logo: images.zalopayLogo,
    },
    {
      text: "ATM / Internet Banking",
      logo: images.atmLogo,
    },
    {
      text: "Thẻ tín dụng (Visa, Mastercard)",
      logo: images.creditcardLogo,
    },
    {
      text: "Thanh toán khi nhận hàng (COD)",
      logo: images.codLogo,
    },
  ];

  const handlePurchase = async () => {
    const purchasedItemsIds = chosenCartItems.map(item => item.id)
    const formData = new FormData();
    // formData.append("data", JSON.stringify({data: purchasedItemsIds}))
    purchasedItemsIds.forEach(item => formData.append(item, item))
    formData.append("username", user.USERNAME)
    let url = `${apiUrl}/pages/Checkout/delete_purchased_item.php`
    // console.log(purchasedItemsIds)
    // if (purchasedItemsIds.length) {
    //   url = url.concat("?id[]=", purchasedItemsIds[0])
    //   purchasedItemsIds.forEach((item, index) => {
    //     if (index) url = url.concat(`&id[]=${item}`)
    //   })
    // }
    // console.log(url)
    await axios.post(url, formData, {withCredentials: true})
    window.location.href = "/"
  }

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("address-layout")}>
          <h1>ĐỊA CHỈ GIAO HÀNG</h1>
          <div className={cx("name-phonenumber")}>
            <div className={cx("name")}>
              <label htmlFor="fullName">Họ và tên người nhận</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={cx("phone")}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

          </div>

          <div className={cx("address-button")}>
            <div className={cx("address")}>
              <label htmlFor="address">Địa chỉ nhận hàng</label>
              <select
                name="address"
                id="address"
                onChange={(e) => {
                  setAddressChoice(parseInt(e.target.value));
                  setDeliveryMethod(0);
                }}
                value={addressChoice}
              >
                {userAddresses.map((address, index) => (
                  <option key={address.id} value={index}>
                    {`${address.addr}, ${address.ward}, ${address.district}, ${address.province}`}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx("button-add")}>
              <AddButton />
            </div>
          </div>
        </div>

        <div className={cx("delivery-layout")}>
          <h1>PHƯƠNG THỨC VẬN CHUYỂN</h1>
          {/* <div className={cx("delivery-container")}>
            {deliveryMethodTexts.map((option, index) => (
              <div key={index}>
                <input
                  disabled={!hasExpress && index === 2}
                  type="radio"
                  value={index}
                  name="delivery"
                  id={`delivery-${index}`}
                  checked={deliveryMethod === index}
                  onChange={(e) => {
                    setDeliveryMethod(parseInt(e.target.value));
                  }}
                />
                <label htmlFor={`delivery-${index}`}>{option}</label>
              </div>
            ))}
          </div> */}
          <div className={cx("delivery-container")}>
            {deliveryMethodTexts.map((option, index) => (
              <label key={index} className={cx("container-radio", {
                unsupported: !hasExpress && index === 2,
              })}>
                <label htmlFor={`delivery-${index}`} >{option}</label>
                <input
                  disabled={!hasExpress && index === 2}
                  type="radio"
                  value={index}
                  name="delivery"
                  id={`delivery-${index}`}
                  checked={deliveryMethod === index}
                  onChange={(e) => {
                    setDeliveryMethod(parseInt(e.target.value));
                  }}
                />
                <span className={cx("checkmark")}></span>
              </label>
            ))}
          </div>
        </div>

        <div className={cx("payment-layout")}>
          <h1>PHƯƠNG THỨC THANH TOÁN</h1>
          {/* <div className={cx("payment-container")}>
            {paymentMethods.map((method, index) => (
              <div key={index}>
                <input
                  type="radio"
                  value={index}
                  name="payment"
                  id={`payment-${index}`}
                  checked={paymentMethod === index}
                  onChange={(e) => {
                    setPaymentMethod(parseInt(e.target.value));
                  }}
                />
                <img src={method.logo} />
                <label htmlFor={`payment-${index}`}>{method.text}</label>
              </div>
            ))}
          </div> */}
          <div className={cx("payment-container")}>
            {paymentMethods.map((method, index) => (
              <label key={index} className={cx("container-radio")}>
                <img src={method.logo} />
                <label htmlFor={`payment-${index}`}>{method.text}</label>
                <input
                  type="radio"
                  value={index}
                  name="payment"
                  id={`payment-${index}`}
                  checked={paymentMethod === index}
                  onChange={(e) => {
                    setPaymentMethod(parseInt(e.target.value));
                  }}
                />
                <span className={cx("checkmark")}></span>
              </label>
            ))}
          </div>

        </div>

        <div className={cx("check-layout")}>
          <h1>KIỂM TRA LẠI ĐƠN HÀNG</h1>
          <table className={cx("table-check")}>
            <thead className={cx("head-check")}>
              <tr className={cx("title-check")}>
                <th className={cx("head-id-check")} style={{ textAlign: 'center' }}>#</th>
                <th className={cx("head-image-check")} style={{ textAlign: 'left' }}>Sách</th>
                <th className={cx("head-price-check")} style={{ textAlign: 'center' }}>Đơn giá</th>
                <th className={cx("head-count-check")} style={{ textAlign: 'center' }}>Số lượng</th>
                <th className={cx("head-total-check")} style={{ textAlign: 'center' }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody className={cx("body-check")}>
              {chosenCartItems.map((item, index) => (
                <tr className={cx("content-check")} key={item.id}>
                  <td className={cx("id-check")}>
                    {index + 1}
                  </td>
                  <td className={cx("image-check")}>
                    <img className={cx("image-detail-check")} src={item.image} alt="Book image" />
                    <div className={cx("text-image-check")}>{item.name}</div>
                  </td>
                  <td className={cx("price-check")}>
                    <div className={cx("price-final")}>{getPriceExpr(item.price, item.discount)}</div>
                    {item.discount!=0?(<div className={cx("price-initial")}>
                      {getPriceExpr(item.price)}
                    </div>):null}
                  </td>
                  <td className={cx("count-check")}>
                    <div>{item.count}</div>
                  </td>
                  <td className={cx("total-check")}>
                    <div>
                      {getPriceExpr(item.price * item.count, item.discount)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={cx("total")}>
            <div className={cx("total-text")}>Thành tiền:</div>
            <div className={cx("total-price")}>{getTotalPrice()}</div>
          </div>
        </div>

        <div className={cx("confirm-layout")}>
          <h1>XÁC NHẬN THANH TOÁN</h1>
          <div className={cx("container-confirm")}>
            <div className={cx("info-confirm")}>
              <div className={cx("name-confirm")}>
                <p className={cx("text-field")}>Họ và tên người nhận:</p>
                <p className={cx("text-confirm")}>{name}</p>
              </div>
              <div className={cx("phonenumber-confirm")}>
                <p className={cx("text-field")}>Số điện thoại:</p>
                <p className={cx("text-confirm")}>{phone}</p>
              </div>
              <div className={cx("address-confirm")}>
                <p className={cx("text-field")}>Địa chỉ nhận hàng:</p>
                <p className={cx("text-confirm")}>{`${userAddresses[addressChoice]?.addr}, ${userAddresses[addressChoice]?.ward}, ${userAddresses[addressChoice]?.district}, ${userAddresses[addressChoice]?.province}`}</p>
              </div>
              <div className={cx("delivery-confirm")}>
                <p className={cx("text-field")}>Phương thức vận chuyển:</p>
                <p className={cx("text-confirm")}>{deliveryMethods[deliveryMethod]}</p>
              </div>
              <div className={cx("payment-confirm")}>
                <p className={cx("text-field")}>Phương thức thanh toán:</p>
                <p className={cx("text-confirm")}>{paymentMethods[paymentMethod].text}</p>
              </div>
            </div>
            <div className={cx("price-confirm")}>
              <div className={cx("total-price-confirm")}>
                <p className={cx("text-field")}>Thành tiền:</p>
                <p className={cx("text-confirm")}>{getTotalPrice()}</p>
              </div>
              <div className={cx("discount-confirm")}>
                <p className={cx("text-field")}>Giảm giá:</p>
                <p className={cx("text-confirm")}>{getPriceExpr(0)}</p>
              </div>
              <div className={cx("price-delivery-confirm")}>
                <p className={cx("text-field")}>Vận chuyển:</p>
                <p className={cx("text-confirm")}>{getPriceExpr(15000)}</p>
              </div>
              <div className={cx("total-confirm")}>
                <p className={cx("text-confirm-total")}>Tổng cộng:</p>
                <p className={cx("text-confirm-final")}>{getTotalPrice(15000)}</p>
              </div>
            </div>
          </div>
          <div className={cx("button-confirm")}>
            <button className={cx("button-return")} onClick={() => navigate("/p/cart")}>Quay lại giỏ hàng</button>
            <button className={cx("button-order")} onClick={
              handlePurchase
            }>Xác nhận đặt hàng</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Checkout;
