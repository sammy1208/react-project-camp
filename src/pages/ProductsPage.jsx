import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Product from "../components/Product";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [productsAll, setProductsAll] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      //   setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
        setProductsAll(res.data.products);
        setProducts(res.data.products);
        console.log(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
      } finally {
        // setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  // 新品報到
  const getNewProduct = () => {
    const newProduct = productsAll.filter((product) => {
      return product.unit === "新";
    });
    setProducts(newProduct);
  };
  //冠軍排名
  const getTopProduct = () => {
    const topProduct = productsAll.filter((product) => {
      return product.category === "帳篷";
    });
    setProducts(topProduct);
  };

  // 冬眠季應援團·全面 85 折
  const getLowPriceProduct = () => {
    const topProduct = productsAll.filter((product) => {
      return product.price < 2000;
    });
    setProducts(topProduct);
  };

  // 周年慶·滿千折百
  const getHighPriceProduct = () => {
    const topProduct = productsAll.filter((product) => {
      return product.price > 2000;
    });
    setProducts(topProduct);
  };

  // 帳篷
  const getTentProduct = () => {
    const topProduct = productsAll.filter((product) => {
      return product.category === "帳篷";
    });
    setProducts(topProduct);
  };

  // 戶外用品
  const getOutdoorProduct = () => {
    const topProduct = productsAll.filter((product) => {
      return product.category === "露營用品";
    });
    setProducts(topProduct);
  };

  return (
    <>
      <main className="container-lg">
        <div className="pt-8 pb-14 pt-md-18 pb-md-23">
          <div className="row">
            <div className="col-3 d-none d-md-block">
              <p className="fs-8 fw-bold mb-6">產品分類</p>
              <ul className="list-unstyled">
                <li className="mb-4 border-bottom">
                  <Link className="py-8 w-100" onClick={() => getNewProduct()}>
                    新品報到
                  </Link>
                </li>
                <li className="mb-4 border-bottom ">
                  <Link className="py-8 w-100" onClick={() => getTopProduct()}>
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
                      onClick={() => getLowPriceProduct()}
                    >
                      冬眠季應援團·全面 85 折
                    </Link>
                    <Link
                      className="fs-10 text-gray-70 pb-6"
                      onClick={() => getHighPriceProduct()}
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
                      onClick={() => getTentProduct()}
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
                      onClick={() => getOutdoorProduct()}
                    >
                      戶外用品
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col">
              <nav aria-label="breadcrumb" className=" pb-4 pb-md-8">
                <ol className="breadcrumb fs-10 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">首頁</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <a href="#">青松·帳篷系列</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="#">標準帳篷</a>
                  </li>
                </ol>
              </nav>
              <div className="pb-md-10 pb-8 border-bottom">
                <h5 className="mb-4 fs-md-5 fs-7">
                  經典設計，可靠守護你的露營時光
                </h5>
                <p className="fs-md-9 fs-10">
                  充氣帳篷以其快速搭建、輕便攜帶的特性，成為露營愛好者的新寵。無需繁瑣的支架安裝，僅需幾分鐘即可完成搭建，省時又省力。堅固的氣柱結構，具備卓越的抗風與穩定性，無論是家庭露營還是好友野營，都能提供安全舒適的居住空間。讓你專注享受大自然，而非繁瑣的搭帳過程。
                </p>
              </div>
              <p className="fs-10 text-gray-70 py-md-10 py-8">{`共 ${products.length} 項商品`}</p>
             {/* 共 5 項商品 */}

              <div className="row gy-10">
                {products.map((product) => (
                  <div className="col-md-4 col-6" key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>

              <nav
                aria-label="..."
                className="d-flex justify-content-md-center justify-content-center mt-16"
              >
                <ul className="pagination m-0 d-flex align-items-center justify-content-center">
                  <li className="page-item">
                    <a className="page-link border-0 text-gray-80">
                      <span className="material-symbols-outlined  d-flex align-items-center">
                        chevron_left
                      </span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 text-gray-70 fs-md-9 fs-10"
                      href="#"
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item" aria-current="page">
                    <a
                      className="page-link border-0 text-gray-70 fs-md-9 fs-10"
                      href="#"
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 text-gray-70 fs-md-9 fs-10"
                      href="#"
                    >
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 text-gray-70 fs-md-9 fs-10"
                      href="#"
                    >
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 text-gray-70 fs-md-9 fs-10"
                      href="#"
                    >
                      10
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link  border-0 text-gray-70 fs-md-9 fs-10"
                      href="#"
                    >
                      <span className="material-symbols-outlined  d-flex align-items-center">
                        chevron_right
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductsPage;
