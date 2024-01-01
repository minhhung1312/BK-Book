import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames/bind"
import styles from "./AddButton.module.scss"

const cx = classNames.bind(styles)

const AddButton = () => {
  return (
    <button className={cx("add-button")}>
      <FontAwesomeIcon icon={faPlus} color="white" size="lg" />
      <p>Thêm địa chỉ</p>
    </button>
  )
}

export default AddButton