import React, { useContext, useState } from 'react';
import { useEffect } from "react"; 
import axios from 'axios';
import classNames from "classnames/bind";
import styles from './Managebook.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import GlobalContext from "../../../context/GlobalContext"

const cx = classNames.bind(styles);

const ManageBook = () => {
    const navigate = useNavigate();
    const {apiUrl} = useContext(GlobalContext)

    const handleEdit = (id) => {
        navigate(`/admin/book-detail?id=${id}`);
    }

    const PAGE_SIZE = 10;
    const [offset, setOffset] = useState(0);
    const [maxBook, setMaxBook] = useState(0);

    const handleBackIcon = () => {
        if(offset - PAGE_SIZE >= 0)
            setOffset(offset - PAGE_SIZE);
    }

    const handleNextIcon = () => {
        if(offset + PAGE_SIZE < maxBook)
            setOffset(offset + PAGE_SIZE);
    }

    //get data from the DB
    const [table, getTable] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(
              `${apiUrl}/pages/Admin/Managebook/Managebook.php?from=${offset}&size=${PAGE_SIZE}`
            );
            getTable(response.data);
    
          } catch (error) {
            console.error(error);
          }
        }
        fetchUser();
      }, [offset])

    useEffect(() => {
    // setup delete model
        let deleteModal = document.querySelector('#deleteModal')
        deleteModal.addEventListener('show.bs.modal', (e) => {
            let trigger_btn = e.relatedTarget   
            const bookname = trigger_btn.getAttribute('data-bs-book')
            const bookID = trigger_btn.getAttribute('data-bs-id')

            let modalBody = deleteModal.querySelector('.modal-body')
            modalBody.innerHTML = `Bạn có muốn xoá cuốn sách <code>${bookname}</code>`
            
            let modalSubmit = deleteModal.querySelector('.modal-submit')
            modalSubmit.setAttribute('query-bookid', bookID)
        })
    }, [])

    useEffect(() => {
        const fetchMaxBook = async () => {
        try {
            const response = await axios.get(
            `${apiUrl}/pages/Admin/Managebook/Count_book.php`
            );

            setMaxBook(response.data[0]);

        } catch (error) {
            console.error(error);
        }
        }
        fetchMaxBook();
    })

    
    const handleDelete = async (e) => {
        let btn = e.target
        let id = btn.getAttribute('query-bookid')

        try {
            const formData = new FormData();
            formData.append('id', id);
      
            await axios.post(
              `${apiUrl}/pages/Admin/Managebook/DeleteBook.php`,
              formData
            );

            setOffset(0)
      
          } catch (error) {
            console.error(error);
          }
        console.log("Xóa " + id + " thành công");
    }

    return (
        <>
            <div className="row">
                <h4 className="col-auto mb-3">Quản lý sách</h4>
                <div className="col-6">
                    <button type="button" className="btn btn-sm btn-primary" 
                        onClick={() => navigate(`/admin/book-detail`)}>Thêm sách</button>
                </div>
            </div>

            <div className={cx("header")}>
                <div className={cx("id-header")}>#</div>
                <div className={cx("name-header")}>Bookname</div>
                <div className={cx("author-header")}>Author</div>
                <div className={cx("action-header")}>Action</div>
            </div>

            {table.map((item, index) => (
                <div className={cx("content")}  key={item.ID}>
                    <div className={cx("id")}>{index + offset + 1}</div>
                    <div className={cx("name")}>{item.name}</div>
                    <div className={cx("author")}>{item.author}</div>
                    <div className={cx("action")}>
                        <button className={cx("button-edit")}>
                            <FontAwesomeIcon icon={faPenToSquare} className={cx("icon-edit")} onClick={() => handleEdit(item.ID)}/>
                        </button>
                        <button className={cx("button-delete")} data-bs-book={item.name} data-bs-id={item.ID} data-bs-toggle="modal" data-bs-target="#deleteModal">
                            <FontAwesomeIcon icon={faTrashCan} className={cx("icon-delete")}/>
                        </button>
                    </div>
                </div>
            ))}


            <div className={cx("footer")}>
                <div className={cx("pages-number")}>
                    {offset+1} - {Math.min(offset+PAGE_SIZE, maxBook)} trong số {maxBook}
                </div>
                <div className={cx("direction")}>
                    <button className={cx("button-back")} onClick={handleBackIcon}>
                        <FontAwesomeIcon icon={faChevronLeft} className={cx("icon-back")} />
                    </button>
                    <button className={cx("button-next")} onClick={handleNextIcon}>
                        <FontAwesomeIcon icon={faChevronRight} className={cx("icon-next")} />
                    </button>
                </div>
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Xác nhận</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary modal-submit border-0" 
                                style={{backgroundColor:'#C00000'}} query-usename='' 
                                onClick={handleDelete} data-bs-dismiss="modal">Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageBook