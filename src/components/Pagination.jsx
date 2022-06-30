import React, { useState, useEffect } from "react";

function Pagination(props) {
  const { data, setPaginatedData } = props;

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
    setPages([...Array(Math.ceil(data.length / 10)).keys()]);
    paginate();
  }, [data]);

  useEffect(() => {
    paginate();
  }, [currentPage]);

  function paginate() {
    const startIndex = currentPage * 10;
    setPaginatedData(data.slice(startIndex, startIndex + 10));
  }

  function getPageButton() {
    const isFirst = currentPage === 0;
    const isLast = currentPage === (pages.length ? pages.length - 1 : 0);

    function getStaticButton(label, title, disableCondition, handler) {
      return (
        <button
          className="page-button"
          disabled={disableCondition}
          onClick={handler}
          title={title}
        >
          {label}
        </button>
      );
    }

    function getDynamicButton() {
      return pages.map((page, index) => {
        const isSelected = currentPage === page;

        return (
          <button
            className={isSelected ? "page-button selected" : "page-button"}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        );
      });
    }

    return (
      <>
        {getStaticButton("<<", "First", isFirst, () => setCurrentPage(0))}
        {getStaticButton("<", "Previous", isFirst, () =>
          setCurrentPage(currentPage - 1)
        )}
        {getDynamicButton()}
        {getStaticButton(">", "Next", isLast, () =>
          setCurrentPage(currentPage + 1)
        )}
        {getStaticButton(">>", "Last", isLast, () =>
          setCurrentPage(pages.length - 1)
        )}
      </>
    );
  }

  return <div className="page-button-container">{getPageButton()}</div>;
}

export default Pagination;
