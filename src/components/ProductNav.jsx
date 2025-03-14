import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ProductNav({ product }) {
  const { id: product_id } = useParams(); //因為有重新命名
  const location = useLocation();

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
            "產品分類"
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
