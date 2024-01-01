import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./NewsUser.module.scss";
import ReactPaginate from "react-paginate";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { clippingParents } from "@popperjs/core";

const cx = classNames.bind(styles);

const NewsUser = () => {

  const { apiUrl } = useContext(GlobalContext);

  const [displayCount, setDisplayCount] = useState(4);
  const [itemOffset, setItemOffset] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("Tất Cả");
  const [sort, setSort] = useState("Thời gian");
  const [newsSearch, setNewsSearch] = useState("");
  const [filters, setFilters] = useState("");

  const [displayNewsList, setDisplayNewsList] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  // const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    setForcePage(parseInt(event.selected));
    window.scrollTo(0, 0);
  };

  const categories = ["Tất Cả", "Sách Hot", "Về Tác Giả", "Tri Thức", "Sự Kiện"];

  useEffect(() => {
    setFilters(`${categoryFilter} ${sort} ${newsSearch}`);
  }, [categoryFilter, sort, newsSearch]);

  useEffect(() => {
    setForcePage(0);
  }, [filters]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/pages/NewsUser/NewsUser.php?search=${newsSearch}&sort=${sort}&ctgr=${categoryFilter}&page=${forcePage + 1}`
        );
        console.log(res.data);
        setDisplayNewsList(res.data.resData);
        setResultCount(res.data.count);
        setPageCount(Math.ceil(res.data.count / displayCount));
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchNews();
  }, [filters, forcePage, newsSearch]);

  return (
    <div className={cx("container")}>
      <div className={cx("NewsGrid")}>
        <div className={cx("mb-5", "bold", "fs-36", "while_background")}>
          Tin tức
        </div>
        <div className={cx("flex")}>
          <div className={cx("Search_bar_section", "while_background")}>
            {/* xài boostrap chỗ này */}
            <div className="accordion" id="myAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    type="button"
                    className="accordion-button collapsed fw-bold fs-4"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    Tìm kiếm
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#myAccordion"
                >
                  <div className="card-body">
                    <div className="input-group rounded p-2">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Nhập tên tin tức"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={newsSearch}
                        onChange={(e) => setNewsSearch(e.target.value)}
                      />
                      <button
                        className="input-group-text border-0 bg-white"
                        id="search-addon"
                        onClick={(e) => setNewsSearch(newsSearch)}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    type="button"
                    className="accordion-button collapsed fw-bold fs-4"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                  >
                    Thể loại
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#myAccordion"
                >
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {categories.map((category) => (
                        <li
                          key={category}
                          className="list-group-item"
                          style={
                            categoryFilter === category
                              ? {
                                  color: "#C00000",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }
                              : { color: "black", cursor: "pointer" }
                          }
                          onClick={() => {
                            setCategoryFilter(category);
                          }}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    type="button"
                    className="accordion-button collapsed fw-bold fs-4"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                  >
                    Sắp xếp theo
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#myAccordion"
                >
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {["Thời gian", "Tựa đề"].map((item) => (
                        <li
                          className="list-group-item"
                          key={item}
                          style={
                            sort === item
                              ? {
                                  color: "#C00000",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }
                              : { color: "black", cursor: "pointer" }
                          }
                          onClick={() => {
                            setSort(item);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Kết thúc đoạn mã sử dụng boostrap */}
          </div>
          {displayNewsList.length === 0 ? <h1 className={cx("text-no-result")}>Không có kết quả phù hợp</h1> : (
            <>
            <div className={cx("content-container")}>
              <div className={cx("News_content", "while_background")}>
              {displayNewsList.map((news) => (
                <div className={cx("flex", "mb-5", "while_background")} style={{cursor: "pointer"}} key={news.title} onClick={() => {
                  window.location.href = "/news-detail?id=" + news.ID
                }}>
                  <img className={cx("New_image")} src={news.thumnail} alt="" />
                  <div className={cx("New_text", "while_background")}>
                    <div
                      className={cx(
                        "bold",
                        "fs-40",
                        "mb-1",
                        "while_background"
                      )}
                    >
                      {news.title}
                    </div>
                    <div className={cx("mb-3", "while_background")}>
                      {news.content.slice(0, 200)}
                    </div>
                    <div
                      className={cx("flex", "yellow-font", "while_background")}
                    >
                      <div
                        className={cx("mb-1", "New_time", "while_background")}
                      >
                        {news.time}
                      </div>
                      <div
                        className={cx("mb-1", "red-font", "while_background")}
                      >
                        <FontAwesomeIcon
                          className={cx("while_background")}
                          icon={faHeart}
                        />{" "}
                        Thích ({news.like_count ? news.like_count : 0})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cx("pagination")}>
                <div className={cx("pagination-top")}>
                <p className={cx("pagination-text")}>
                {(forcePage + 1) * displayCount - displayCount + 1} -{" "}
                      {Math.min((forcePage + 1) * displayCount, resultCount)}{" "}
                      trên tổng số {resultCount}
                </p>
              </div>
              <ReactPaginate
                breakLabel="..."
                previousLabel={
                  <div className={cx("previous")}>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      color="gray"
                      size="xl"
                    />
                  </div>
                }
                nextLabel={
                  <div className={cx("next")}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="gray"
                      size="xl"
                    />
                  </div>
                }
                onPageChange={handlePageClick}
                forcePage={forcePage}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousClassName={cx("previous")}
                nextClassName={cx("next")}
                pageClassName={cx("page")}
                pageLinkClassName={cx("page-link")}
                previousLinkClassName={cx("previous-link")}
                nextLinkClassName={cx("next-link")}
                breakClassName={cx("break")}
                breakLinkClassName={cx("break-link")}
                containerClassName={cx("pagination-bottom")}
                activeClassName={cx("active")}
                activeLinkClassName={cx("active-link")}
                disabledClassName={cx("disabled-label")}
                disabledLinkClassName={cx("disabled-link")}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsUser;
