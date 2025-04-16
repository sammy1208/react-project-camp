import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useSearchParams } from "react-router-dom";
export default function ProductNav({ product }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterLabelMap = {
    new: "新品報到",
    top: "冠軍排名",
    lowPrice: "冬眠季應援團·全面 85 折",
    highPrice: "周年慶·滿千折百",
    tent: "帳篷系列",
    outdoor: "戶外用品",
  };

  useEffect(() => {
    const filter = searchParams.get("filter");
    setSelectedFilter(filterLabelMap[filter] || "產品分類");

  }, [searchParams]);


  return (
    <nav aria-label="breadcrumb" className=" pb-4 pb-md-8">
      <ol className="breadcrumb fs-10 m-0 w-100">
        <li className="breadcrumb-item">
          <Link to={"/"}>首頁</Link>
        </li>
        <li
          className={`breadcrumb-item ${
            location.pathname === "/Products" ? "active" : ""
          }`}
          aria-current={location.pathname === "/Products" ? "page" : undefined}
        >
          {location.pathname === "/Products" ? (
            selectedFilter
          ) : (
            <Link to={`/Products`}>產品分類</Link>
          )}
        </li>
        {location.pathname !== "/Products" && product?.title && (
          <li className="breadcrumb-item active" aria-current="page">
            {product?.title}
          </li>
        )}
      </ol>
    </nav>
  );
}

// **PropTypes 驗證**
ProductNav.propTypes = {
  product: PropTypes.object
};
