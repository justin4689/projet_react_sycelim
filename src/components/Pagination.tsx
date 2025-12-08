import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav aria-label="Table pagination">
      <ul className="pagination justify-content-end mb-0 mt-3">
        {/* First page (double chevron left) */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(1)}
          >
            «
          </button>
        </li>

        {/* Previous page (single chevron left) */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(currentPage - 1)}
          >
            &lt;
          </button>
        </li>

        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next page (single chevron right) */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(currentPage + 1)}
          >
            &gt;
          </button>
        </li>

        {/* Last page (double chevron right) */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleClick(totalPages)}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;