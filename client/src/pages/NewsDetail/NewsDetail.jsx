import React, { useState, useEffect, useCallback, useContext } from 'react'

import myData from './data.json';
import images from './../../images/index';

import Detail from '../../components/Editor/Detail';

import './style.css'
import classNames from "classnames/bind"
import styles from "./NewsDetail.module.scss"
import axios from 'axios';
import GlobalContext from './../../context/GlobalContext';

const cx = classNames.bind(styles)

const NewsDetail = () => {
  const [Contentdb, setContentdb] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const {apiUrl} = useContext(GlobalContext)
  const newsId = window.location.search.split("=")[1]
  useEffect(() => {
    axios.get(`${apiUrl}/pages/NewsDetail/NewsDetail.php?id=${newsId}`)
      .then(response => {
        setContentdb(response.data[0]);
        setRelatedNews(response.data.slice(1))
        // console.log(response.data.slice(1))
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const news = {
    'title': Contentdb.title,
    'createAt': Contentdb.time,
    'views': 284,
    'content': Contentdb.content,
  }


  return (
    <div className='p-5' style={{ backgroundColor: 'white' }}>
      <h2 className='text-center fw-bold'>{news.title}</h2>
      <div className="text-secondary text-end">{news.createAt}</div>
      <div className="text-secondary text-end">Lượt xem: {news.views}</div>
      {(news && news.content)?(<Detail description={news.content}/>):null}
      {/* {news.content} */}
      <a className='fw-bold mt-2 h4 d-block' href='/news-user'>Tin tức liên quan</a>
      <div class="row row-cols-3 px-5 py-4">
        {relatedNews.map((related, index) => (
          <div class="col" index={index}>
            <a href={`/news-detail?id=${related.ID}`} className={cx("link-abbr")} title={related.title}>
              <div className="card related-card">
                <div style={{ paddingTop: "100%", position: "relative" }}>
                  <img src={related.thumnail} className="card-img-top" />
                </div>
                <div className="card-body">
                  <p className={`card-text mb-0 fw-bold text-start ${cx('max-line-2')}`}>{related.title}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsDetail