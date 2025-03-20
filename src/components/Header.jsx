import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCart } from "../redux/slices/apiSlice";
import { Collapse } from "bootstrap";

const routes = [
  { path: "/Products", name: "產品分類" },
  { path: "/aboutUs", name: "關於青松" },
  { path: "/KnowledgePage", name: "知識專欄" }
];

export default function Header({ className }) {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const wishList = useSelector((state) => state.wish.list);
  const [isScrolled, setIsScrolled] = useState(false);
  const productListRef = useRef(null);
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
    nav03: false
  });

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    handleScrollRef.current = () => {
      if (window.scrollY > 560) {
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
      setIsCollapseOpen((prev) => ({
        ...prev,
        navbar: false
      }));
    }
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
                {/* <li className="nav-item d-flex align-items-center">
                  <form className="d-flex">
                    <button
                      className="btn px-4 py-0 d-flex align-items-center border-0"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-white">
                        search
                      </span>
                    </button>
                  </form>
                </li> */}
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
              <div className="" style={{ height: "100vh" }}>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-12">
                  {/* <li className="nav-item dropdown">
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
                      className="dropdown-menu bg-primary border-0 pt-0 pt-6 list-unstyled text-white"
                      aria-labelledby="navbarDropdown"
                    >
                      <li className="mb-4">
                        <button
                          type="button"
                          className={`btn-nav btn py-4 px-0 w-100 border-0 fw-normal text-start text-white`}
                          // onClick={() => handleFilterChange("new")}
                        >
                          新品報到
                        </button>
                      </li>
                      <li className="mb-4">
                        <button
                          type="button"
                          className={`btn-nav btn py-4 px-0 w-100 border-0 fw-normal text-start text-white`}
                          // onClick={() => handleFilterChange("top")}
                        >
                          冠軍排名
                        </button>
                      </li>
                      <li className="mb-4">
                        <div
                          onClick={() => toggleCollapse("nav01", navRef01)}
                          className="py-4 add-icon w-100 p-0 fw-normal rounded-0"
                          aria-expanded={isCollapseOpen.nav01}
                        >
                          限時搶購
                        </div>
                        <div ref={navRef01} className="collapse" id="nav01">
                          <button
                            type="button"
                            className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o text-white`}
                            // onClick={() => handleFilterChange("lowPrice")}
                          >
                            冬眠季應援團·全面 85 折
                          </button>
                          <button
                            type="button"
                            className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o`}
                            // onClick={() => handleFilterChange("highPrice")}
                          >
                            周年慶·滿千折百
                          </button>
                        </div>
                      </li>
                      <li className="mb-4">
                        <div
                          onClick={() => toggleCollapse("nav02", navRef02)}
                          className="py-4 add-icon w-100 p-0 fw-normal rounded-0"
                          aria-expanded={isCollapseOpen.nav02}
                        >
                          青松｜帳篷系列
                        </div>
                        <div ref={navRef02} className="collapse" id="nav02">
                          <button
                            type="button"
                            className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o text-white`}
                            // onClick={() => handleFilterChange("tent")}
                          >
                            帳篷系列
                          </button>
                        </div>
                      </li>
                      <li className="mb-4">
                        <div
                          onClick={() => toggleCollapse("nav03", navRef03)}
                          className="py-4 add-icon w-100 p-0 fw-normal rounded-0"
                          aria-expanded={isCollapseOpen.nav03}
                        >
                          青松｜環保系列
                        </div>
                        <div ref={navRef03} className="collapse" id="nav03">
                          <button
                            type="button"
                            className={`btn-nav btn fs-10 text-gray-70 pt-0 pb-2 fw-normal px-0 text-start border-o text-white`}
                            // onClick={() => handleFilterChange("outdoor")}
                          >
                            戶外用品
                          </button>
                        </div>
                      </li>
                    </ul>

                  </li> */}
                  <li className="nav-item mt-12">
                    <NavLink
                      className="nav-link active text-white fw-bold fs-7 p-0"
                      aria-current="page"
                      to={`/Products`}
                      onClick={closeNavbar}
                    >
                      產品分類
                    </NavLink>
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
                  <li className="nav-item mt-12">
                    <NavLink
                      className="nav-link active text-white fw-bold fs-7 p-0"
                      aria-current="page"
                      to={`/KnowledgePage`}
                      onClick={closeNavbar}
                    >
                      知識專欄
                    </NavLink>
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
