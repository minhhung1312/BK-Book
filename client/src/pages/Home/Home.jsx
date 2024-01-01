import React, { useState, useEffect, useContext } from 'react'

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableCellsLarge, faPlus } from '@fortawesome/free-solid-svg-icons'

// for rating star
import ReactStars from "react-rating-stars-component";

import images from './../../images/index';
import { getPriceExpr } from '../../utils/getPriceRepr';

import './style.css'
import classNames from "classnames/bind"
import styles from "./Home.module.scss"
import axios from 'axios';
import GlobalContext from './../../context/GlobalContext';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

const Home = () => {

  const {apiUrl} = useContext(GlobalContext)

  const bookCategories = [
    {
      category: 'Tâm Lý - Kỹ Năng Sống',
      image: images.selfhelpCategory,
    },
    {
      category: 'Văn Học',
      image: images.novelCategory,
    },
    {
      category: 'Thiếu Nhi',
      image: images.comicCategory,
    },
    {
      category: 'Giáo Khoa - Tham Khảo',
      image: images.textbookCategory,
    },
    {
      category: 'Sách Học Ngoại Ngữ',
      image: images.foreignCategory,
    },
    {
      category: 'Kinh Tế',
      image: images.economicsCategory,
    }
  ]

  const [TopTredingsBook, setTopTredingsBook] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/pages/Home/Home.php`)
      .then(response => {
        setTopTredingsBook(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getBookDetailLink = (id) => `../ProductsDetail?id=${id}`;

  return (
    <>
      {/* Carosel */}
      <div id={cx("carosel")} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={images.carousel1} className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src={images.carousel2} className="d-block w-100" alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={"#"+cx("carosel")} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={"#"+cx("carosel")} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Book category */}
      <div id={cx("book-category")} className="py-3 px-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0 fw-bold">
            <FontAwesomeIcon icon={faTableCellsLarge} color="#C00000" size="xl" className="me-2"/> 
            Danh mục sản phẩm
          </h5>
        </div>
        <hr className="mb-3 mt-0 text-secondary"/>
        <div className="row g-0 g-sm-3">
          {bookCategories.map((category, index) => (
            <Link className="col-4 col-lg-2" key={index} to={`/books-list?category=${category.category}`}>
              <div className="card category-card">
                <div style={{paddingTop:"100%",position:"relative"}}>
                    <img src={category.image} className="card-img-top"/>
                </div>
                <div className="card-body text-center">
                    <p className="card-text mb-0">{category.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>  
      
      {/* Top trending */}
      <h3 className="fw-bold" style={{marginTop:"30px"}}>Sách nổi bật theo thể loại</h3>

      {TopTredingsBook && TopTredingsBook.map((trend, index) => (
        <div className={`py-3 px-4 ${cx("top-treding")}`} key={index}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 fw-bold">{trend.category}</h5>
            <div className="btn d-none d-sm-block" style={{backgroundColor:"#C00000", color:"white"}}>
              <FontAwesomeIcon icon={faPlus} color="white" size="lg" className="me-2"/>
              Xem thêm
            </div>
          </div>
          <hr className="mb-3 mt-0 text-secondary"/>
          <div className="row">
            <div className="col-12 col-sm-8 col-md-5">
              <div className="card h-100 border-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <a className={cx("link-abbr")} href={getBookDetailLink(trend.top1.id)} title={trend.top1.name}>
                      <img src={trend.top1.image} className="img-fluid rounded-start"/>
                    </a>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <a className={cx("link-abbr")} href={getBookDetailLink(trend.top1.id)} title={trend.top1.name}>
                        <h5 className={`card-title fw-bold ${cx("max-line-2")}`}>{trend.top1.name}</h5>
                        <div>   
                            <p className={`mb-2 ${cx("trending-desc", "max-line-3")}`}>{trend.top1.description}</p>
                        </div>
                      </a>
                      <div>
                        <span className="fs-3 fw-bold" style={{color:"#C00000"}}>
                          {getPriceExpr(trend.top1.price * (1 - trend.top1.discount / 100))}
                        </span>
                        <span className="ms-2 badge  d-none d-md-inline" style={{backgroundColor:"#C00000", color:"white"}}>
                            -{trend.top1.discount}%
                        </span>
                      </div>
                      <div className="text-secondary fs-5 text-decoration-line-through">{getPriceExpr(trend.top1.price)}</div>
                      <ReactStars count={5} value={trend.top1.rating} isHalf={true} activeColor={"#F7B32D"} size={30} edit={false}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-7">
              <div className="row row-cols-2 g-0 d-none d-lg-flex">
                {trend.topk.map((book, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 border-0" key={index}>
                            <div className="row g-0 h-100">
                            <div className="col-md-4">  
                                <a className={cx("link-abbr")} href={getBookDetailLink(book.id)} title={book.name}>
                                <img src={book.image} className="img-fluid rounded-start"/>
                                </a>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                <h6 className={`card-title fw-bold ${cx("max-line-2")}`}>
                                    <a className={cx("link-abbr")} href={getBookDetailLink(book.id)} title={book.name}>{book.name}</a>
                                </h6>
                                <div>
                                    <span className="fw-bold" style={{color:"#C00000"}}>
                                    {getPriceExpr(book.price * (1 - book.discount / 100))}
                                    </span>
                                    <span className="ms-2 badge  d-none d-md-inline" style={{backgroundColor:"#C00000", color:"white"}}>
                                        -{book.discount}%
                                    </span>
                                </div>
                                <div className="text-secondary text-decoration-line-through">{getPriceExpr(book.price)}</div>
                                <ReactStars count={5} value={book.rating} isHalf={true} activeColor={"#F7B32D"} size={20} edit={false}/>   
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>

              <div className="row row-cols-2 row-cols-sm-1 gy-3 d-flex d-lg-none">
                {trend.topk.slice(0,2).map((book, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 border-0" key={index}>
                            <div className="row g-0 h-100">
                            <div className="col-md-4">  
                                <a className={cx("link-abbr")} href={getBookDetailLink(book.id)} title={book.name}>
                                <img src={book.image} className="img-fluid rounded-start"/>
                                </a>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                <h6 className={`card-title fw-bold ${cx("max-line-2")}`}>
                                    <a className={cx("link-abbr")} href={getBookDetailLink(book.id)} title={book.name}>{book.name}</a>
                                </h6>
                                <div>
                                    <span className="fw-bold" style={{color:"#C00000"}}>
                                    {getPriceExpr(book.price * (1 - book.discount / 100))}
                                    </span>
                                    <span className="ms-1 badge  d-none d-md-inline" style={{backgroundColor:"#C00000", color:"white"}}>
                                        -{book.discount}%
                                    </span>
                                </div>
                                <div className="text-secondary text-decoration-line-through">{getPriceExpr(book.price)}</div>
                                <ReactStars count={5} value={book.rating} isHalf={true} activeColor={"#F7B32D"} size={20} edit={false}/>   
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Home