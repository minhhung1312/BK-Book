
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
import styles from "./News.module.scss"
const cx = classNames.bind(styles)


const News = () => {
  const navigate = useNavigate()
  const {apiUrl} = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState("");
  const [bookTag, setBookTag] = useState([]);
  const [allTags, setAllTags] = useState([]);

  var newsID = new URLSearchParams(useLocation().search).get('id')
  if(!newsID) newsID = 0;

  //Now we pull the data from db with our declared id to the website
  useEffect(() => {
    // fetch tags 
    axios.post(`${apiUrl}/pages/Admin/News/get_tags.php`)
      .then(response => setAllTags(response.data.map((cate) => ({value: cate, label: cate}))))
    
    // fetch news
    if(newsID != 0) {
      const formData = new FormData();
      formData.append('id', newsID)
      axios.post(`${apiUrl}/pages/Admin/News/get_news.php`, formData)
        .then(response => {
          const news = response.data
          console.log(news);
          setBookTag(news.tags.map(tag => ({value: tag, label: tag})))
          setThumbnail(news.thumbnail)
          setTitle(news.title)
          let detail = document.getElementsByClassName('ProseMirror')[0];
          detail.innerHTML = '<p>' + news.content + '</p>';
        })
    }

    // setup delete model
    let addModal = document.querySelector('#addModal')
    addModal.addEventListener('show.bs.modal', (e) => {
        let modalBody = addModal.querySelector('.modal-body')
        modalBody.innerHTML = `Bạn có muốn lưu thay đổi?`
    })
  }, [])

  const submitForm = async () => {
    try {
      var tags=[];
      Array.isArray(bookTag)?tags = bookTag.map(x=>x.label):[];
  
      const formData = new FormData();
      formData.append('ID', newsID);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('tag', tags);
  
      const response = await axios.post(
        `${apiUrl}/pages/Admin/News/add_update_news.php`,
        formData);
  
      console.log(response.data);
      if(bookID == 0) navigate('/admin/manage-news')
    } 
    catch (error) {
        console.error(error);
    }
  }

  const handleSetThumbnail = (e) => {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = function() {
      console.log(reader.result)
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className="row">
        <h4 className="col-auto mb-3">Quản lí tin tức</h4>
        <div className="col-6">
            <a type="button" className="btn btn-sm btn-primary" onClick={() => navigate('/admin/manage-news')}>Trở về</a>
        </div>
      </div>

      <form className={`rounded px-4 py-3 ${cx("news-form")}`} onSubmit={(e) => e.preventDefault()}>
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <label htmlFor="news-title" className="col-form-label">Tiêu đề</label>
            <input type="text" className="form-control" id="news-title" value={title} onChange={(event) => setTitle(event.target.value)}/>
          </div>

          <div className="col-3 mb-2">
            <label htmlFor="thumbnail" className="col-form-label">Thumbnail</label>
            <input className="form-control" type="file" id="thumbnail" onChange={handleSetThumbnail}/>
          </div>

          <div className="col-9 mb-2">
            <label htmlFor="news-tag" className="col-form-label">Thể loại</label>
                <Select
                  id="news-tag"
                  closeMenuOnSelect={false}
                  value={bookTag}
                  isMulti
                  options={allTags}
                  onChange={options => setBookTag(options)}
                />
          </div>
          
          <div className="col-12 mb-2">
            <label htmlFor="news-content" className="form-label">Nội dung</label>
            <Tiptap id="news-content" setDescription={setDescription}/>
          </div>
        </div>
        <button type='submit' data-bs-toggle="modal" data-bs-target="#addModal"
                className="btn btn-danger px-4">
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
                        <button type="button" className="btn btn-danger modal-submit border-0" 
                            query-usename='' 
                            onClick={submitForm} data-bs-dismiss="modal">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </>
  )
}

export default News