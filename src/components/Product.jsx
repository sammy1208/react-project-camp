import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const [wishList, setWishList] = useState(() => {
    const initWishList = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : {};

    return initWishList;
  });

  const btnWishList = (e, product_id) => {
    e.stopPropagation();
    const newWishList = {
      ...wishList,
      [product_id]: !wishList[product_id]
    };

    localStorage.setItem("wishList", JSON.stringify(newWishList));

    setWishList(newWishList);
  };

  const Navigate = useNavigate();

  const handleProduct = () => {
    Navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={() => handleProduct()}
      className="card mb-3 border-0 h-100 position-relative"
      style={{ cursor: "pointer" }}
    >
      <div className="mb-md-6 mb-2 bg-gray-30 rounded-3 card-padding h-100 btn-product-hover">
        <button
          onClick={(e) => btnWishList(e, product.id)}
          type="button"
          className="btn position-absolute top-0 end-0 btn-product-wish"
        >
          <i
            className={`bi fs-9 ${
              wishList[product.id]
                ? "bi-heart-fill text-primary"
                : "bi-heart text-gray-70"
            }`}
          ></i>
        </button>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{ minHeight: "100px" }}
        />
      </div>
      <div
        className="card-body p-0 d-flex flex-column"
        // style={{ minHeight: "80px" }}
      >
        <h5 className="card-title fs-md-8 fs-10 fw-normal text-gray-100 m-0 mb-md-2">
          {product.title}
        </h5>
        <p className="card-text fs-md-10 fs-11 text-gray-70 mb-md-4 mb-2">
          {product.description}
        </p>
        <p className="card-text fs-md-8 fs-9 fw-bold text-gray-100 mt-auto">
          <small className="text-muted">{`$${product.price}`}</small>
        </p>
      </div>
    </div>
  );
}
