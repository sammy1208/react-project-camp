import React from "react";
import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";
import AutoScrollToTop from "../components/AutoScrollToTop";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import FooterAdmin from "../components/admin/FooterAdmin";
const routes = [
  { path: "/admin/productList", name: "後台產品列表" },
  { path: "/admin/order", name: "後台訂單列表" },
  { path: "/admin/coupon", name: "後台優惠卷列表" }
];

export default function AdminLayout() {
  return (
    <>
      <AutoScrollToTop/>
      <HeaderAdmin routes={routes}/>
      <Outlet/>
      <FooterAdmin/>
      <Toast/>
    </>
  );
}
