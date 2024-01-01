import classNames from "classnames/bind";
import Logo from "../Logo/Logo";
import images from "../../images";

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {

  const footerSections = [
    {
      text: "Liên hệ",
      logos: images.contactLogos
    },
    {
      text: "Đơn vị vận chuyển",
      logos: images.deliveryLogos
    },
    {
      text: "Thanh toán",
      logos: images.paymentLogos
    }
  ]

  return (
    // <div className={cx("container")}>
    //   <div className={cx("left")}>
    //     <div className={cx("logo-container")}>
    //       <div className={cx("logo-wrapper")}>
    //         <Logo />
    //       </div>
    //     </div>
    //     <div className={cx("text-container")}>
    //       <p>Phòng 608, Lầu 6, Tòa nhà H6, Đại học Bách Khoa TPHCM, Khu phố Tân Lập, Phường Đông Hòa, Thành phố Dĩ An, Tỉnh Bình Dương</p>
    //       <p><strong>BKBOOK</strong> nhận đặt hàng trực tuyến và giao hàng tận nơi. <strong>KHÔNG</strong> hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng.</p>
    //     </div>
    //     <div className={cx("other-logo-container")}>
    //       <img src={images.footerLeftLogo} className={cx("other-logo")} />
    //     </div>
    //   </div>
    //   <div className={cx("right")}>
    //     {footerSections.map((section, index) => (
    //       <div className={cx("footer-section")} key={section.text + index}>
    //         <p className={cx("footer-section-text")}>{section.text.toUpperCase()}</p>
    //         <div className={cx("footer-section-logos")}>
    //           {section.logos.map((logo, index) => (
    //             <div className={cx("footer-section-logo-container")} key={index}>
    //               <img src={logo} className={cx("footer-section-logo")} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="row flex-row-reverse">
      <div className="col-md-8 order-md-0">
        <div className="p-3">  
          {footerSections.map((section, index) => (
            <div key={section.text + index}>
              <div className="fw-bold">{section.text.toUpperCase()}</div>

              <div className="d-flex flex-wrap my-3">
                {section.logos.map((logo, index) => (
                  <div className="mx-2" key={index}>
                    <img src={logo} className={cx("footer-section-logo")} key={index}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-4 order-md-1">
        <div className="p-3">
            <Logo />
          <div className={cx("text-container")}>
            <p>Phòng 608, Lầu 6, Tòa nhà H6, Đại học Bách Khoa TPHCM, Khu phố Tân Lập, Phường Đông Hòa, Thành phố Dĩ An, Tỉnh Bình Dương</p>
            <p><strong>BKBOOK</strong> nhận đặt hàng trực tuyến và giao hàng tận nơi. <strong>KHÔNG</strong> hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng.</p>
          </div>
          <img src={images.footerLeftLogo} className={cx("other-logo")} />
        </div>
      </div>
  </div>
  )
}

export default Footer