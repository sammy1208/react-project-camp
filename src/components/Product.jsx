import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishMessage } from "../redux/slices/wishSlice";
export default function Product({ product }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isPrimaryBg, setIsPrimaryBg] = useState(true);
  const [isNewCart, setIsNewCart] = useState(false);
  const wishList = useSelector((state) => state.wish.list);
  const carts = useSelector((state) => state.cart.carts);
  const btnWishList = (e, product_id) => {
    e.stopPropagation();
    dispatch(wishMessage(product_id));
  };
  const Navigate = useNavigate();
  const handleProduct = () => {
    Navigate(`/Products/${product.id}`);
  };

  useEffect(() => {
    if (pathname === "/") {
      setIsPrimaryBg(true);
    } else if (pathname === "/Products/") {
      setIsPrimaryBg(true);
    } else if (pathname === "/Products") {
      setIsPrimaryBg(false);
    }
    cart();
  }, []);

  const dNone = isPrimaryBg ? "d-none" : "";

  const cart = () => {
    const newCart = carts.map((item) => item.product_id);
    const isInCart = newCart.includes(product.id);
    setIsNewCart(isInCart);
  };

  return (
    <div
      onClick={() => handleProduct()}
      className="card mb-3 border-0 h-100 position-relative d-flex flex-column"
      style={{ cursor: "pointer" }}
    >
      <div className="mb-md-6 mb-2 bg-gray-30 rounded-3 card-padding h-100 btn-product-hover">
        <div className="position-absolute top-0 end-0">
          <div className="d-flex align-items-center">
            <i
              className={`bi fs-8 btn-product-wish ${
                isNewCart
                  ? "bi-cart-fill text-primary"
                  : "bi-cart3 text-gray-70"
              }`}
            ></i>
            <button
              onClick={(e) => btnWishList(e, product.id)}
              type="button"
              className="btn btn-product-wish"
            >
              <i
                className={`bi fs-9 ${
                  wishList[product.id]
                    ? "bi-heart-fill text-primary"
                    : "bi-heart text-gray-70"
                }`}
              ></i>
            </button>
          </div>
        </div>
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="card-body body p-0 d-flex flex-column">
        <div className="flexItem__text">
          <h5
            className={`card-title m-0 mb-md-2 ${
              isPrimaryBg
                ? "fs-md-9 fs-11 text-gray-70"
                : "fs-md-8 fs-10 fw-normal text-gray-100"
            }`}
          >
            {product.title}
          </h5>
          <p
            className={`card-text fs-md-10 fs-11 text-gray-70 mb-md-4 mb-2 ${dNone}`}
          >
            {product.description}
          </p>
        </div>
        <p className="card-text fs-md-8 fs-9 fw-bold text-gray-100 mt-auto">
          <small className="text-muted">{`$${product.price?.toLocaleString(
            "zh-Hant-TW"
          )}`}</small>
        </p>
      </div>
    </div>
  );
}

// **PropTypes 驗證**
Product.propTypes = {
  product: PropTypes.object.isRequired
};
