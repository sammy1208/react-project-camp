import React from "react";
import PropTypes from "prop-types";

export default function ProductLmg({ img, product }) {
  return (
    <div className="productLmg-img bg-gray-30 rounded">
      <img src={img} alt={product.title} />
    </div>
  );
}

// **PropTypes 驗證**
ProductLmg.propTypes = {
  img: PropTypes.string.isRequired, // img 必須是字串
  product: PropTypes.shape({
    title: PropTypes.string.isRequired // product.title 必須是字串
  }).isRequired
};
