import React, { useState } from 'react';
import classNames from "classnames/bind"
import styles from "./ReadMore.module.scss";

const cx = classNames.bind(styles)

function ReadMore ({ children, maxChareacterCount = 100}) {
    const text = children;

    const [isTruncated, setIsTruncated] = useState(true)

    const resultString = (text && isTruncated) ? text.slice(0, 100) + "..." : text;

    function toggleIsTruncated() {
        setIsTruncated(!isTruncated)
    }

    return (
        <div className={cx("while_background")}>
            {resultString}
            <div className={cx("Xem_them_grid")}>
            <button onClick={toggleIsTruncated} className={cx("Xem_them_button", "while_background")}> {isTruncated ? "Xem Thêm" : "Rút gọn"}</button>
            </div>
        </div>
    );
}

export default ReadMore;