import classNames from "classnames/bind";
import styles from "./AdminNavbar.module.scss";
import { faMagnifyingGlass, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo/Logo";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import UserPanel from "../UserPanel/UserPanel";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const AdminNavbar = () => {

  const {user, setShowUserPanel, showUserPanel} = useContext(GlobalContext)

  return (
    <>
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
          
        
              <li class="nav-item d-block d-lg-none">
                <Link
                  to={"/member"}
                  onMouseEnter={() => {
                    setShowUserPanel(true && user);
                  }}
                  onMouseLeave={() => {
                    setShowUserPanel(false && user);
                  }}
                  className="d-flex ms-2 mb-2"
                >
                  <FontAwesomeIcon className="me-4" icon={faUserAlt} color="#c00000" size="lg" />
                  <div className="text-black">{user.fname}</div>
                </Link>
              </li>
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
      {/* <div className={cx("container")}>
      <div className={cx("left")}>
        <Logo />
      </div>
      <div className={cx("middle")}>
          <form className={cx("search-form")}>
            <input type="text" className={cx("search-input")} placeholder="Tìm kiếm" />
            <button className={cx("search-button")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="white" />
            </button>
          </form>
      </div>
      <div className={cx("right")}>
          <div className={cx("nav-icon-container")}>
            <FontAwesomeIcon icon={faUserAlt} color="#c00000" size="2x" />
            <p className={cx("nav-icon-text")}>{user.fname}</p>
          </div>
      </div>
    </div> */}
    </>
  )
}

export default AdminNavbar