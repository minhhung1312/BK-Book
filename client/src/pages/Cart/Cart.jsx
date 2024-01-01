import React, { useState, useEffect, useContext } from 'react'
import classNames from "classnames/bind";
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getPriceExpr } from "../../utils/getPriceRepr"
import axios from 'axios';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Cart = () => {

  const {user, apiUrl, chosenCartItems} = useContext(GlobalContext)
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(user) {
      axios.get(`${apiUrl}/pages/Cart/Cart.php?username=${user.USERNAME}`)
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [user]);

  const countbook = products.length;

  const handleCountIncrease = (index) => {
    const newBook = [...products];
    const bookToUpdate = newBook[index];
    bookToUpdate.count = parseInt(bookToUpdate.count) + 1;
    setProducts(newBook);
  };

  const handleCountDecrease = (index) => {
    const newBook = [...products];
    if (newBook[index].count > 1) {
      newBook[index].count -= 1;
      setProducts(newBook);
    }
  };

  const handleCountChange = (event, index) => {
    const newBook = [...products];
    const count = Number(event.target.value);
    if (count > 0) {
      newBook[index].count = count;
      setProducts(newBook);
    }
  };

  const deleteItem = (id) => {
    axios.delete(`${apiUrl}/pages/Cart/Cart.php?id=${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleRemoveItem = (index) => {
    const id = products[index].id;
    deleteItem(id);
    const newBook = [...products];
    newBook.splice(index, 1);
    setProducts(newBook);
  };




  const [selectedItems, setSelectedItems] = useState([]);
  const [isHeadChecked, setIsHeadChecked] = useState(false);

  const handleHeadCheckboxChange = () => {
    const newSelectedItems = !isHeadChecked ? products.map(item => item.id) : [];
    setSelectedItems(newSelectedItems);
    setIsHeadChecked(!isHeadChecked || newSelectedItems.length === products.length);
  };

  const handleCheckboxChange = (index) => {
    const selectedItem = products[index].id;
    const selectedIndex = selectedItems.indexOf(selectedItem);
    let newSelectedItems = [...selectedItems];

    if (isHeadChecked) {
      if (selectedIndex === -1) {
        newSelectedItems.push(selectedItem);
      } else {
        newSelectedItems.splice(selectedIndex, 1);
      }
    } else {
      if (selectedIndex > -1) {
        newSelectedItems.splice(selectedIndex, 1);
      } else {
        newSelectedItems.push(selectedItem);
      }
    }

    setSelectedItems(newSelectedItems);

    if (isHeadChecked && selectedIndex > -1 && newSelectedItems.indexOf(selectedItem) === -1) {
      setIsHeadChecked(false);
    } else if (newSelectedItems.length === products.length) {
      setIsHeadChecked(true);
    }
  };


  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const selectedBook = products.filter(item => selectedItems.includes(item.id));
    const newTotalPrice = selectedBook.reduce((prev, curr) => {
      return prev + curr.price * (1 - curr.discount / 100) * curr.count;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems, products]);

  return (
    <div className={cx("container")}>
      <div className={cx("info")}>
        <div className={cx("head")}>
          <div className={cx("checkbox-head")}>
            <input className={cx("checkbox")} type="checkbox" checked={isHeadChecked}
              onChange={() => handleHeadCheckboxChange()} />
          </div>
          <div className={cx("count-book-head")}>
            Tất cả ({countbook} sản phẩm)
          </div>
          <div className={cx("price-head")}>
            Đơn giá
          </div>
          <div className={cx("count-head")}>
            Số lượng
          </div>
        </div>

        {products.length ? products.map((item, index) => (
          <div key={item.id}>
            <div className={cx("book-info")}>
              <div className={cx("checkbox-info")}>
                <input className={cx("checkbox")} type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(index)} />
              </div>
              <div className={cx("book-detail")}>
                <div className={cx("book-image")}>
                  <img src={item.image} width="65px" height="92px" />
                </div>
                <div className={cx("book-name")}>
                  <p>{item.name}</p>
                </div>
              </div>
              <div className={cx("price")}>
                <div className={cx("last-price")}>
                  <p>{getPriceExpr(item.price, item.discount)}</p>
                </div>
                {item.discount!=0?(<div className={cx("initial-price")}>
                  {getPriceExpr(item.price)}
                </div>):null}
              </div>
              <div className={cx("count")}>
                <button onClick={() => handleCountDecrease(index)}>-</button>
                <input
                  className={cx('quantity-input')}
                  value={item.count}
                  onChange={(event) => handleCountChange(event, index)}
                />
                <button onClick={() => handleCountIncrease(index)}>+</button>
              </div>
              <button className={cx("button-delete")}>
                <FontAwesomeIcon icon={faTrashCan} className={cx("icon-trashcan")} onClick={() => handleRemoveItem(index)} />
              </button>
            </div>
          </div>
        )) : <h1 className={cx("text-no-result")}>Hiện không có sản phẩm trong giỏ hàng!</h1>}

      </div>
      <div className={cx("address-price")}>
        <div className={cx("price-info")}>
          <div className={cx("price-detail")}>
            <div className={cx("initial-total")}>
              <p className={cx("color-grey")}>Tạm tính</p>
              <p>{getPriceExpr(totalPrice)}</p>
            </div>
            <div className={cx("discount")}>
              <p className={cx("color-grey")}>Giảm giá</p>
              <p>{getPriceExpr(0)}</p>
            </div>
          </div>
          <div className={cx("line")}>
          </div>
          <div className={cx("total-price")}>
            <p className={cx("color-grey")}>Tổng tiền</p>
            <p className={cx("final-price")}>{getPriceExpr(totalPrice)}</p>
          </div>
        </div>
        <button className={cx("button-buy")} onClick={() => {
          if (selectedItems.length) {
            navigate("/p/checkout")
            localStorage.setItem("checkoutItems", JSON.stringify({data: products.filter(book => selectedItems.includes(book.id))}))
          }
        }}>
          Mua hàng ({selectedItems.length})
        </button>
      </div>
    </div>
  )
}

export default Cart