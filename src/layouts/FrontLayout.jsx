import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import "swiper/css/navigation";
import "swiper/css";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import AutoScrollToTop from "../components/AutoScrollToTop";
import { useSelector } from "react-redux";

export default function FrontLayout() {
  const { bannerStyles } = useSelector((state) => state.siteContent);
  const [bannerProps, setBannerProps] = useState(null);
  const location = useLocation();
  const path = location.pathname;

  const primaryBgRoutes = ["/CartPage", "/KnowledgePage", "/Products/", "/Checkout-Form", "/Wish", "/Order/", "/PayOrder/"];

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
      <Banner {...bannerProps} className={layoutClass} />
      <Outlet />
      <Footer />
      <Toast />
    </>
  );
}
