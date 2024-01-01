import React from 'react'
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import GlobalContext from "../../../context/GlobalContext";


// import parse from "html-react-parser";
import Tiptap from '../../../components/Editor/Editor';
import Select from 'react-select';

import classNames from "classnames/bind"
import styles from "./BookDetail.module.scss"
const cx = classNames.bind(styles)


const BookDetail = () => {
    const navigate = useNavigate();
  const {apiUrl} = useContext(GlobalContext)

  const [description, setDescription] = useState("sample essay");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("Tiếng Việt");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pYear, setPYear] = useState("");
  const [coverType, setCoverType] = useState("Bìa mềm");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(0);
  const [age, setAge] = useState("");
  const [cover, setCover] = useState("");
  const [bookCategory, setBookCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  var bookID = new URLSearchParams(useLocation().search).get('id')
  if(!bookID) bookID = 0;

  useEffect(() => {
    // fetch categories
    axios.post(`${apiUrl}/pages/Admin/BookDetail/get_categories.php`)
      .then(response => setCategories(response.data.map((cate) => ({value: cate, label: cate}))))

    // fetch book
    if(bookID != 0) {
      const formData = new FormData();
      formData.append('id', bookID);
      axios.post(`${apiUrl}/pages/Admin/BookDetail/get_book.php`, formData)
        .then(response => {
          const book = response.data;
  
          setName(book.name);
          setLanguage(book.language);
          setAuthor(book.author);
          setPublisher(book.publisher);
          setPYear(book.year);
          setCover(book.image);
          setCoverType(book.coverType);
          setPrice(book.price);
          setDiscount(book.discount);
          setStock(book.inStock);
          setAge(book.age);
          // document.getElementById('book-cover')
          document.getElementsByClassName('ProseMirror')[0].innerHTML = book.description
  
          setBookCategory(book.categories.map((cate) => ({value: cate, label: cate})))
        })
    }

    
    // setup delete model
    let addModal = document.querySelector('#addModal')
    addModal.addEventListener('show.bs.modal', (e) => {
      let modalBody = addModal.querySelector('.modal-body')
      modalBody.innerHTML = `Bạn có muốn lưu thay đổi ?`
    })
  }, [])

  const handleSetCover = (e) => {
    let file = e.target.files[0]
    const coverReader = new FileReader()
    coverReader.onloadend = function() {
      setCover(coverReader.result)
    }
    coverReader.readAsDataURL(file);
  }

  const submitForm = async (e) => {
    try {
      const formData = new FormData();
      var category=[];
      Array.isArray(bookCategory)?category = bookCategory.map(x=>x.label):[];

      formData.append('ID', bookID);
      formData.append('publisher', publisher);
      formData.append('namebook', name);
      formData.append('coverType', coverType);
      formData.append('author', author);
      formData.append('price', price);
      formData.append('discount', discount);
      formData.append('stock', stock);
      formData.append('age', age);
      formData.append('pic', cover);
      formData.append('publish_year', pYear);
      formData.append('language', language);
      formData.append('description', description);
      formData.append('category', category);

      const response = await axios.post(
        `${apiUrl}/pages/Admin/BookDetail/add_update_book.php`,
        formData
      );

      console.log(response.data);
      if(bookID == 0)
        navigate(`/admin/manage-book`);

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <>
      <div className="row">
        <h4 className="col-auto mb-3">Quản lý sách</h4>
        <div className="col-6">
            <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/manage-book`)}>Trở về</button>
        </div>
      </div>

      <form className={`rounded px-4 py-3 ${cx("book-form")}`} onSubmit={(e) => (e.preventDefault())}>
        <div className="row mb-3">

          <div className="col-8 mb-2">
            <label htmlFor="book-title" className="col-form-label">Tên sách</label>
            <input type="text" className="form-control" id="book-title" 
            value={name}
            onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="col-4 mb-2">
            <label htmlFor="book-language" className="form-label">Ngôn ngữ</label>
            <select className="form-select" id='book-language' value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="Tiếng Việt" selected>Tiếng Việt</option>
              <option value="Tiếng Anh">Tiếng Anh</option>
            </select>
          </div>

          <div className="col-5 mb-2">
            <label htmlFor="book-author" className="col-form-label">Tác giả</label>
            <input type="text" className="form-control" id="book-author" value={author} onChange={(event) => setAuthor(event.target.value)}/>
          </div>

          <div className="col-5 mb-2">
            <label htmlFor="book-publisher" className="col-form-label">Nhà xuất bản</label>
            <input type="text" className="form-control" id="book-publisher" value={publisher} onChange={(event) => setPublisher(event.target.value)}/>
          </div>

          <div className="col-2 mb-2">
            <label htmlFor="book-year" className="col-form-label">Năm</label>
            <input type="number" className="form-control" id="book-year" value={pYear} onChange={(event) => setPYear(event.target.value)}/>
          </div>

          <div className="col-3 mb-2">
            <label htmlFor="book-cover" className="col-form-label">Bìa sách</label>
            <input className="form-control" type="file" id="book-cover" onChange={handleSetCover}
            />
          </div>

          <div className="col-3 mb-2">
            <label htmlFor="book-cover-type" className="col-form-label">Kiểu bìa</label>
            <select className="form-select" id='book-cover-type' value={coverType} onChange={(event) => setCoverType(event.target.value)}>
              <option value="Bìa mềm" selected>Bìa mềm</option>
              <option value="Bìa cứng">Bìa cứng</option>
            </select>
          </div>
          
          <div className="col-3 mb-2">
            <label htmlFor="book-price" className="col-form-label">Giá (vnd)</label>
            <input type="number" className="form-control" id="book-price" value={price} onChange={(event) => setPrice(event.target.value)}/>
          </div>

          <div className="col-3 mb-2">
            <label htmlFor="book-discount" className="col-form-label">Giảm giả (%)</label>
            <input type="number" className="form-control" id="book-discount" value={discount} onChange={(event) => setDiscount(event.target.value)}/>
          </div>

          <div className="col-8 mb-2">
            <label htmlFor="book-category" className="col-form-label">Thể loại</label>
                <Select
                  id="book-category"
                  closeMenuOnSelect={false}
                  value={bookCategory}
                  isMulti
                  options={categories}
                  onChange={(options) => setBookCategory(options)}
                />
          </div>

          <div className="col-2 mb-2">
            <label htmlFor="book-stock" className="col-form-label">Kho</label>
            <input type="number" className="form-control" id="book-stock" value={stock} onChange={(event) => setStock(event.target.value)}/>
          </div>

          <div className="col-2 mb-2">
            <label htmlFor="age" className="col-form-label">Độ tuổi</label>
            <input type="text" className="form-control" id="age" value={age} onChange={(event) => setAge(event.target.value)}/>
          </div>

          <div className="col-12 mb-2">
            <label htmlFor="book-desc" className="form-label">Mô tả</label>
            <Tiptap id="book-desc" setDescription={setDescription} value={description}/>
          </div>

        </div>
        <button type='submit' className="btn btn-danger px-4"
                data-bs-toggle="modal" data-bs-target="#addModal">
            Lưu
        </button>

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
                            onClick={submitForm} data-bs-dismiss="modal">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </>
  )
}

export default BookDetail