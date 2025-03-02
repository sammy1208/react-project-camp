import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ProductNav( {product} ) {
    const { id: product_id } = useParams();//因為有重新命名
    const location = useLocation();
    
    return (
        <nav aria-label="breadcrumb" className=" pb-4 pb-md-8">
            <ol className="breadcrumb fs-10 m-0 w-100">
                <li className="breadcrumb-item">
                <Link
                to={"/"}
                >
                    首頁
                </Link>
                </li>
                <li
                className={`breadcrumb-item ${location.pathname === "/products" ? "active" : ""}`}
                aria-current={location.pathname === "/products" ? "page" : undefined}>
                    {location.pathname === "/products" ? ("產品分類") : (
                        <Link to={`/products`}>
                            產品分類
                        </Link>
                    )}
                </li>
                {location.pathname !== "/products" && product?.title && (
                <li className="breadcrumb-item active" aria-current="page">
                    {product?.title}
                </li>
                )}
            </ol>
        </nav>
    )
}