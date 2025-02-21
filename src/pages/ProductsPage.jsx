import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link, useLocation } from "react-router-dom";
import Product from "../components/Product";
import ScreenLoading from "../components/ScreenLoading";
import ProductNav from "../components/ProductNav";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsPage() {
  const [products, setProducts] = useState([]); // 當前頁面的產品
  const [productsAll, setProductsAll] = useState([]); // 全部產品
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({})
  const [selectedFilter, setSelectedFilter] = useState(null)// 存儲當前篩選條件


  const getProducts = async (page) => {
      setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}`);
      setProductsAll(res.data.products);
      setPageInfo(res.data.pagination);

      if(selectedFilter){
        applyFilter(selectedFilter, res.data.products)
      }else{
        setProducts(res.data.products);
      }

    } catch (error) {
      alert("取得產品失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  const handelPageChange = (page) => {
    setPageInfo(page)
    getProducts(page)
  }

  const applyFilter = (filter, products) => {
    let filteredProducts = [];

    switch (filter) {
      case "new":
        filteredProducts = products.filter((product) => product.unit === "新" );
        break;// 新品報到 new

      case "top":
        filteredProducts = products.filter((product) => product.category === "帳篷" && product.price < 2000 );
        break;//冠軍排名 top

      case "lowPrice":
        filteredProducts = products.filter((product) => product.price < 2000 )
        break;// 冬眠季應援團·全面 85 折 lowPrice

      case "highPrice":
        filteredProducts = products.filter((product) => product.price > 2000 )
        break;// 周年慶·滿千折百 highPrice

      case "tent":
        filteredProducts = products.filter((product) => product.category === "帳篷" )
        break;// 帳篷 tent

      case "outdoor":
        filteredProducts = products.filter((product) => product.category === "露營用品" )
        break;// 戶外用品 outdoor

      default:
        filteredProducts = products
        break;
    }
    setProducts(filteredProducts);
  }

  const handelFilterChange = (filter) => {
    setSelectedFilter(filter);
    applyFilter(filter, productsAll);
  }

  return (
    <>
      <main className="container-lg">
        <div className="pt-8 pb-14 pt-md-18 pb-md-23">
          <div className="row">
            {/* 左側nav */}
            <div className="col-3 d-none d-md-block">
              <p className="fs-8 fw-bold mb-6">產品分類</p>
              <ul className="list-unstyled">
                <li className="mb-4 border-bottom">
                  <Link className="py-8 w-100" onClick={() => handelFilterChange("new")}>
                    新品報到
                  </Link>
                </li>
                <li className="mb-4 border-bottom ">
                  <Link className="py-8 w-100" onClick={() => handelFilterChange("top")}>
                    冠軍排名
                  </Link>
                </li>
                <li className="mb-4 border-bottom">
                  <button
                    className="btn py-8 add-icon w-100 p-0 fw-normal rounded-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ProductList-1"
                    aria-expanded="false"
                  >
                    限時搶購
                  </button>
                  <div className="collapse" id="ProductList-1">
                    <Link
                      className="fs-10 text-gray-70 pb-4"
                      onClick={() => handelFilterChange("lowPrice")}
                    >
                      冬眠季應援團·全面 85 折
                    </Link>
                    <Link
                      className="fs-10 text-gray-70 pb-6"
                      onClick={() => handelFilterChange("highPrice")}
                    >
                      周年慶·滿千折百
                    </Link>
                  </div>
                </li>
                <li className="mb-4 border-bottom">
                  <button
                    className="btn py-8 add-icon w-100 p-0 fw-normal rounded-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ProductList-2"
                    aria-expanded="false"
                  >
                    青松｜帳篷系列
                  </button>
                  <div className="collapse" id="ProductList-2">
                    <Link
                      className="fs-10 text-gray-70 pb-4"
                      onClick={() => handelFilterChange("tent")}
                    >
                      帳篷系列
                    </Link>
                  </div>
                </li>
                <li className="mb-4 border-bottom">
                  <button
                    className="btn py-8 add-icon w-100 p-0 fw-normal rounded-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ProductList-3"
                    aria-expanded="false"
                  >
                    青松｜環保系列
                  </button>
                  <div className="collapse" id="ProductList-3">
                    <Link
                      className="fs-10 text-gray-70 pb-4"
                      onClick={() => handelFilterChange("outdoor")}
                    >
                      戶外用品
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* 右側產品列表 */}
            <div className="col">
              
              < ProductNav  id={null} product={null} />

              <section className="pb-md-10 pb-8 border-bottom">
                <h5 className="mb-4 fs-md-5 fs-7">
                  經典設計，可靠守護你的露營時光
                </h5>
                <p className="fs-md-9 fs-10">
                  充氣帳篷以其快速搭建、輕便攜帶的特性，成為露營愛好者的新寵。無需繁瑣的支架安裝，僅需幾分鐘即可完成搭建，省時又省力。堅固的氣柱結構，具備卓越的抗風與穩定性，無論是家庭露營還是好友野營，都能提供安全舒適的居住空間。讓你專注享受大自然，而非繁瑣的搭帳過程。
                </p>
              </section>
              <p className="fs-10 text-gray-70 py-md-10 py-8">{`共 ${products.length} 項商品`}</p>
              <div className="row gy-10">
                {products.map((product) => (
                  <div className="col-md-4 col-6" key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {/* 分頁按鈕 */}
              <nav
                aria-label="..."
                className="d-flex justify-content-md-center justify-content-center mt-16"
              >
                <ul className="pagination m-0 d-flex align-items-center justify-content-center">
                  <li className={`page-item  ${!pageInfo.has_pre && "disabled"}`}>
                    <Link
                    className="page-link border-0 text-gray-80"
                    to={`/products`}
                    onClick={() => handelPageChange(`${pageInfo.current_page - 1}`)}
                    >
                      <span className="material-symbols-outlined  d-flex align-items-center">
                        chevron_left
                      </span>
                    </Link>
                  </li>
                {
                  Array.from({ length: pageInfo.total_pages}).map((item, index) => (
                    <li className="page-item" key={index}>
                      <Link
                        className={`page-link border-0 text-gray-70 fs-md-9 fs-10 ${pageInfo.current_page === index + 1 && "active"}`}
                        to={`/products`}
                        onClick={() => handelPageChange(index + 1)}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  ))
                }
                  <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
                    <Link
                      className="page-link border-0 text-gray-70 fs-md-9 fs-10"
                      to={`/products`}
                      onClick={() => handelPageChange(`${pageInfo.current_page + 1}`)}
                    >
                      <span className="material-symbols-outlined  d-flex align-items-center">
                        chevron_right
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        < ScreenLoading isLoading={isScreenLoading} />
      </main>
    </>
  );
}

export default ProductsPage;