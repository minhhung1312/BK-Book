import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faMagnifyingGlass,
  faNewspaper,
  faRightToBracket,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import UserPanel from "../UserPanel/UserPanel";

const cx = classNames.bind(styles);

const Navbar = () => {
  const {
    user,
    showHoverPanel,
    setShowHoverPanel,
    showUserPanel,
    setShowUserPanel,
    queryParams,
    setQueryParams,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [searchBooks, setSearchBooks] = useState("");

  const navIcons = [
    {
      text: "Tin tức",
      icon: faNewspaper,
      link: "/news-user",
    },
    {
      text: "Giỏ hàng",
      icon: faCartShopping,
      link: user ? "/p/cart" : "/auth",
    },
    {
      text: user ? user.fname : "Đăng nhập",
      icon: user ? faUserAlt : faRightToBracket,
      link: user ? "/member" : "/auth",
    },
  ];

  return (
    // <nav className="navbar navbar-expand-lg">
    //   <div className="container-fluid">
    //     <div className="navbar-brand">
    //       <Logo />
    //     </div>
    //     <button
    //       class="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarSupportedContent">
    // <div
    //   className={cx("hover-icon-container")}
    //   onMouseEnter={() => {
    //     setShowHoverPanel(true);
    //   }}
    //   onMouseLeave={() => {
    //     setShowHoverPanel(false);
    //   }}
    // >
    //   <FontAwesomeIcon
    //     icon={faBars}
    //     size="3x"
    //     color="#c00000"
    //     onClick={() => {
    //       window.location.href = "/books-list";
    //     }}
    //   />
    //   <FontAwesomeIcon icon={faChevronDown} size="xl" color="#c00000" />
    // </div>
    //       <div>
    //         <input
    //           type="text"
    //           className=""
    //           placeholder="Tìm kiếm"
    //           value={searchBooks}
    //           required
    //           onChange={(e) => setSearchBooks(e.target.value)}
    //         />
    //         <button
    //           className=""
    //           onClick={() => {
    //             if (searchBooks) {
    //               setQueryParams({ ...queryParams, search: searchBooks });
    //               navigate(`/books-list?search=${searchBooks}`);
    //               setSearchBooks("");
    //             }
    //           }}
    //         >
    //           <FontAwesomeIcon
    //             icon={faMagnifyingGlass}
    //             size="lg"
    //             color="white"
    //           />
    //         </button>
    //       </div>
    //       <div className="navbar-nav">
    //         {navIcons.map((icon, index) => (
    //           <Link
    //             to={icon.link}
    //             className="nav-item"
    //             key={`${icon.text}-${index}`}
    //             onMouseEnter={() => {
    //               if (index === 2) setShowUserPanel(true && user);
    //             }}
    //             onMouseLeave={() => {
    //               if (index === 2) setShowUserPanel(false && user);
    //             }}
    //           >
    //             <FontAwesomeIcon icon={icon.icon} color="#c00000" size="2x" />
    //             <p className="">{icon.text}</p>
    //           </Link>
    //         ))}
    //         <div
    //           className={cx(
    //             "user-panel-container",
    //             showUserPanel ? "user-panel-container-show" : ""
    //           )}
    //           onMouseEnter={() => {
    //             setShowUserPanel(true && user);
    //           }}
    //           onMouseLeave={() => {
    //             setShowUserPanel(false && user);
    //           }}
    //         >
    //           <UserPanel />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav class="navbar navbar-expand-lg mb-3 p-0" style={{backgroundColor:"white"}}>
      <div class="container" style={{maxWidth:"960px"}}>
        <a class="navbar-brand" href="#">
          <Logo />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item d-none d-lg-block">
              <div
                className={`${cx("hover-icon-container")}`}
                onMouseEnter={() => {
                  setShowHoverPanel(true);
                }}
                onMouseLeave={() => {
                  setShowHoverPanel(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  size="xl"
                  color="#c00000"
                  onClick={() => {
                    window.location.href = "/books-list";
                  }}
                />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="xl"
                  color="#c00000"
                />
              </div>
            </li>
            {navIcons.map((icon, index) => (
              <li class="nav-item d-block d-lg-none">
                <Link
                  to={icon.link}
                  key={`${icon.text}-${index}`}
                  onMouseEnter={() => {
                    if (index === 2) setShowUserPanel(true && user);
                  }}
                  onMouseLeave={() => {
                    if (index === 2) setShowUserPanel(false && user);
                  }}
                  className="d-flex ms-2 mb-2"
                >
                  <FontAwesomeIcon className="me-4" icon={icon.icon} color="#c00000" size="lg" />
                  <div className="text-black">{icon.text}</div>
                </Link>
              </li>
            ))}
            <li class="nav-item">
              <form class="d-flex" role="search">
                <input
                  type="search"
                  className="form-control mx-2 d-none d-lg-block"
                  placeholder="Tìm kiếm sách"
                  value={searchBooks}
                  required
                  onChange={(e) => setSearchBooks(e.target.value)}
                  style={{minWidth:"400px"}}
                />
                <input
                  type="search"
                  className="form-control mx-2 d-block d-lg-none"
                  placeholder="Tìm kiếm sách"
                  value={searchBooks}
                  required
                  onChange={(e) => setSearchBooks(e.target.value)}
                  style={{minWidth:"0px"}}
                />
                <button
                  className={`${cx("search-button")} my-1`}
                  onClick={() => {
                    if (searchBooks) {
                      setQueryParams({ ...queryParams, search: searchBooks });
                      navigate(`/books-list?search=${searchBooks}`);
                      setSearchBooks("");
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="sm"
                    color="white"
                  />
                </button>
              </form>
            </li>
          </ul>
          <div class="align-items-center justify-content-around d-none d-lg-flex">
            {navIcons.map((icon, index) => (
                <Link
                  to={icon.link}
                  key={`${icon.text}-${index}`}
                  onMouseEnter={() => {
                    if (index === 2) setShowUserPanel(true && user);
                  }}
                  onMouseLeave={() => {
                    if (index === 2) setShowUserPanel(false && user);
                  }}
                  className="text-center mx-2"
                >
                  <FontAwesomeIcon icon={icon.icon} color="#c00000" size="sm" />
                  <div className="text-black">{icon.text}</div>
                </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("user-panel-container", showUserPanel ? "user-panel-container-show" : "")}
          onMouseEnter={() => {
            setShowUserPanel(true && user);
          }}
          onMouseLeave={() => {
            setShowUserPanel(false && user);
          }}
        >
        <UserPanel />
      </div>
    </nav>
    // <div
    //   className={cx("container")}
    //   style={{
    //     zIndex: "initial",
    //   }}
    // >
    //   <div className={cx("left")}>
    //     <Logo />
    //   </div>
    //   <div className={cx("middle")}>
    //     <div className={cx("middle-content")}>
    //       <div
    //         className={cx("hover-icon-container")}
    //         onMouseEnter={() => {
    //           setShowHoverPanel(true);
    //         }}
    //         onMouseLeave={() => {
    //           setShowHoverPanel(false);
    //         }}
    //       >
    //         <FontAwesomeIcon icon={faBars} size="3x" color="#c00000" onClick={() => {
    //           window.location.href = "/books-list"
    //         }} />
    //         <FontAwesomeIcon icon={faChevronDown} size="xl" color="#c00000" />
    //       </div>
    //       <div className={cx("search-form")}>
    //         <input
    //           type="text"
    //           className={cx("search-input")}
    //           placeholder="Tìm kiếm"
    //           value={searchBooks}
    //           required
    //           onChange={(e) => setSearchBooks(e.target.value)}
    //         />
    //         <button className={cx("search-button")} onClick={() => {
    //           if (searchBooks) {
    //             setQueryParams({...queryParams, search: searchBooks})
    //             navigate(`/books-list?search=${searchBooks}`)
    //             setSearchBooks("")
    //           }
    //         }}>
    //           <FontAwesomeIcon
    //             icon={faMagnifyingGlass}
    //             size="lg"
    //             color="white"
    //           />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className={cx("right")}>
    //     {navIcons.map((icon, index) => (
    //       <Link
    //         to={icon.link}
    //         className={cx("nav-icon-container")}
    //         key={`${icon.text}-${index}`}
    //         onMouseEnter={() => {
    //           if (index === 2) setShowUserPanel(true && user);
    //         }}
    //         onMouseLeave={() => {
    //           if (index === 2) setShowUserPanel(false && user);
    //         }}
    //       >
    //         <FontAwesomeIcon icon={icon.icon} color="#c00000" size="2x" />
    //         <p className={cx("nav-icon-text")}>{icon.text}</p>
    //       </Link>
    //     ))}
    //     <div className={cx("user-panel-container", showUserPanel ? "user-panel-container-show" : "")}
    //         onMouseEnter={() => {
    //           setShowUserPanel(true && user);
    //         }}
    //         onMouseLeave={() => {
    //           setShowUserPanel(false && user);
    //         }}
    //       >
    //       <UserPanel />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
