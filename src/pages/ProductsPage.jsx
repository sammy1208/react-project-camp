import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import ScreenLoading from "../components/ScreenLoading";
import ProductNav from "../components/ProductNav";
import { Collapse } from "bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsPage() {
  const [products, setProducts] = useState([]); // 當前頁面的產品
  const [productsAll, setProductsAll] = useState([]); // 全部產品
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState(1); // 當前頁數
  const [selectedFilter, setSelectedFilter] = useState([]); // 存儲當前篩選條件
  const [isActive, setIsActive] = useState(null);

  const itemsPerPage = 6;

  const getProducts = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setProductsAll(res.data.products);
      // setProducts(res.data.products);//為了在初始值時有全部商品
      setSelectedFilter(res.data.products);
      console.log(res.data.products);
    } catch (error) {
      alert("取得產品失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //篩選功能
  const applyFilter = (filter) => {
    let filteredProducts = [...productsAll];

    switch (filter) {
      case "new":
        filteredProducts = productsAll.filter(
          (product) => product.unit === "新"
        );
        break;
      case "top":
        filteredProducts = productsAll.filter(
          (product) => product.category === "帳篷" && product.price < 2000
        );
        break;
      case "lowPrice":
        filteredProducts = productsAll.filter(
          (product) => product.price < 2000
        );
        break;
      case "highPrice":
        filteredProducts = productsAll.filter(
          (product) => product.price > 2000
        );
        break;
      case "tent":
        filteredProducts = productsAll.filter(
          (product) => product.category === "帳篷"
        );
        break;
      case "outdoor":
        filteredProducts = productsAll.filter(
          (product) => product.category === "露營用品"
        );
        break;
      default:
        filteredProducts = productsAll;
        break;
    }

    setSelectedFilter(filteredProducts);
    setPageInfo(1);
  };

  const handleFilterChange = (filter) => {
    applyFilter(filter);
    setIsActive(filter);
  };

  //分頁功能

  const handlePageChange = (page) => {
    setPageInfo(page);
  };

  useEffect(() => {
    const startIndex = (pageInfo - 1) * itemsPerPage;
    const endIndex = pageInfo * itemsPerPage;
    setProducts(selectedFilter.slice(startIndex, endIndex));
  }, [pageInfo, selectedFilter]);

  const filterPage = Math.ceil(selectedFilter.length / itemsPerPage);
  const allPage = Math.ceil(productsAll.length / itemsPerPage);

    //側邊功能
    const navRef01 = useRef(null)
    const navRef02 = useRef(null)
    const navRef03 = useRef(null)
    const [isCollapseOpen, setIsCollapseOpen] = useState({
      nav01 : false,
      nav02 : false,
      nav03 : false,
    })

    const toggleCollapse = (key, ref) => {
      if (ref.current) {
        const bsCollapse = new Collapse(ref.current);
        bsCollapse.toggle();
        setIsCollapseOpen((prev) => ({
          ...prev,
          [key]: !prev[key]
        }))
      }
    }

  return (
    <>
      <div className="container-lg">
        <main className="pt-8 pb-14 pt-md-18 pb-md-23">
          <div className="row">
            {/* 左側nav */}
            <div className="col-3 d-none d-md-block">
              <p className="fs-8 fw-bold mb-6">產品分類</p>
              <ul className="list-unstyled">
                <li className="mb-4 border-bottom">
                  <button
                    type="button"
                    className={`btn-nav btn py-8 px-0 w-100 border-0 fw-normal text-start ${
                      isActive === "new" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("new")}
                  >
                    新品報到
                  </button>
                </li>
                <li className="mb-4 border-bottom ">
                  <button
                    type="button"
                    className={`btn-nav btn py-8 px-0 w-100 border-0 fw-normal text-start ${
                      isActive === "top" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("top")}
                  >
                    冠軍排名
                  </button>
                </li>
                <li className="mb-4 border-bottom">
                  <div
                    onClick={() => toggleCollapse("nav01", navRef01)}
                    className="py-8 add-icon w-100 p-0 fw-normal rounded-0"
                    // data-bs-toggle="collapse"
                    // data-bs-target="#ProductList-1"
                    aria-expanded={isCollapseOpen.nav01}
                  >
                    限時搶購
                  </div>
                  <div
                  ref={navRef01}
                  className="collapse" id="nav01">
                    <button
                      type="button"
                      className={`btn-nav btn fs-10 text-gray-70 pb-4 fw-normal px-0 text-start border-o ${
                        isActive === "lowPrice" ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange("lowPrice")}
                    >
                      冬眠季應援團·全面 85 折
                    </button>
                    <button
                      type="button"
                      className={`btn-nav btn fs-10 text-gray-70 pb-4 fw-normal px-0 text-start border-o ${
                        isActive === "highPrice" ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange("highPrice")}
                    >
                      周年慶·滿千折百
                    </button>
                  </div>
                </li>
                <li className="mb-4 border-bottom">
                  <div
                    onClick={() => toggleCollapse("nav02", navRef02)}
                    className="py-8 add-icon w-100 p-0 fw-normal rounded-0"
                    // data-bs-toggle="collapse"
                    // data-bs-target="#ProductList-2"
                    aria-expanded={isCollapseOpen.nav02}
                  >
                    青松｜帳篷系列
                  </div>
                  <div
                  ref={navRef02}
                  className="collapse" id="nav02">
                    <button
                      type="button"
                      className={`btn-nav btn fs-10 text-gray-70 pb-4 fw-normal px-0 text-start border-o ${
                        isActive === "tent" ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange("tent")}
                    >
                      帳篷系列
                    </button>
                  </div>
                </li>
                <li className="mb-4 border-bottom">
                  <div
                    onClick={() => toggleCollapse("nav03", navRef03)}
                    className="py-8 add-icon w-100 p-0 fw-normal rounded-0"
                    // data-bs-toggle="collapse"
                    // data-bs-target="#ProductList-3"
                    aria-expanded={isCollapseOpen.nav03}
                  >
                    青松｜環保系列
                  </div>
                  <div
                  ref={navRef03}
                  className="collapse" id="nav03">
                    <button
                      type="button"
                      className={`btn-nav btn fs-10 text-gray-70 pb-4 fw-normal px-0 text-start border-o ${
                        isActive === "outdoor" ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange("outdoor")}
                    >
                      戶外用品
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            {/* 右側產品列表 */}
            <div className="col">
              <ProductNav product={null} />

              <section className="pb-md-10 pb-8 border-bottom">
                <h5 className="mb-4 fs-md-5 fs-7">
                  經典設計，可靠守護你的露營時光
                </h5>
                <p className="fs-md-9 fs-10">
                  充氣帳篷以其快速搭建、輕便攜帶的特性，成為露營愛好者的新寵。無需繁瑣的支架安裝，僅需幾分鐘即可完成搭建，省時又省力。堅固的氣柱結構，具備卓越的抗風與穩定性，無論是家庭露營還是好友野營，都能提供安全舒適的居住空間。讓你專注享受大自然，而非繁瑣的搭帳過程。
                </p>
              </section>
              <p className="fs-10 text-gray-70 py-md-10 py-8">{`共 ${selectedFilter.length} 項商品`}</p>
              <div className="row gy-10" style={{alignItems : "stretch" }}>
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
                <ul className="pagination m-0 d-flex align-items-center justify-content-center text-gray-70">
                  <li className="page-item">
                    <button
                      type="button"
                      className={`btn border-0 fs-md-9 fs-10 page-hover py-8 ${
                        pageInfo === 1
                          ? "page-disabled"
                          : " fw-normal text-gray-70"
                      }`}
                      onClick={() => handlePageChange(pageInfo - 1)}
                    >
                      <i className="bi bi-arrow-left d-flex align-items-center"></i>
                    </button>
                  </li>
                  {Array.from({
                    length: selectedFilter.length > 0 ? filterPage : allPage
                  }).map((item, index) => (
                    <li className="page-item" key={index}>
                      <button
                        type="button"
                        className={`btn border-0 fs-md-9 fs-10 py-8 page-hover ${
                          pageInfo === index + 1
                            ? "page-active"
                            : "fw-normal text-gray-70"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item`}>
                    <button
                      type="button"
                      className={`btn border-0 fs-md-9 fs-10 page-hover py-8 ${
                        pageInfo ===
                        (selectedFilter.length > 0 ? filterPage : allPage)
                          ? "page-disabled"
                          : "fw-normal text-gray-70"
                      }`}
                      onClick={() => handlePageChange(pageInfo + 1)}
                    >
                      <i className="bi bi-arrow-right d-flex align-items-center"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </main>
        <ScreenLoading isLoading={isScreenLoading} />
      </div>
    </>
  );
}

export default ProductsPage;
