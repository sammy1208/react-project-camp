import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getCart } from "../redux/slices/apiSlice";
import { Collapse } from "bootstrap";
export default function Header({ className, routes }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const wishList = useSelector((state) => state.wish.list);
  const [isScrolled, setIsScrolled] = useState(false);
  const productListRef = useRef(null);
  const KnowledgeRef = useRef(null);
  const handleScrollRef = useRef(null);
  const navbarRef = useRef(null);
  const navRef01 = useRef(null);
  const navRef02 = useRef(null);
  const navRef03 = useRef(null);
  const [isCollapseOpen, setIsCollapseOpen] = useState({
    productList: false,
    navbar: false,
    nav01: false,
    nav02: false,
    nav03: false,
    Knowledge: false
  });
  const { Knowledge } = useSelector((state) => state.siteContent);
  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    handleScrollRef.current = () => {
      if (window.scrollY > 240) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScrollRef.current);

    return () => {
      window.removeEventListener("scroll", handleScrollRef.current);
    };
  }, []);

  const toggleCollapse = (key, ref) => {
    if (ref.current) {
      const bsCollapse = new Collapse(ref.current);
      bsCollapse.toggle();

      const isOpening = !isCollapseOpen[key];
      if (key === "navbar") {
        document.body.style.overflow = isOpening ? "hidden" : "";
        document.body.style.paddingRight = isOpening ? "0px" : "";
      }

      setIsCollapseOpen((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const closeNavbar = () => {
    if (navbarRef.current && isCollapseOpen.navbar) {
      const bsCollapse = new Collapse(navbarRef.current);
      bsCollapse.hide();
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      setIsCollapseOpen((prev) => {
        return {
          ...prev,
          productList: false,
          navbar: false
        };
      });
    }
  };

  const handleProduct = (filter) => {
    closeNavbar();
    Navigate(`/Products?filter=${filter}`);
  };

  const handleKnowledge = (path) => {
    closeNavbar();
    Navigate(path);
  };

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: "2",
        backgroundColor: isScrolled ? "#638C6D" : "transparent",
        transition: "background-color 0.3s ease"
      }}
      className={`${className} w-100`}
    >
      <div
        className={`navbar navbar-expand-lg navbar-dark py-md-10 py-6 ${
          isCollapseOpen.navbar ? "bg-primary" : ""
        }`}
        style={{ transition: "1s" }}
      >
        <div className="container-fluid d-block">
          <div className="d-flex">
            {/* <!-- //logo --> */}
            <NavLink
              className="navbar-brand me-7 logo p-0"
              to={"/"}
              onClick={closeNavbar}
            >
              <img src="./images/icons/Logo.png" alt="logo" />
            </NavLink>
            <div className="ms-auto d-flex">
              <ul className="list-unstyled d-lg-flex align-items-lg-center m-0 d-none pe-4">
                {routes.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <NavLink
                      className="nav-link text-white px-4"
                      to={item.path}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ul className="list-unstyled d-flex align-items-lg-center m-0">
                <li className="nav-item d-flex align-items-center">
                  <NavLink
                    to={"/Wish"}
                    onClick={closeNavbar}
                    className="nav-link px-4 py-0"
                  >
                    <i
                      className={`bi fs-9 text-white ${
                        Object.keys(wishList).length > 0
                          ? "bi-heart-fill"
                          : "bi-heart"
                      }`}
                    ></i>
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <NavLink
                    to={`/CartPage`}
                    onClick={closeNavbar}
                    className="nav-link position-relative px-4 py-0"
                  >
                    <span className="material-symbols-outlined align-text-bottom text-white">
                      shopping_cart
                    </span>
                    <span
                      className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-primary-100 ${
                        carts?.length === 0 && "d-none"
                      }`}
                    >
                      {carts?.length}
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* <!-- H5的開啟按鈕 --> */}
            <button
              onClick={() => toggleCollapse("navbar", navbarRef)}
              className="navbar-toggler border-0 px-4 py-0"
              type="button"
            >
              <span className="material-symbols-outlined text-white">menu</span>
            </button>
          </div>

          <div className="d-lg-none">
            <div
              ref={navbarRef}
              className="collapse navbar-collapse"
              id="navbar"
            >
              <div 
              style={{
                height: "100vh",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
              }}>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-12">
                  <li className="nav-item dropdown">
                    <div
                      onClick={() =>
                        toggleCollapse("productList", productListRef)
                      }
                      className="nav-link dropdown-toggle text-white fw-bold fs-7 p-0"
                      id="navbarDropdown"
                    >
                      產品分類
                    </div>

                    <ul
                      ref={productListRef}
                      id="productList"
                      className="dropdown-menu border-0 pt-0 pt-6 list-unstyled text-white"
                      style={{ backgroundColor: "rgba(0, 128, 0, 0)" }}
                      aria-labelledby="navbarDropdown"
                    >
                      <li className="mb-4">
                        <button
                          type="button"
                          className={`btn-nav btn py-4 px-0 w-100 border-0 fw-normal text-start text-white`}
                          onClick={() => handleProduct("new")}
                        >
                          新品報到
                        </button>
                      </li>
                      <li className="mb-4">
                        <button
                          type="button"
                          className={`btn-nav btn py-4 px-0 w-100 border-0 fw-normal text-start text-white`}
                          onClick={() => handleProduct("top")}
                        >
                          冠軍排名
                        </button>
                      </li>
                      <li className="mb-4">
                        <div
                          onClick={() => toggleCollapse("nav01", navRef01)}
                          className="py-4 add-icon-header w-100 p-0 fw-normal rounded-0"
                          aria-expanded={isCollapseOpen.nav01}
                        >
                          限時搶購
                        </div>
                        <div ref={navRef01} className="collapse" id="nav01">
                          <div className="d-flex flex-column">
                            <button
                              type="button"
                              className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-6 fw-normal px-0 text-start border-o text-white`}
                              onClick={() => handleProduct("lowPrice")}
                            >
                              冬眠季應援團·全面 85 折
                            </button>
                            <button
                              type="button"
                              className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o text-white`}
                              onClick={() => handleProduct("highPrice")}
                            >
                              周年慶·滿千折百
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-4">
                        <div
                          onClick={() => toggleCollapse("nav02", navRef02)}
                          className="py-4 add-icon-header w-100 p-0 fw-normal rounded-0"
                          aria-expanded={isCollapseOpen.nav02}
                        >
                          青松｜帳篷系列
                        </div>
                        <div ref={navRef02} className="collapse" id="nav02">
                          <button
                            type="button"
                            className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o text-white`}
                            onClick={() => handleProduct("tent")}
                          >
                            帳篷系列
                          </button>
                        </div>
                      </li>
                      <li className="mb-4">
                        <div
                          onClick={() => toggleCollapse("nav03", navRef03)}
                          className="py-4 add-icon-header w-100 p-0 fw-normal rounded-0"
                          aria-expanded={isCollapseOpen.nav03}
                        >
                          青松｜環保系列
                        </div>
                        <div ref={navRef03} className="collapse" id="nav03">
                          <button
                            type="button"
                            className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o text-white`}
                            onClick={() => handleProduct("outdoor")}
                          >
                            戶外用品
                          </button>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item mt-12">
                    <NavLink
                      className="nav-link active text-white fw-bold fs-7 p-0"
                      aria-current="page"
                      to={`/aboutUs`}
                      onClick={closeNavbar}
                    >
                      關於青松
                    </NavLink>
                  </li>
                  <li className="nav-item mt-12 dropdown">
                    <div
                      onClick={() => toggleCollapse("Knowledge", KnowledgeRef)}
                      className="nav-link dropdown-toggle text-white fw-bold fs-7 p-0"
                      id="navbarDropdown"
                    >
                      知識專欄
                    </div>

                    <ul
                      ref={KnowledgeRef}
                      id="Knowledge"
                      className="dropdown-menu border-0 pt-0 pt-6 list-unstyled text-white"
                      style={{ backgroundColor: "rgba(0, 128, 0, 0)" }}
                      aria-labelledby="navbarDropdown"
                    >
                      {Knowledge.map((item, index) => (
                        <li key={index} className="mb-4">
                          <button
                            type="button"
                            className={`btn-nav btn py-4 px-0 w-100 border-0 fw-normal text-start text-white`}
                            onClick={() => handleKnowledge(item.path)}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// **PropTypes 驗證**
Header.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
