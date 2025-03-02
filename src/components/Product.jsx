import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Product ({product}) {
    const [wishList, setWishList] = useState(() => {
        const initWishList = localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : {};

        return initWishList
    })

    const btnWishList = (e, product_id) => {
        e.stopPropagation()
        const newWishList = {
            ...wishList,
            [product_id]: !wishList[product_id]
        }

        localStorage.setItem("wishList", JSON.stringify(newWishList))

        setWishList(newWishList)
    }

    const Navigate = useNavigate();

    const handleProduct = () => {
        Navigate(`/products/${product.id}`)
    }

    return (
    <div
    onClick={() => handleProduct()}
    className="card mb-3 border-0 h-100 position-relative"
    style={{cursor: "pointer"}}
    >
        <div className="mb-md-6 mb-2 bg-gray-30 rounded-3 card-padding h-100 btn-product-hover">
            <button
            onClick={(e) => btnWishList(e, product.id)}
            type="button" className="btn position-absolute top-0 end-0">
                <i className={`bi fs-9 ${wishList[product.id] ? "bi-heart-fill text-primary" : "bi-heart text-gray-70" }`}></i>
            </button>
            <img src={product.imageUrl} className="" alt={product.title}/>
        </div>
        <div className="card-body p-0">
        <h5 className="card-title fs-md-8 fs-10 fw-normal text-gray-100 m-0 mb-md-2">{product.title}</h5>
        <p className="card-text fs-md-10 fs-11 text-gray-70 mb-md-4 mb-2">{product.description}</p>
        <p className="card-text fs-md-8 fs-9 fw-bold text-gray-100"><small className="text-muted">{`$${product.price}`}</small></p>
        </div>
    </div>
    )
}

{/* <div className="col-md-6">
    <div className="card border-0 mb-4 position-relative position-relative">
    <img
    src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
    className="card-img-top rounded-0"
    alt="..."
    />
    <a href="#" className="text-dark">
    <i
        className="far fa-heart position-absolute"
        style={{ right: "16px", top: "16px" }}
    ></i>
    </a>
    <div className="card-body p-0">
    <h4 className="mb-0 mt-3">
        <a href="./detail.html">Lorem ipsum</a>
    </h4>
    <p className="card-text mb-0">
        NT$1,080
        <span className="text-muted ">
        <del>NT$1,200</del>
        </span>
    </p>
    <p className="text-muted mt-3"></p>
</div> */}