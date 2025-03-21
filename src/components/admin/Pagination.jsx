import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ products, pageInfo, getProduct }) {
  const handlePageChange = (page) => {
    getProduct(page);
  };

  return (
    <div className="d-flex justify-content-center">
      {products.length < 1 ? (
        ""
      ) : (
        <nav>
          <ul className="pagination">
            <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
              <a
                onClick={() => handlePageChange(pageInfo.current_page - 1)}
                className="page-link"
              >
                上一頁
              </a>
            </li>

            {Array.from({ length: pageInfo.total_pages }).map((item, index) => (
              <li
                key={index}
                className={`page-item ${
                  pageInfo.current_page === index + 1 && "active"
                }`}
              >
                <a
                  onClick={() => handlePageChange(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
              <a
                onClick={() => handlePageChange(pageInfo.current_page + 1)}
                className="page-link"
              >
                下一頁
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

// **🔹 PropTypes 驗證**
Pagination.propTypes = {
  products: PropTypes.array.isRequired, // 確保 `products` 是陣列
  pageInfo: PropTypes.shape({
    total_pages: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    has_pre: PropTypes.bool.isRequired,
    has_next: PropTypes.bool.isRequired,
  }).isRequired,
  getProduct: PropTypes.func.isRequired, // 確保 `getProduct` 是函式
};

export default Pagination;
