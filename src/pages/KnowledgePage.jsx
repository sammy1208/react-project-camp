import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ScreenLoading from "../components/ScreenLoading";

const routes = [
  {
    path: "/KnowledgePage",
    name: "無痕露營",
    title: "無痕露營：減少廢棄物，愛護大自然",
    content:
      "隨著露營活動的興起，環境保護成為不可忽視的議題。許多露營區因為遊客的垃圾、一次性用品的使用，導致自然生態受損，甚至影響當地動植物的生存環境。",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1680788452823-49bb63651490?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    path: "/KnowledgePage/outdoor",
    name: "永續戶外",
    title: "環保炊具：露營料理的新選擇",
    content:
      "露營時，享受美食是不可或缺的一部分。然而，傳統的炊具與料理方式往往會對環境造成影響，例如一次性燃料罐的浪費、過度使用木材生火、以及難以回收的鋁箔包裝等。因此，選擇環保炊具成為現代露營者的新趨勢。透過使用節能爐具、可重複使用的餐具，以及環保燃料，我們可以在享受美味料理的同時，也為地球盡一份心力。",
    imageUrl:
      "https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    path: "/KnowledgePage/cookware",
    name: "環保炊具",
    title: "永續戶外：享受自然，同時保護地球",
    content:
      "戶外活動，如登山、露營、健行和攀岩，讓人們親近自然，享受戶外生活的美好。然而，隨著戶外活動的普及，環境問題也隨之而來，如垃圾污染、自然棲地破壞與碳排放增加。",
    imageUrl:
      "https://images.unsplash.com/photo-1707007730851-c53cc2879f00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    path: "/KnowledgePage/newbie",
    name: "新手露營指南",
    title: "新手必讀！如何選擇適合的露營帳篷",
    content:
      "露營是一項受到許多人喜愛的戶外活動，而選擇一個合適的露營帳篷則是成功露營的關鍵之一。無論是野外露營還是豪華露營，選擇帳篷時需要考慮多方面的因素，包括帳篷的尺寸、材質、設計、透氣性、防水性、安裝便利性等。新手在選擇帳篷時，最常遇到的挑戰是如何根據自己的需求和露營環境來做出正確的選擇。",
    imageUrl:
      "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export default function KnowledgePage() {
  const location = useLocation();
  console.log(location.pathname);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  return (
    <>
      <div className="container-lg">
        <main className="pt-8 pb-14 pt-md-18 pb-md-23">
          <div className="row">
            {/* 左側nav */}
            <div className="col-3 d-none d-md-block">
              <p className="fs-8 fw-bold mb-6">產品分類</p>
              <ul className="list-unstyled">
                {routes.map((routes) => (
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
