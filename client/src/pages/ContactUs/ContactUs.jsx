import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import classNames from "classnames/bind";
import styles from "./ContactUs.module.scss";
import GlobalContext from '../../context/GlobalContext';


const cx = classNames.bind(styles)

const ContactUs = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("1");
  const [content, setContent] = useState("");
  const {apiUrl} = useContext(GlobalContext);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('type', type);
    formData.append('content', content);
    
    try {
      const response = await axios.post(
        `${apiUrl}/pages/ContactUs/ContactUs.php`,
        formData,
        {withCredentials: true}
      );
      alert(response.data)
      window.location.reload()
    } 
    catch (error) {
        console.error(error);
    }

  }




  return (
    <div className={cx("container")}>
        <img src="https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/image1-92.png" alt="" className={cx("location")}/>
        <div className={cx("content")}>
          <div className={cx("bold", "title", "white_background", "mb-5")}>Liên hệ với chúng tôi</div>
          <div className={cx("white_background", "mb-5")}>
            Chúng tôi sẽ cố gắng trả lời tất cả các câu hỏi các bạn đang thắc mắc về chính sách, chương trình khuyến mãi, thẻ hội viên,...
          </div>
          <div className={cx("white_background", "flex", "mb-15")}>
            <div className={cx("half_box", "white_background")}>
                <div className={cx("bold", "white_background", "mb-5")}>Cơ sở 1</div>
                <p className={cx("white_background")}>Số 268 Lý Thường Kiệt, phường 14, quận 10, TP. Hồ Chí Minh</p>
            </div>
            <div className={cx("half_box", "white_background")}>
                <div className={cx("bold", "white_background", "mb-5")}>Cơ sở 2</div>
                <p className={cx("white_background")}>Khu đô thị Đại học Quốc Gia TP. HCM, TP Thủ Đức, TP. Hồ Chí Minh</p>
            </div>
          </div >
          <div className={cx("bold", "send_request", "white_background", "mb-5")}>Gửi yêu cầu</div>

          <form action="" className={cx("white_background")} onSubmit={submitForm}>
              <div className={cx("flex", "mb-5", "white_background")}>
                  <div className={cx("white_background")} style={{width: '50%'}}>
                      <label htmlFor="name" className={cx("block", "white_background")}>Tên</label>
                      <input type="text" name="name" id="name" className={cx("input", "white_background")} value={name} onChange={(event) => setName(event.target.value)}/>
                  </div>
                  <div className={cx("white_background")} style={{width: '50%'}}>
                      <label htmlFor="email" className={cx("block", "white_background")}>Email</label>
                      <input type="text" name="email" id="email" className={cx("input", "white_background")} value={email} onChange={(event) => setEmail(event.target.value)}/>
                  </div>
              </div>
              <label htmlFor="TypeSupport" className={cx("block", "white_background")}>Loại yêu cầu</label>
              {/* lệnh boosttrap thực hiện ở đây */}
              <div className={cx("white_background", "mb-5")} style={{width: '50%'}}>
                <select className="form-select" aria-label="Default select example" name="TypeSupport" id="TypeSupport" style={{borderStyle: "solid", borderColor: '#C00000'}} value={type} onChange={(event) => setType(event.target.value)}>
                  <option value="1">Về chính sách</option>
                  <option value="2">Về cách thức thanh toán</option>
                  <option value="3">Khác</option>
                </select>
              </div>
              {/* lệnh boosttrap kết thúc ở đây */}

              <label htmlFor="write_content" className={cx("block", "white_background")}>Vui lòng điền chi tiết</label>
              <textarea name="write_content" id="write_content" cols="30" rows="6" className={cx("comment_box", "mb-5")} value={content} onChange={(event) => setContent(event.target.value)}></textarea>
              <input type="submit" name="submit" value="Gửi yêu cầu" className={cx("submit_button")} />
          </form>
        </div>
    </div>
  )
}

export default ContactUs