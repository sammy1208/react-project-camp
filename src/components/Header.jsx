import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { updateCartNum } from "../redux/slices/cartSlice";
import { useEffect } from "react";
import axios from "axios";

const routes = [
    { path: "/", name: "首頁" },
    { path: "/products", name: "產品分類" },
    { path: "/aboutUs", name: "關於青松" },
    { path: "/KnowledgePage", name: "知識專欄" },
    // { path: "/CartPage", name: "購物車" },
];

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

export default function Header() {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.carts)

  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch(updateCartNum(res.data.data))
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-10">
      <div className="container-fluid d-block">
        <div className="d-flex">
          {/* <!-- //logo --> */}
          <NavLink
          className="navbar-brand me-7"
          to={"/"}
          >
            <img
              src={`${PUBLIC_URL}/images/icons/Logo.png`}
              alt="logo"
              className="header-logo"
            />
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
                <form className="d-flex">
                  <button
                    className="btn px-4 py-0 d-flex align-items-center"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-white">
                      search
                    </span>
                  </button>
                </form>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link
                  to={`/CartPage`}
                  type="button"
                  className="btn position-relative px-4 py-0"
                >
                  <span className="material-symbols-outlined align-text-bottom text-white">
                    shopping_cart
                  </span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-primary-100">
                    {carts?.length}
                  </span>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <button type="button" className="btn position-relative p-0">
                  <Link href="test.html" type="button" className=" px-4 py-0">
                    <span className="material-symbols-outlined align-text-bottom text-white">
                      notifications
                    </span>
                  </Link>
                </button>
              </li>
            </ul>
          </div>

          {/* <!-- H5的開啟按鈕 --> */}
          <button 
          className="navbar-toggler border-0 px-4 py-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          >
              <span className="material-symbols-outlined text-white">menu</span>
          </button>
        </div>

        <div className="d-lg-none">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="" style={{ height: "100vh" }}>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-12">
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle text-white fw-bold fs-7 p-0"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    產品分類
                  </NavLink>
                  <ul
                    className="dropdown-menu bg-primary border-0 pt-0 pt-6"
                    aria-labelledby="navbarDropdown"
                  >
                    <li className="pb-2">
                      <a className="text-white py-4 ps-6" href="#">
                        Action
                      </a>
                    </li>
                    <li className="pb-2">
                      <a className="text-white py-4 ps-6" href="#">
                        Action
                      </a>
                    </li>
                    <li className="pb-2">
                      <a
                        className="dropdown-item text-white py-4 ps-6"
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                    <li className="pb-2">
                      <a
                        className="dropdown-item text-white py-4 ps-6"
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                    <li className="pb-2">
                      <a
                        className="dropdown-item text-white py-4 ps-6"
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item mt-12">
                  <NavLink
                    className="nav-link active text-white fw-bold fs-7 p-0"
                    aria-current="page"
                    to={`/aboutUs`}
                  >
                    關於青松
                  </NavLink>
                </li>
                <li className="nav-item mt-12">
                <NavLink
                    className="nav-link active text-white fw-bold fs-7 p-0"
                    aria-current="page"
                    to={`/KnowledgePage`}
                  >
                    知識專欄
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  }
  

