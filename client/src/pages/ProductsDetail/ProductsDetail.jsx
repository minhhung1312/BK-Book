import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import images from '../../images/index';
import classNames from "classnames/bind"
import styles from "./ProductsDetail.module.scss"
import Detail from '../../components/Editor/Detail'
import ReactStars from "react-rating-stars-component";
import { getPriceExpr } from '../../utils/getPriceRepr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import GlobalContext from '../../context/GlobalContext'
import axios from 'axios';

const cx = classNames.bind(styles)

const ProductsDetail = () => {
  const { user, apiUrl } = useContext(GlobalContext)
  const navigate = useNavigate()
  const bookID = new URLSearchParams(useLocation().search).get('id');
  const [book, setBook] = useState({})
  const [relatedBook, setRelatedBook] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [comments, setComments] = useState([])
  const [ratingStat,setRatingStat] = useState({});
  const [formRating, setFormRating] = useState(1)

  useEffect(() => {
    // fetch book
    let fetch_book_url = `${apiUrl}/pages/ProductsDetail/get_book_by_id.php?id=${bookID}`
    if(user) fetch_book_url += `&username=${user.USERNAME}`
    axios.get(fetch_book_url)
      .then((response) => {
        let record = response.data
        setBook({
          'id': record.ID,
          'publisher': record.publisher,
          'name': record.name,
          'coverType': record.coverType,
          'author': record.author,
          'price': Number(record.price),
          'discount': Number(record.discount),
          'imageURL': record.image,
          'year': record.year,
          'language': record.language,
          'description': record.description,
          'rating': record.rating,
          'has_wishlist': record.has_wishlist
        })
      })

    // fetch related book
    axios.get(`${apiUrl}/pages/ProductsDetail/get_related_book.php?id=${bookID}`)
      .then((response) => {
        setRelatedBook(response.data.map((record) => { 
          return  {
            'id': record.ID,
            'name': record.name,
            'price': Number(record.price),
            'discount': Number(record.discount),
            'imageURL': record.image,
            'rating': record.rating
          }
        })  
      )})

    // fetch comment
    axios.get(`${apiUrl}/pages/ProductsDetail/get_book_comments.php?id=${bookID}`)
      .then((response) => {
        setComments(response.data.map((record) => { 
          return {
            'id': record.BOOK_ID,
            'owner': record.USERNAME,
            'title': record.title,
            'rating': Number(record.star),
            'content': record.desc,
            'time': record.time,
          }
        })
      )})

      // fetch rating stats
    axios.get(`${apiUrl}/pages/ProductsDetail/get_book_rating_stats.php?id=${bookID}`)
      .then((response) => setRatingStat(response.data))
  }, [user])

  
  useEffect(() => {
    // setup add model
    let addModal = document.querySelector('#addModal')
    addModal.addEventListener('show.bs.modal', (e) => {
        let modalBody = addModal.querySelector('.modal-body')
        if(quantity == 0)
          modalBody.innerHTML = `Số lượng sản phẩm phải lớn hơn 0`
        else
          modalBody.innerHTML = `Bạn có muốn thêm ${quantity} sản phẩm này`
    })
  }, [quantity])

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  }
  
  const handleSetQuantity = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setQuantity(value);
    }
    else {
      setQuantity(0);
    }
  };

  const handleToggleWishlist = (e) => {
    if(user) {
      axios.get(`${apiUrl}/pages/ProductsDetail/toogle_wishlist.php?id=${bookID}&username=${user.USERNAME}`)
        .then((response) => {
            console.log(response.data);
            setBook({
              ...book,
              'has_wishlist': !book['has_wishlist']
            })
        })
    }
  }

  const handleAddCart = (e) => {
    if(quantity > 0 && user) {
      axios.get(`${apiUrl}/pages/ProductsDetail/add_book2cart.php?id=${bookID}&username=${user.USERNAME}&quantity=${quantity}`)
        .then((response) => {
            console.log(response.data);
            setQuantity(0);
        })
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      let d = new Date()
      let currentTime = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate()
      let desc = document.getElementById('write_comment_content').value
      let title = document.getElementById('write_comment_label').value

      formData.append('username', JSON.stringify(user.USERNAME));
      formData.append('star', JSON.stringify(formRating));
      formData.append('title', JSON.stringify(title));
      formData.append('desc', JSON.stringify(desc));
      formData.append('book_id', JSON.stringify(bookID));
      formData.append('time', JSON.stringify(currentTime));

      // build link
      let entries = []
      for(const entry of formData){
        entries.push(entry.join('=')) // Array: ['entryName', 'entryValue']
      }
      let link = `${apiUrl}/pages/ProductsDetail/add_book_comment.php?${entries.join('&')}` 
      axios.get(link).then((response) => console.log(response.data['code']))
      
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
        <div className="px-3 py-4" style={{backgroundColor:"white", marginBottom:"30px"}}>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 mb-1">
                <img src={book.imageURL} alt="" className={cx("product_picture")}/>
              </div>
              <div className="col-12 col-sm-6 col-md-8">
                <div className="fw-bold mb-2 fs-3">{book.name}</div>
                <div className="mb-2">Nhà xuất bản: <span className={cx("bold")}>{book.publisher}</span></div> 
                <div className="mb-2">Tác giả: <span className={cx("bold")}>{book.author}</span></div>
                <div className="mb-2">Hình thức bìa: <span className={cx("bold")}>{book.coverType}</span></div> 
                <div className="fs-4 fw-semibold" style={{color:'#C00000'}}>{getPriceExpr(book.price * (1 - book.discount / 100))}
                {book.discount != 0?<>
                <span className="ms-2 badge" style={{backgroundColor:"#C00000", color:"white", fontSize:"1rem"}}>
                            -{book.discount}%
                </span>
                <div className="text-secondary fs-5 text-decoration-line-through">{getPriceExpr(book.price)}</div></>:''}
                </div>

                <div className={cx("flex", "product_detail_info_amount")} style={{alignItems:"center"}}>
                  <div className={cx()}>Số lượng: </div>
                  <div className={cx("quantity_button")}>
                    <button type='button' onClick={handleDecrement} className={cx('minus_plus_button')}>-</button>
                    <input type='text' className={cx("quantity_text", )} onChange={handleSetQuantity} value={quantity}/>
                    <button type='button' onClick={handleIncrement} className={cx('minus_plus_button')}>+</button>
                  </div>
                </div>
                  
                <div className="row  ps-3">
                  <div className={`col-auto ${cx("buy_cart_button", "add_cart_button")}`}  data-bs-toggle="modal" data-bs-target="#addModal"> 
                    <span className='me-1'> <FontAwesomeIcon icon={faCartShopping} /></span>
                    Thêm vào giỏ hàng
                  </div>
                  <div className={`col-auto ${cx("buy_cart_button", "add_wishlist_button")}`} onClick={handleToggleWishlist}>
                    <span className='me-1'> <FontAwesomeIcon icon={faHeart} color='#C00000'/></span>
                    {book.has_wishlist?"Xoá khỏi wishlist":"Thêm vào Wishlist"}
                  </div>
                </div>
              </div>
            </div>

            
        </div>

        <div className="px-3 py-4" style={{backgroundColor:"white", marginBottom:"30px"}}>
            <h5 className="fw-bold mb-3">Sản phẩm khác</h5>

            <div className={`row mb-2 row-cols-2 row-cols-sm-4`}> 
              {relatedBook.map((subBook) => (
                <a href={`?id=${subBook.id}`} style={{textDecoration:'None', color:'black'}} className={`col mb-2}`}  key={subBook.id} >
                  <div className='d-flex justify-content-center'>
                    <img src={subBook.imageURL} alt="" className={cx("ar_product_image")}/>
                  </div>
                  <div className={`fw-bold px-1 text-center ${cx("max-line-2")}`}>{subBook.name}</div>  
                  
                  <div className="fw-bold text-center" style={{color:"#C00000"}}>
                    {getPriceExpr(subBook.price * (1 - subBook.discount / 100))}
                    {subBook.discount!=0?<>
                      <span className="ms-2 badge" style={{backgroundColor:"#C00000", color:"white", fontSize:"0.75rem"}}>
                          -{subBook.discount}%
                      </span>
                    <div className="text-secondary text-decoration-line-through text-center">{getPriceExpr(subBook.price)}</div>
                      </>:''}
                  </div>
                  
                  <div className="d-flex justify-content-center">
                      <ReactStars key={relatedBook} count={5} value={subBook.rating} isHalf={false} activeColor={"#F7B32D"} size={24} edit={false}/>
                  </div>
                </a>
              ))}
            </div>

            <div className='d-flex justify-content-center'>
              <button className={cx("Xem_them_button")} onClick={() => navigate('../books-list')}>Xem Thêm</button>
            </div>
        </div>

        <div className="px-3 py-4" style={{backgroundColor:"white", marginBottom:"30px"}}>
          <h5 className="fw-bold mb-3">Thông tin sản phẩm</h5>
          <div className='px-2'>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="ps-0 text-secondary">Mã hàng</td>
                  <td>{book.id}</td>
                </tr>
                <tr>
                  <td className="ps-0 text-secondary">NXB</td>
                  <td>{book.publisher}</td>
                </tr>
                <tr>
                  <td className="ps-0 text-secondary">Tác giả</td>
                  <td>{book.author}</td>
                </tr>
                <tr>
                  <td className="ps-0 text-secondary">Năm sản xuất</td>
                  <td>{book.year}</td>
                </tr>
                <tr>
                  <td className="ps-0 text-secondary">Ngôn ngữ</td>
                  <td>{book.language}</td>
                </tr>
                <tr className='d-none d-sm-block'>
                  <td className="ps-0 text-secondary">Nội dung: </td>
                </tr>
              </tbody>
            </table>
            <div className="d-none d-sm-block">
                {(book && book.description)?(<Detail description={book.description}/>):null}
            </div>
          </div>
        </div>


        <div className="px-3 py-4" style={{backgroundColor:"white", marginBottom:"30px"}}>
          <h5 className="fw-bold mb-3">Đánh giá sản phẩm</h5>
          
          <div className='row'>
            <div className="col-12 col-sm-4"> 
              <div className='h-100 d-flex justify-content-center flex-column'>
                <div className="text-center lh-1">
                  <span style={{fontSize: "2.5rem"}}>{book.rating}/</span> 
                  <span style={{fontSize: "1.5rem", paddingTop: "1rem"}}>5</span>
                </div>
                <div className={cx("Start_rating")}>
                  <ReactStars key={book.rating} count={5} value={book.rating} isHalf={true} activeColor={"#F7B32D"} size={32} edit={false}/>
                </div>
              </div>
            </div>
          
            <div className="col-12 col-sm-8">
              <div className='pe-4'>
                {[1,2,3,4,5].map((item) => (
                  <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} key={item}>
                    <div>{item} sao</div>
                    <div style={{width: "80%", paddingLeft: "15px"}}>
                      <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar" aria-label="Basic example" style={{width: `${ratingStat[item]*100}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
            
          </div>


          {comments.map((acomment, index) => (
            <div className={cx("white_background")} key={index}>
              <div className={cx("white_background", "comment_grid")}>
                <div>
                  <div className="fs-5 fw-bold"> {acomment.title}</div>
                  <div>
                    <ReactStars count={5} value={Number(acomment.rating)} isHalf={true} activeColor={"#F7B32D"} size={24} edit={false}/>
                  </div>
                </div>
                <div className={cx("white_background", "comment_content")}> {acomment.content}</div>
                <div className={cx("white_background", "comment_time")}> 
                  by {acomment.owner} on {acomment.time}
                </div>
              </div>
            </div>
          ))}

          <div className={cx("Start_rating")}>
            <hr />
          </div>
          <h5 className="fw-bold mb-3">Viết bình luận</h5>
          <form onSubmit={submitForm} className='mx-auto w-100' style={{maxWidth:"600px"}}>
            <div className="row mb-1 w-100" style={{maxWidth:"600px"}}> 
              <div className="col-auto me-auto"> 
                <div className='h-100 d-flex align-items-center'>Bạn đánh giá sản phẩm như thế nào ?</div>
              </div>
              <div className="col-auto"> 
                <ReactStars count={5} value={1} isHalf={false} activeColor={"#F7B32D"} onChange={setFormRating} size={32} edit={true}/>
              </div>
            </div>
            <label htmlFor="write_comment_content" className={cx("label_wcc", "white_background")}>Hãy cho những người mua khác biết cảm nhận của bạn về sản phẩm</label>
            <textarea name="write_comment_content" id="write_comment_content" rows="5" className={cx("comment_box")}></textarea>
            <label htmlFor="write_comment_label" className={cx("label_wcc", "white_background")}>Thêm tiêu đề cho bài viết</label>
            <textarea name="write_comment_label" id="write_comment_label" rows="1" className={cx("comment_box")}></textarea>
            <div className={cx("submit_grid", "white_background")}>
              <input type="submit" name="submit" value="Bình luận" className={cx("submit_button")}/>
            </div>
          </form>

        </div>
        
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">Xác nhận</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary modal-submit border-0" 
                  style={{backgroundColor:'#C00000'}} query-usename='' 
                  onClick={handleAddCart} data-bs-dismiss="modal">Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsDetail