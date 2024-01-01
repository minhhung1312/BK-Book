import React, {useState, useEffect, useContext} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './MailDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// import boostrap
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import axios from 'axios';
import GlobalContext from '../../../context/GlobalContext';

const cx = classNames.bind(styles);

const Mailboxdetail = () => {
    const navigate = useNavigate()
    const [mailNo, setMailNo] = useState(Number(new URLSearchParams(useLocation().search).get('line')))
    const [mail, setMail] = useState([]);
    const [maxMail, setMaxMail] = useState(0);

    const { apiUrl } = useContext(GlobalContext)

    useEffect(() => {
        // fetch mail amount
        axios.get(`${apiUrl}/pages/Admin/Mailbox/mail_count.php`)
            .then((response) => {setMaxMail(Number(response.data['count']))})

        // setup delete model
        let deleteModal = document.querySelector('#deleteModal')
        deleteModal.addEventListener('show.bs.modal', (e) => {
            let modalBody = deleteModal.querySelector('.modal-body')
            modalBody.innerHTML = `Bạn có muốn xoá mail này`
        })
        }, [])
    
    useEffect(() => {
        axios.get(`${apiUrl}/pages/Admin/MailDetail/mail_by_line.php?line=${mailNo}`)
            .then((response) => {
                let record = response.data
                setMail({
                    'id': record.ID,
                    'name': record.sender,
                    'mail': record.USERNAME,
                    'title': record.title,
                    'content': record.content,
                    'time': record.time,
                    'read': record.hasRead == '1',
                })})
        }, [mailNo])

    const handleDeleteSelectedMail = () => {
        axios.get(`${apiUrl}/pages/Admin/MailDetail/delete_mail.php?id=${mail.id}`)
            .then((response) => {
                console.log(response.data);
                navigate('../mailbox')
            })
    }

    return (
        <div className={cx("container")}>
            <h4 className="mb-3">Yêu cầu liên hệ</h4>
            <div className={cx("content")}>
                <div className={cx("header")}>
                    <div className={cx("button")}>
                        <Link to={`../mailbox`} className={cx("button-return")}>
                            <FontAwesomeIcon icon={faArrowLeft} className={cx("icon-return")} />
                        </Link>
                        <button className={cx("button-delete")} data-bs-toggle="modal" data-bs-target="#deleteModal">
                            <FontAwesomeIcon icon={faTrashCan} className={cx("icon-trashcan")} />
                        </button>
                    </div>
                    <div className={cx("pages")}>
                        <div className={cx("pages-number")}>
                            {mailNo+1} trong số {maxMail}
                        </div>
                        <button onClick={() => setMailNo(Math.max(mailNo-1,0))} className={cx("button-back")}>
                            <FontAwesomeIcon icon={faChevronLeft} className={cx("icon-back")} />
                        </button>
                        <button onClick={() => setMailNo(Math.min(mailNo+1,maxMail-1))} className={cx("button-next")}>
                            <FontAwesomeIcon icon={faChevronRight} className={cx("icon-next")} />
                        </button>
                    </div>
                </div>


                <div className={cx("mail-detail")}>
                    <div className={cx("title-time")}>
                        <p className={cx("title")}>{mail.title}</p>
                        <p className={cx("time")}>{mail.time}</p>
                    </div>
                    <div className={cx("mail-info")}>
                        <div className={cx("image-mail")}></div>
                        <div className={cx("name-mail")}>
                            <span className={cx("name")}>{mail.name}</span>
                            <span className={cx("mail")}>{`<${mail.mail}>`}</span>
                        </div>
                    </div>
                    <div className={cx("content-mail")}>
                        <p className={cx("text-mail")}>{mail.content}</p>
                    </div>
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
                                onClick={handleDeleteSelectedMail} data-bs-dismiss="modal">Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mailboxdetail