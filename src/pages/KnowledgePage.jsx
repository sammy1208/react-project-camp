import React from 'react';
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ScreenLoading from "../components/ScreenLoading";
import { useSelector } from "react-redux";

export default function KnowledgePage() {
  const { KnowledgeRoutes } = useSelector((state) => state.siteContent)
  const location = useLocation();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [navTitle, setNavTitle] = useState(null)

  useEffect(() => {
    setIsScreenLoading(true)

    const time = setTimeout(() => {
      setIsScreenLoading(false)
    }, 300)
    changeTitle(location.pathname)
    return () => clearTimeout(time)
  }, [location.pathname])

  const changeTitle = (key) => {
    switch (key) {
      case "/KnowledgePage":
        setNavTitle("無痕露營")
        break;
      case "/KnowledgePage/outdoor":
        setNavTitle("永續戶外")
        break;
      case "/KnowledgePage/cookware":
        setNavTitle("環保炊具")
        break;
      case "/KnowledgePage/newbie":
        setNavTitle("新手露營指南")
        break;
      default:
        break;
    }
  }

  const handleChangeTitle = (key) => {
    switch (key) {
      case "無痕露營":
        setNavTitle("無痕露營")
        break;
      case "永續戶外":
        setNavTitle("永續戶外")
        break;
      case "環保炊具":
        setNavTitle("環保炊具")
        break;
      case "新手露營指南":
        setNavTitle("新手露營指南")
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="container-lg">
        <main className="container-default">
          <div className="row">
            {/* 左側nav */}
            <div className="col-3 d-none d-md-block">
              <p className="fs-8 fw-bold mb-6">知識分類</p>
              <ul className="list-unstyled">
                {KnowledgeRoutes.map((routes) => (
                  <li className="mb-4 border-bottom" key={routes.path}>
                    <Link
                      to={routes.path}
                      onClick={() => handleChangeTitle(routes.name)}
                      className={`btn-nav-know py-8 px-0 w-100 border-0 fw-normal text-start ${
                        location.pathname === routes.path ? "active" : ""
                      }`}
                    >
                      {routes.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* 右側文章 */}

            <div className="col">
              <nav aria-label="breadcrumb" className=" pb-4 pb-md-8">
                <ol className="breadcrumb fs-10 m-0 w-100">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>首頁</Link>
                  </li>
                  {
                  <li className="breadcrumb-item active" aria-current="page">
                    {navTitle}
                  </li>
                  }
                  {/* {location.pathname !== "/KnowledgePage" && product?.title && (
                    <li className="breadcrumb-item active" aria-current="page">
                      {product?.title}
                    </li>
                  )} */}
                </ol>
              </nav>
              <Outlet/>
            </div>
          </div>
        </main>
        <ScreenLoading isLoading={isScreenLoading}/>
      </div>
    </>
  );
}
