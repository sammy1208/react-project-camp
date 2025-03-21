import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Banner from "../components/Banner";
import AutoScrollToTop from "../components/AutoScrollToTop";
import Header from "../components/header";

const routes = [
  { path: "/Products", name: "產品分類" },
  { path: "/aboutUs", name: "關於青松" },
  { path: "/KnowledgePage", name: "知識專欄" }
];

export default function FrontLayout() {
  const location = useLocation();
  const path = location.pathname;
  const { bannerStyles } = useSelector((state) => state.siteContent);
  const [bannerProps, setBannerProps] = useState(null);

  const primaryBgRoutes = [
    "/CartPage",
    "/KnowledgePage",
    "/Products/",
    "/Checkout-Form",
    "/Wish",
    "/Order/",
    "/PayOrder/"
  ];

  const isPrimaryBg = primaryBgRoutes.some((route) => path.includes(route));
  const layoutClass = isPrimaryBg ? "bg-primary" : "";

  useEffect(() => {
    if (path === "/") {
      setBannerProps(bannerStyles.home);
    } else if (path === "/Products") {
      setBannerProps(bannerStyles.products);
    } else if (path === "/aboutUs") {
      setBannerProps(bannerStyles.aboutUs);
    } else {
      setBannerProps(bannerStyles.default);
    }
  }, [path]);

  return (
    <>
      <AutoScrollToTop />
      <Header className={layoutClass} routes={routes} />
      <Banner {...bannerProps} className={layoutClass} />
      <Outlet />
      <Footer />
      <Toast />
    </>
  );
}
