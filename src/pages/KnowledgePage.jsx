import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ScreenLoading from "../components/ScreenLoading";
import { useSelector } from "react-redux";

export default function KnowledgePage() {
  const { KnowledgeRoutes } = useSelector((state) => state.siteContent)
  const location = useLocation();
  const [isScreenLoading, setIsScreenLoading] = useState(false);

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
              <Outlet />
            </div>
          </div>
        </main>
        <ScreenLoading isLoading={isScreenLoading} />
      </div>
    </>
  );
}
