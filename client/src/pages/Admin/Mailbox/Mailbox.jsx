import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Mailbox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
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

const Mailbox = () => {
    const PAGE_SIZE = 2;
    const [offset, setOffset] = useState(0); // use for paginate
    const [mail, setMail] = useState([]);
    const [selectedMail, setSelectedMail] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [maxMail, setMaxMail] = useState(0);

    const { apiUrl } = useContext(GlobalContext)

    useEffect(() => {
        // setup delete model
        let deleteModal = document.querySelector('#deleteModal')
        deleteModal.addEventListener('show.bs.modal', (e) => {
            let modalBody = deleteModal.querySelector('.modal-body')
            modalBody.innerHTML = `Bạn có muốn xoá các mail đã chọn`
        })
    })

    useEffect(() => {
        // fetch user amount
        fetchMailList()
    }, [offset])

    useEffect(() => {
        const isAllSelected = mail.every((item) => selectedMail.includes(item.id));
        setSelectAll(isAllSelected);
        if(selectedMail.length == 0)
            document.querySelector(`.${cx("icon-trashcan")}`).setAttribute('data-bs-target',"")
        else            
            document.querySelector(`.${cx("icon-trashcan")}`).setAttribute('data-bs-target',"#deleteModal")

    }, [selectedMail]);

    const fetchMailList = () => {
        // fetch mail amount
        axios.get(`${apiUrl}/pages/Admin/Mailbox/mail_count.php`)
            .then((response) => {setMaxMail(Number(response.data['count']))})

        // fetch mail list
        axios.get(`${apiUrl}/pages/Admin/Mailbox/mail_list.php?from=${offset}&size=${PAGE_SIZE}`)
            .then((response) => {
                setMail(response.data.map((record, index) => {return {
                    'index': index+offset,
                    'id': record.ID,
                    'name': record.sender,
                    'title': record.title,
                    'content': record.content,
                    'time': record.time,
                    'read': record.hasRead == '1',
                }}))
                setSelectedMail([])
        })
    }

    const handleBackIcon = () => {
        if(offset - PAGE_SIZE >= 0)
            setOffset(offset - PAGE_SIZE);
    }

    const handleNextIcon = () => {
        if(offset + PAGE_SIZE < maxMail)
            setOffset(offset + PAGE_SIZE);
    }

    const handleSelectMail = (id) => {
        if (id === "head") {
            setSelectAll(!selectAll);
            if (!selectAll) {
                setSelectedMail(mail.map((item) => item.id));
            } else {
                setSelectedMail([]);
            }
        } else {
            if (selectedMail.includes(id)) {
                setSelectedMail(selectedMail.filter((item) => item !== id));
            } else {
                setSelectedMail([...selectedMail, id]);
            }
            if (selectedMail.length === mail.length - 1) {
                setSelectAll(true);
            } else if (selectAll) {
                setSelectAll(false);
            }
        }
    };

    const handleDeleteSelectedMails = () => {
        const data = selectedMail.map((item) => `'${item}'`).join(',')
        axios.get(`${apiUrl}/pages/Admin/Mailbox/delete_mails.php?mails=${data}`)
            .then((response) => {
                console.log(response.data);
                if(offset == 0)
                    fetchMailList()
                else
                    setOffset(0);
            })
    };

    return (
        <>
            <h4 className="mb-3">Yêu cầu liên hệ</h4>
            <div className={cx("content")}>
                <div className={cx("header")}>
                    <div className={cx("button")}>
                        <div className={cx("checkbox-head")}>
                            <div className={cx("checkbox-container")}>
                                <input className={cx("checkbox")} type="checkbox"
                                    onChange={() => handleSelectMail("head")} 
                                    checked={selectAll} />
                                <span className={cx("checkmark")}></span>
                            </div>

                        </div>
                        <button className={cx("button-reload")} onClick={fetchMailList}>
                            <FontAwesomeIcon icon={faRotateRight} className={cx("icon-reload")} />
                        </button>
                        <button className={cx("button-delete")}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx("icon-trashcan")}
                                data-bs-toggle="modal" data-bs-target="#deleteModal"/>
                        </button>
                    </div>
                    <div className={cx("pages")}>
                        <div className={cx("pages-number")}>
                        {offset+1} - {Math.min(offset+PAGE_SIZE, maxMail)} trong số {maxMail}
                        </div>
                        <button className={cx("button-back")} onClick={handleBackIcon}>
                            <FontAwesomeIcon icon={faChevronLeft} className={cx("icon-back")} />
                        </button>
                        <button className={cx("button-next")} onClick={handleNextIcon}>
                            <FontAwesomeIcon icon={faChevronRight} className={cx("icon-next")} />
                        </button>
                    </div>
                </div>

                {mail.map((item) => (
                    <Link to={`../mail-detail?line=${item.index}`} className={cx("mail")} key={item.index}>
                        <div className={cx("checkbox-mail")}>
                            <div className={cx("checkbox-container")} onClick={(e) => {e.stopPropagation()}}>
                                <input className={cx("checkbox")} type="checkbox"
                                    onChange={() => handleSelectMail(item.id)}
                                    checked={selectedMail.includes(item.id)} />
                                <span className={cx("checkmark")}></span>
                            </div>
                        </div>
                        <div className={cx("name",
                            { "text-bold": item.read === false })}>
                            <span>{item.name}</span>
                        </div>
                        <div className={cx("title-content")}>
                            <span className={cx("title",
                                { "text-bold": item.read === false })}>
                                {item.title}
                            </span>
                            <span className={cx("content-mail",
                                { "text-bold": item.read === false })}> - {item.content}</span>
                        </div>
                        <div className={cx("time",
                            { "text-bold": item.read === false })}>
                            <span>{item.time}</span>
                        </div>
                    </Link>
                ))}
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
                                onClick={handleDeleteSelectedMails} data-bs-dismiss="modal">Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mailbox