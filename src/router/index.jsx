import React from "react";
import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import AboutUsPage from "../pages/AboutUsPage";
import KnowledgePage from "../pages/KnowledgePage";
import NotFound from "../pages/NotFound";
import Knowledge_camping from "../components/Knowledge_camping";
import Knowledge_cookware from "../components/Knowledge_cookware";
import Knowledge_outdoor from "../components/Knowledge_outdoor";
import Knowledge_newbie from "../components/Knowledge_newbie";
import CheckoutFormPage from "../pages/CheckoutFormPage";
import WishPage from "../pages/WishPage";
import OrderPage from "../pages/OrderPage";
import ProductsDetailPage from "../pages/ProductsDetailPage";
import PayOrderPage from "../pages/PayOrderPage";
import LoginPage from "../pages/admin/LoginPage";
import ProductListPage from "../pages/admin/ProductListPage";
import OrderListPage from "../pages/admin/OrderListPage";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "Products",
        element: <ProductsPage />
      },
      {
        path: "aboutUs",
        element: <AboutUsPage />
      },
      {
        path: "CartPage",
        element: <CartPage />
      },
      {
        path: "KnowledgePage",
        element: <KnowledgePage />,
        children: [
          {
            path: "",
            element: <Knowledge_camping />
          },
          {
            path: "cookware",
            element: <Knowledge_cookware />
          },
          {
            path: "outdoor",
            element: <Knowledge_outdoor />
          },
          {
            path: "newbie",
            element: <Knowledge_newbie />
          }
        ]
      },
      {
        path: "Products/:id",
        element: <ProductsDetailPage />
      },
      {
        path: "Wish",
        element: <WishPage />
      },
      {
        path: "Checkout-Form",
        element: <CheckoutFormPage />
      },
      {
        path: "Order/:id",
        element: <OrderPage />
      },
      {
        path: "PayOrder/:id",
        element: <PayOrderPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <ProductListPage />
      },
      {
        path: "productList",
        element: <ProductListPage />
      },
      {
        path: "order",
        element: <OrderListPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
