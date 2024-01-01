import classNames from "classnames/bind";
import styles from "./BooksList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { getPriceExpr } from "./../../utils/getPriceRepr";
import ReactPaginate from "react-paginate";
import axios from "axios";
import GlobalContext from "../../context/GlobalContext";

const cx = classNames.bind(styles);

const BooksList = () => {
  const { apiUrl, queryParams } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);

  var searchBooks = "";
  var chosenCategory = "";
  var chosenAge = "";
  var chosenCover = "";
  if (window.location.search) {
    searchBooks = queryParams.get("search");
    chosenCategory = queryParams.get("category");
    chosenAge = queryParams.get("age");
    chosenCover = queryParams.get("cover");
    console.log(queryParams.get("category"));
  }

  const [categoryFilters, setCategoryFilters] = useState(
    chosenCategory ? [chosenCategory] : []
  );
  const [coverFilters, setCoverFilters] = useState(
    chosenCover ? [chosenCover] : []
  );
  const [ageFilters, setAgeFilters] = useState(chosenAge ? [chosenAge] : []);
  const [filtersList, setFiltersList] = useState(
    categoryFilters.concat(coverFilters, ageFilters)
  );
  const [inStockFilter, setInStockFilter] = useState(0);
  const [hasPriceFilter, setHasPriceFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [sortAsc, setSortAsc] = useState(1);
  const [displayCount, setDisplayCount] = useState(12);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [priceFilterError, setPriceFilterError] = useState("");
  const [displayBooksList, setDisplayBooksList] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const categoriesList = [
    "Tâm Lý - Kỹ Năng Sống",
    "Văn Học",
    "Manga - Comic",
    "Giáo Khoa - Tham Khảo",
    "Thiếu Nhi",
    "Sách Học Ngoại Ngữ",
  ];
  const coversList = ["Bìa Cứng", "Bìa Mềm", "Bộ Hộp"];
  const agesList = ["11 - 15", "15 - 18", "> 18"];
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    setForcePage(parseInt(event.selected));
    window.scrollTo(0, 0);
  };

  const handlePriceFilter = (e) => {
    const price1 = parseInt(priceFrom);
    const price2 = parseInt(priceTo);
    if (!price1 || !price2 || price1 >= price2) {
      setPriceFilterError("Vui lòng kiểm tra lại khoảng giá tiền!");
      return;
    }
    setPriceFilterError("");
    setFiltersList([
      ...filtersList.filter((ft) => !ft.includes("Giá tiền:")),
      `Giá tiền: ${price1}đ - ${price2}đ`,
    ]);
    setHasPriceFilter(1);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        var filterString = "";
        categoryFilters.forEach((item) => (filterString += `&ctgr[]=${item}`));
        ageFilters.forEach((item) => (filterString += `&age[]=${item}`));
        coverFilters.forEach((item) => (filterString += `&cvr[]=${item}`));
        if (hasPriceFilter) filterString += `&ps=${priceFrom}&pe=${priceTo}`;
        if (inStockFilter) filterString += "&instock=1";
        const res = await axios.get(
          `${apiUrl}/pages/BooksList/BooksList.php?page=${
            forcePage + 1
          }&count=${displayCount}&sort=${sort}&sortAsc=${sortAsc}` +
            filterString +
            `&search=${searchBooks}`
        );
        console.log(res.data);
        setDisplayBooksList(res.data.resData);
        setResultCount(res.data.count);
        setPageCount(Math.ceil(res.data.count / displayCount));
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBooks();
  }, [sort, sortAsc, displayCount, forcePage, filtersList, searchBooks]);

  useEffect(() => {
    setForcePage(0);
  }, [filtersList, displayCount]);

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")}>
        <div className={cx("filter-category", "filter-section")}>
          <h6 className={cx("filter-text")}>THỂ LOẠI</h6>
          {categoriesList.map((category, index) => (
            <label
              className={cx("checkbox-container")}
              htmlFor={`category-checkbox-${index}`}
              key={category}
            >
              <input
                type="checkbox"
                id={`category-checkbox-${index}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFiltersList([...filtersList, category]);
                    setCategoryFilters([...categoryFilters, category]);
                  } else {
                    setFiltersList(
                      filtersList.filter((item) => item !== category)
                    );
                    setCategoryFilters(
                      categoryFilters.filter((item) => item !== category)
                    );
                  }
                }}
                checked={filtersList.includes(category)}
              />
              <div className={cx("checkbox-icon-container")}>
                <div className={cx("checkbox-icon")}>
                  <FontAwesomeIcon icon={faCheck} color="white" size="xs" />
                </div>
              </div>
              <p className={cx("checkbox-text")}>{category}</p>
            </label>
          ))}
        </div>
        <div className={cx("filter-price", "filter-section")}>
          <h6 className={cx("filter-text")}>GIÁ</h6>
          <div className={cx("price-input-container")}>
            <label htmlFor="price-input-1" className={cx("price-input-label")}>
              Giá từ:
            </label>
            <input
              type="number"
              id="price-input-1"
              className={cx("price-input")}
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
            <label htmlFor="price-input-1">đ</label>
          </div>
          <div className={cx("price-input-container")}>
            <label htmlFor="price-input-2" className={cx("price-input-label")}>
              Đến:
            </label>
            <input
              type="number"
              id="price-input-2"
              className={cx("price-input")}
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
            <label htmlFor="price-input-2">đ</label>
          </div>
          {priceFilterError && (
            <div className={cx("price-filter-error")}>
              <p className={cx("price-filter-error-text")}>
                {priceFilterError}
              </p>
            </div>
          )}
          <button
            className={cx("price-range-button")}
            onClick={(e) => handlePriceFilter(e)}
          >
            Áp dụng
          </button>
        </div>
        <div className={cx("filter-covers", "filter-section")}>
          <h6 className={cx("filter-text")}>HÌNH THỨC</h6>
          {coversList.map((cover, index) => (
            <label
              htmlFor={`cover-checkbox-${index}`}
              className={cx("checkbox-container")}
              key={cover}
            >
              <input
                type="checkbox"
                id={`cover-checkbox-${index}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFiltersList([...filtersList, cover]);
                    setCoverFilters([...coverFilters, cover]);
                  } else {
                    setFiltersList(
                      filtersList.filter((item) => item !== cover)
                    );
                    setCoverFilters(
                      coverFilters.filter((item) => item !== cover)
                    );
                  }
                }}
                checked={filtersList.includes(cover)}
              />
              <div className={cx("checkbox-icon-container")}>
                <div className={cx("checkbox-icon")}>
                  <FontAwesomeIcon icon={faCheck} color="white" size="xs" />
                </div>
              </div>
              <p className={cx("checkbox-text")}>{cover}</p>
            </label>
          ))}
        </div>
        <div className={cx("filter-ages", "filter-section")}>
          <h6 className={cx("filter-text")}>ĐỘ TUỔI</h6>
          {agesList.map((age, index) => (
            <label
              htmlFor={`age-checkbox-${index}`}
              className={cx("checkbox-container")}
              key={age}
            >
              <input
                type="checkbox"
                id={`age-checkbox-${index}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFiltersList([...filtersList, age]);
                    setAgeFilters([...ageFilters, age]);
                  } else {
                    setFiltersList(filtersList.filter((item) => item !== age));
                    setAgeFilters(ageFilters.filter((item) => item !== age));
                  }
                }}
                checked={filtersList.includes(age)}
              />
              <div className={cx("checkbox-icon-container")}>
                <div className={cx("checkbox-icon")}>
                  <FontAwesomeIcon icon={faCheck} color="white" size="xs" />
                </div>
              </div>
              <p className={cx("checkbox-text")}>{age}</p>
            </label>
          ))}
        </div>
        <label htmlFor="instock-checkbox" className={cx("checkbox-container")}>
          <input
            type="checkbox"
            id="instock-checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setFiltersList([...filtersList, "Còn hàng"]);
                setInStockFilter(1);
              } else {
                setFiltersList(
                  filtersList.filter((item) => item !== "Còn hàng")
                );
                setInStockFilter(0);
              }
            }}
            checked={filtersList.includes("Còn hàng")}
          />
          <div
            className={cx("checkbox-icon-container", "checkbox-icon-instock")}
          >
            <div className={cx("checkbox-icon")}>
              <FontAwesomeIcon icon={faCheck} color="white" size="xs" />
            </div>
          </div>
          <p className={cx("instock-checkbox-text", "checkbox-text")}>
            Chỉ hiển thị sản phẩm còn hàng
          </p>
        </label>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("sorting")}>
          <div className={cx("sorting-top", "sorting-section")}>
            <p className={cx("sorting-label")}>Sắp xếp theo:</p>
            <div className={cx("sorting-criteria")}>
              <select
                name="sorting"
                className={cx("sorting-select")}
                onChange={(e) => setSort(e.target.value)}
              >
                {[
                  { value: 0, text: "Tên sách" },
                  { value: 1, text: "Giá" },
                  { value: 2, text: "Giảm giá" },
                  { value: 3, text: "Đánh giá" },
                ].map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
              <select
                name="order"
                className={cx("sorting-select", "sorting-order")}
                onChange={(e) => setSortAsc(e.target.value)}
              >
                {[
                  { value: 1, text: "Tăng dần" },
                  { value: 0, text: "Giảm dần" },
                ].map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={cx("sorting-bottom", "sorting-section")}>
            <p className={cx("sorting-label")}>Hiển thị:</p>
            <div className={cx("sorting-criteria")}>
              <select
                name="sorting"
                className={cx("sorting-select")}
                onChange={(e) => setDisplayCount(parseInt(e.target.value))}
              >
                {[
                  { value: "12", text: "12 sản phẩm" },
                  { value: "24", text: "24 sản phẩm" },
                  { value: "36", text: "36 sản phẩm" },
                ].map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {searchBooks ? (
            <h6 className={cx("filter-summary-text")}>
              Từ khóa tìm kiếm: {decodeURI(searchBooks)}
            </h6>
          ) : null}
          {filtersList.length !== 0 ? (
            <div className={cx("filter-summary")}>
              <h6 className={cx("filter-summary-text")}>Lọc theo:</h6>
              {filtersList.map((filter) => (
                <div className={cx("filter-tag-container")} key={filter}>
                  <p className={cx("filter-tag")}>{filter}</p>
                  <FontAwesomeIcon
                    icon={faTimes}
                    color="white"
                    onClick={() => {
                      setFiltersList(
                        filtersList.filter(
                          (filteredFilter) => filteredFilter !== filter
                        )
                      );
                      if (categoryFilters.includes(filter))
                        setCategoryFilters(
                          categoryFilters.filter((item) => item !== filter)
                        );
                      if (ageFilters.includes(filter))
                        setAgeFilters(
                          ageFilters.filter((item) => item !== filter)
                        );
                      if (coverFilters.includes(filter))
                        setCoverFilters(
                          coverFilters.filter((item) => item !== filter)
                        );
                      if (filter.includes("Giá tiền")) setHasPriceFilter(0);
                      if (filter.includes("Còn hàng")) setInStockFilter(0);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {!isLoading ? (
          <>
            {displayBooksList.length ? (
              <div className={cx("content")}>
                <div className={cx("books-container")}>
                  {displayBooksList.map((book, index) => (
                    <div
                      className={cx("book-container")}
                      key={book.name + index}
                      onClick={() => {
                        window.location.href = "/ProductsDetail?id=" + book.id;
                      }}
                    >
                      <img src={book.image} className={cx("book-cover")} />
                      <div className={cx("book-infos")}>
                        <h6 className={cx("book-name")}>{book.name}</h6>
                        <div className={cx("book-price-star")}>
                          <div className={cx("book-price-container")}>
                            <p className={cx("book-price")}>
                              {getPriceExpr(book.price, book.discount)}
                            </p>
                          </div>
                          {book.discount != 0 && (
                            <div className={cx("book-discount-container")}>
                              <p
                                className={cx("book-discount")}
                              >{`-${book.discount}%`}</p>
                            </div>
                          )}
                          <div className={cx("book-stars-container")}>
                            <p className={cx("book-stars")}>{book.rating}</p>
                            <FontAwesomeIcon
                              icon={faStar}
                              color="gold"
                              size="sm"
                            />
                          </div>
                        </div>
                        {book.discount != 0 && (
                          <div className={cx("book-org-price-container")}>
                            <p className={cx("book-org-price")}>
                              {getPriceExpr(book.price)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("pagination")}>
                  <div className={cx("pagination-top")}>
                    <p className={cx("pagination-text")}>
                      Hiển thị{" "}
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
            ) : (
              <h1 className={cx("text-no-result")}>Không có kết quả phù hợp</h1>
            )}
          </>
        ) : (
          <h1 className={cx("text-no-result")}>Đang tải . . .</h1>
        )}
      </div>
    </div>
  );
};

export default BooksList;
