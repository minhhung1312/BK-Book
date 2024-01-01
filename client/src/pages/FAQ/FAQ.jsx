import React from 'react'
import classNames from "classnames/bind"
import styles from "./FAQ.module.scss"

const cx = classNames.bind(styles)

const FAQ = () => {

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("bold", "title", "white_bg", "mb-10")}>Các câu hỏi thường gặp</div>
        <div className={cx("name_section", "white_bg", "mb-1")}>Về mua hàng</div>

        <div className={cx("white_bg", "mb-5")}>
        {/* lệnh boosttrap thực hiện ở đây */}
            <div class="accordion" id="myAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">1. What is HTML?</button>									
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                        <div class="card-body p-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae ex esse deleniti neque debitis vitae doloremque sint. Possimus ratione repellendus fugiat labore placeat nam qui veniam ea explicabo, nulla fugit.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">2. What is Bootstrap?</button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#myAccordion">
                        <div class="card-body p-2">
                            <p>Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and easier web development. It is a collection of CSS and HTML conventions. <a href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/" target="_blank">Learn more.</a></p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">3. What is CSS?</button>                     
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                        <div class="card-body p-2">
                            <p>CSS stands for Cascading Style Sheet. CSS allows you to specify various style properties for a given HTML element such as colors, backgrounds, fonts etc. <a href="https://www.tutorialrepublic.com/css-tutorial/" target="_blank">Learn more.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        {/* lệnh boosttrap kết thúc ở đây */}
        </div>



        <div className={cx("name_section", "white_bg", "mb-1")}>Về Cách thanh toán</div>

        <div className={cx("white_bg", "mb-5")}>
        {/* lệnh boosttrap thực hiện ở đây */}
            <div class="accordion" id="myAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse3">1. What is HTML?</button>									
                    </h2>
                    <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                        <div class="card-body p-2">
                            <p>HTML stands for HyperText Markup Language. HTML is the standard markup language for describing the structure of web pages. <a href="https://www.tutorialrepublic.com/html-tutorial/" target="_blank">Learn more.</a></p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse4">2. What is Bootstrap?</button>
                    </h2>
                    <div id="collapse4" class="accordion-collapse collapse show" data-bs-parent="#myAccordion">
                        <div class="card-body p-2">
                            <p>Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and easier web development. It is a collection of CSS and HTML conventions. <a href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/" target="_blank">Learn more.</a></p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse5">3. What is CSS?</button>                     
                    </h2>
                    <div id="collapse5" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                        <div class="card-body p-2">
                            <p>CSS stands for Cascading Style Sheet. CSS allows you to specify various style properties for a given HTML element such as colors, backgrounds, fonts etc. <a href="https://www.tutorialrepublic.com/css-tutorial/" target="_blank">Learn more.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        {/* lệnh boosttrap kết thúc ở đây */}
        </div>


      </div>
    </div>
  )
}

export default FAQ