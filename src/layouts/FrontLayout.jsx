import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function FrontLayout() {
  const location = useLocation();

  const layoutClass = location.pathname.includes("products")
    ? "bg-primary" // 產品頁面背景變淺色
    : location.pathname.includes("shoppcart")
    ? "bg-dark text-white" // 購物車頁面深色
    : "bg-default";

  return (
    <>
      <div className={layoutClass}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
