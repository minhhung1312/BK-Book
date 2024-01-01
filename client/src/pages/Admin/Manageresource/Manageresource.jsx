import React, { useContext, useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import images from '../../../images/index'
import GlobalContext from '../../../context/GlobalContext';

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import classNames from "classnames/bind";
import styles from './ManageResource.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

const ManageResource = () => {
  const {apiUrl} = useContext(GlobalContext)
  const [logo, setLogo] = useState('')
  const [sliders, setSliders] = useState()

  useEffect(() => {
    // fetch logo
    axios.get(`${apiUrl}/utils/get_logo.php`)
      .then((response) => {setLogo(response.data['link'])})
      
      // fetch sliders
    axios.get(`${apiUrl}/utils/get_sliders.php`)
      .then((response) => {
        setSliders(response.data.map((item) => item['link']))
      })
    // setup add model
    let addModal = document.querySelector('#addModal')
    addModal.addEventListener('show.bs.modal', (e) => {
        let modalBody = addModal.querySelector('.modal-body')
        modalBody.innerHTML = `Bạn muốn cập nhật tài nguyên trang web`
    })
  }, []);

  const handleSetSlider = (e) => {
    let files = e.target.files;
    const slideReader = new FileReader()
    
    let encodedFiles = []

    function readFile(index) {
      if( index >= files.length ) {
        setSliders(encodedFiles);
        return
      }
      var file = files[index];
      slideReader.onloadend = function() {
        encodedFiles.push(slideReader.result)
        readFile(index+1)
      }
      slideReader.readAsDataURL(file);
    }

    readFile(0);
  }

  const handleSetLogo = (e) => {
    let file = e.target.files[0]
    const logoReader = new FileReader()
    logoReader.onloadend = function() {
      setLogo(logoReader.result)
    }
    logoReader.readAsDataURL(file);
  }

  const handleSubmitResouce = (e) => {
    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('sliders', JSON.stringify(sliders));

    axios.post(`${apiUrl}/pages/Admin/Manageresource/update_resource.php`,formData)
      .then((response) => {
        console.log(response.data);
      })
  }

  return (
    <>
      <h4 className="mb-3">Quản lý tài nguyên</h4>
      <div className={`row g-5`} style={{backgroundColor:'transparent'}}>
        <div className="col">
          <div className='rounded-3 p-4' style={{backgroundColor:'white'}}>
            
            <div className="row mb-3">
              <div className="col-auto">
                <div className="fw-bold fs-5">Logo</div>
              </div>
              <div className="col">
                <input type="file" id="logo-input" onChange={handleSetLogo} style={{display:"none"}}/>
                <label htmlFor="logo-input" className={cx("file-label")} >Chọn một tệp ...</label>
              </div>
            </div>

            <div className='w-100 h-100'>
              <img className='shadow mw-100 h-100 object-fit-contain'
                src={logo} />
            </div>
          </div>
        </div>

        <div className="col">
          <div className='rounded-3 p-4' style={{backgroundColor:'white'}}>
            <div className="row mb-3">
              <div className="col-auto">
                <div className="fw-bold fs-5">Slider</div>
              </div>
              <div className="col">
                <input type="file" onChange={handleSetSlider} id="slider-input" style={{display:"none"}} multiple/>
                <label htmlFor="slider-input" className={cx("file-label")} >Chọn một tệp ...</label>
              </div>
            </div>
            <div className='shadow'>
              <div id={cx("carosel")} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" key={sliders}>
                  {sliders && sliders.map((slider, index) => {return (
                    <div className="carousel-item active" key={index}>
                      <img src={slider} className="d-block w-100 object-fit-contain" alt="..."/>
                    </div>
                  )})}
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
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end mt-4'>
        <button className="btn btn-danger px-5" data-bs-toggle="modal" data-bs-target="#addModal">Lưu</button>
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
                  onClick={handleSubmitResouce} data-bs-dismiss="modal">Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageResource