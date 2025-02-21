import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { useParams } from "react-router-dom";
import ProductLmg from "../components/ProductLmg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductNav( {id, product} ) {
    const { id: product_id } = useParams();//因為有重新命名
    
    return (
        <nav aria-label="breadcrumb" className=" pb-4 pb-md-8">
            <ol className="breadcrumb fs-10 m-0">
                <li className="breadcrumb-item">
                <Link
                to={"/"}
                >
                    首頁
                </Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                <Link
                to={`/products`}
                >
                    青松·帳篷系列
                </Link>
                </li>
                {location.pathname !== "/products" && product?.title && (

                <li className="breadcrumb-item" aria-current="page">
                <Link
                to={`/products/${id}`}
                >
                    {product?.title}
                </Link>
                </li>
                )}
            </ol>
        </nav>
    )
}