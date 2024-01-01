import classNames from "classnames/bind";
import styles from "./HoverPanel.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const cx = classNames.bind(styles);

const HoverPanel = () => {
  const groups = [
    {
      category: "Thể Loại",
      tags: [
        "Tâm Lý - Kỹ Năng Sống",
        "Văn Học",
        "Manga - Comic",
        "Giáo Khoa - Tham Khảo",
        "Thiếu Nhi",
        "Sách Học Ngoại Ngữ",
      ],
    },
    {
      category: "Hình Thức Bìa",
      tags: ["Bìa Cứng", "Bìa Mềm", "Bộ Hộp"],
    },
    {
      category: "Độ Tuổi",
      tags: ["11 - 15", "15 - 18", "> 18"],
    },
  ];

  const { setShowHoverPanel, showHoverPanel } = useContext(GlobalContext);

  return (
    <div
      className={cx("container")}
      onMouseEnter={() => {
        setShowHoverPanel(true);
      }}
      onMouseLeave={() => {
        setShowHoverPanel(false);
      }}
      style={showHoverPanel ? {border: "1px solid #f0f0f0"} : null}
    >
      {groups.map((category, index) => (
        <div
          className={cx(`category-container-${index + 1}`)}
          key={category.category}
        >
          <Link
            to="/books-list"
            className={cx("category", "navlink")}
          >
            {category.category.toUpperCase()}
          </Link>
          {category.tags.map((tag, tagIndex) => (
            <Link
              onClick={() => {
              if (index === 0) window.location.href = `/books-list?category=${tag}`;
              if (index === 1) window.location.href = `/books-list?cover=${tag}`;
              if (index === 2) window.location.href = `/books-list?age=${tag}`;
            }}
              className={cx("tag", "navlink")}
              key={`tag-${tagIndex}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HoverPanel;
