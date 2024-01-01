import { React, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Manageuser.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// import boostrap
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import axios from "axios";
import GlobalContext from "../../../context/GlobalContext";

const cx = classNames.bind(styles);

const Manageuser = () => {
  const PAGE_SIZE = 3;
  const [offset, setOffset] = useState(0); // use for paginate
  const [userList, setUserList] = useState([]);
  const [maxUser, setMaxUser] = useState(0); //
  const { apiUrl } = useContext(GlobalContext);

  useEffect(() => {
    // fetch user amount
    axios
      .get(`${apiUrl}/pages/Admin/Manageuser/user_count.php`)
      .then((response) => {
        setMaxUser(Number(response.data["count"]));
      });

    // setup status model
    let statusModal = document.querySelector("#statusModal");
    statusModal.addEventListener("show.bs.modal", (e) => {
      let trigger_btn = e.relatedTarget;
      const username = trigger_btn.getAttribute("data-bs-username");

      let modalBody = statusModal.querySelector(".modal-body");
      modalBody.innerHTML = `Bạn có muốn lưu thay đổi về trạng thái của người dùng <code>${username}</code>`;

      let modalSubmit = statusModal.querySelector(".modal-submit");
      modalSubmit.setAttribute("query-username", username);
    });

    // setup delete model
    let deleteModal = document.querySelector("#deleteModal");
    deleteModal.addEventListener("show.bs.modal", (e) => {
      let trigger_btn = e.relatedTarget;
      const username = trigger_btn.getAttribute("data-bs-username");

      let modalBody = deleteModal.querySelector(".modal-body");
      modalBody.innerHTML = `Bạn có muốn xoá người dùng <code>${username}</code>`;

      let modalSubmit = deleteModal.querySelector(".modal-submit");
      modalSubmit.setAttribute("query-username", username);
    });
  }, []);

  useEffect(() => {
    // fetch user list
    axios
      .get(
        `${apiUrl}/pages/Admin/Manageuser/user_list.php?from=${offset}&size=${PAGE_SIZE}`
      )
      .then((response) => {
        setUserList(
          response.data.map((record, id) => {
            return {
              id: offset + id,
              username: record.USERNAME,
              email: record.email,
              status: record.isBanned == "True" ? "Banned" : "Active",
            };
          })
        );
      });
  }, [offset, userList]);

  const handleBackIcon = () => {
    if (offset - PAGE_SIZE >= 0) setOffset(offset - PAGE_SIZE);
  };

  const handleNextIcon = () => {
    if (offset + PAGE_SIZE < maxUser) setOffset(offset + PAGE_SIZE);
  };

  const handleToggleStatus = (e) => {
    let btn = e.target;
    let username = btn.getAttribute("query-username");

    axios
      .get(
        `${apiUrl}/pages/Admin/Manageuser/toggle_status.php?username=${username}`
      )
      .then((response) => {
        console.log(response.data);
      });
    setUserList([]);
  };

  const handleDeleteUser = (e) => {
    let btn = e.target;
    let username = btn.getAttribute("query-username");

    axios
      .get(
        `${apiUrl}/pages/Admin/Manageuser/delete_user.php?username=${username}`
      )
      .then((response) => {
        console.log(response.data);
      });
    setUserList([]);
  };

  return (
    <>
      <h4 className="mb-3">Quản lý người dùng</h4>
      <div className={cx("header")}>
        <div className={cx("id-header")}>#</div>
        <div className={cx("username-header")}>Username</div>
        <div className={cx("email-header")}>Email</div>
        <div className={cx("status-header")}>Status</div>
        <div className={cx("action-header")}>Action</div>
      </div>

      {userList.map((item) => (
        <div key={item.username}>
          <div className={cx("content")}>
            <div className={cx("id")}>{item.id + 1}</div>
            <div className={cx("username")}>{item.username}</div>
            <div className={cx("email")}>{item.email}</div>
            <div className={cx("status")}>
              <div
                className={cx(
                  "status-border",
                  { active: item.status === "Active" },
                  { unactive: item.status === "Unactive" },
                  { banned: item.status === "Banned" }
                )}
                data-bs-toggle="modal"
                data-bs-target="#statusModal"
                data-bs-username={item.username}
              >
                {item.status}
              </div>
            </div>
            <div className={cx("action")}>
              <button
                className={cx("button-delete")}
                data-bs-username={item.username}
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className={cx("icon-delete")}
                />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className={cx("footer")}>
        <div className={cx("pages-number")}>
          {offset + 1} - {Math.min(offset + PAGE_SIZE, maxUser)} trong số{" "}
          {maxUser}
        </div>
        <div className={cx("direction")}>
          <button className={cx("button-back")} onClick={handleBackIcon}>
            <FontAwesomeIcon icon={faChevronLeft} className={cx("icon-back")} />
          </button>
          <button className={cx("button-next")} onClick={handleNextIcon}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={cx("icon-next")}
            />
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="statusModal"
        tabIndex="-1"
        aria-labelledby="statusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="statusModalLabel">
                Xác nhận
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary modal-submit border-0"
                style={{ backgroundColor: "#C00000" }}
                query-usename=""
                onClick={handleToggleStatus}
                data-bs-dismiss="modal"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Xác nhận
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary modal-submit border-0"
                style={{ backgroundColor: "#C00000" }}
                query-usename=""
                onClick={handleDeleteUser}
                data-bs-dismiss="modal"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manageuser;
