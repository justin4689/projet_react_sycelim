import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Helper pour calculer une liste compacte de pages avec des ellipses
const getPageItems = (currentPage: number, totalPages: number) => {
  const items: (number | "ellipsis")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i += 1) {
      items.push(i);
    }
    return items;
  }

  const showLeft = Math.max(2, currentPage - 1);
  const showRight = Math.min(totalPages - 1, currentPage + 1);

  items.push(1);

  if (showLeft > 2) {
    items.push("ellipsis");
  }

  for (let i = showLeft; i <= showRight; i += 1) {
    items.push(i);
  }

  if (showRight < totalPages - 1) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const items = getPageItems(currentPage, totalPages);

  return (
    <nav aria-label="Table pagination">
      <ul className="pagination justify-content-end mb-0 mt-3">
        {/* First page (double chevron left) */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(1)}
          >
            <i className="uil uil-angle-double-left" />
          </button>
        </li>

        {/* Previous page (single chevron left) */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(currentPage - 1)}
          >
            <i className="uil uil-angle-left" />
          </button>
        </li>

        {items.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            );
          }

          const page = item as number;

          return (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next page (single chevron right) */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(currentPage + 1)}
          >
            <i className="uil uil-angle-right" />
          </button>
        </li>

        {/* Last page (double chevron right) */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(totalPages)}
          >
            <i className="uil uil-angle-double-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
