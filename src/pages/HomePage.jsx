import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Product from "../components/Product";
import ProductLmg from "../components/ProductLmg";
import { Link } from "react-router-dom";
import ScreenLoading from "../components/ScreenLoading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


const designerList = [
    {
      title: "IF 設計大獎得主",
      name: "Angel Li",
      type: "戶外產品設計師",
      description:
        "專注於戶外用品設計，將功能性與美感結合，作品以高效實用的特質廣受讚譽。她的設計靈感來自自然環境，致力於提升露營體驗。",
      image_pc: "/images/designer/Designer-01.png",
      image_mobile: "/images/designer/Designer-H501.png"
    },
    {
      title: "帳篷界的魔術師",
      name: "Kevin Wang",
      type: "戶外裝備設計師",
      description:
        "擅長設計創新的帳篷結構，曾獲多項專利。他的作品兼具輕量化與穩固性，適合各種極端環境，深受戶外探險家的喜愛。",
      image_pc: "/images/designer/Designer-02.png",
      image_mobile: "/images/designer/Designer-H502.png"
    },
    {
      title: "紅點設計大獎得主",
      name: "Shania Chen",
      type: "工業設計師",
      description:
        "擁有十多年工業設計經驗，以優雅簡約的線條聞名。她的戶外炊具設計以人體工學為核心，為露營者帶來美感與實用兼備的產品。",
      image_pc: "/images/designer/Designer-03.png",
      image_mobile: "/images/designer/Designer-H503.png"
    },
    {
      title: "戶外收納達人",
      name: "Michael Yang",
      type: "戶外收納達人",
      description:
        "專注於露營收納產品設計，解決行李空間問題。他設計的多功能收納袋獲得業界高度評價，將收納效率提升至新高度。",
      image_pc: "/images/designer/Designer-04.png",
      image_mobile: "/images/designer/Designer-H504.png"
    },
    {
      title: "綠色設計獎得主",
      name: "Joanna Lin",
      type: "永續設計師",
      description:
        "專注於環保材質的應用，倡導「愛自然，愛旅行」理念。她的產品強調可回收、可重複使用，深受重視環保的露營族群喜愛。",
      image_pc: "/images/designer/Designer-05.png",
      image_mobile: "/images/designer/Designer-05.png"
    }
  ];

const productDisplay = [
  {
    title: "印地安單峰帳",
    name: "輕量設計，簡易搭建，適合冒險者探索自然。",
    type: "提供可靠遮蔽，享受純粹的露營體驗。",
    image_url: "/images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow5.png",
    image_url_01: "/images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow1.png",
    image_url_02: "/images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow4.png",
    image_url_03: "/images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow3.png",
  },
  {
    title: "簡易炊具組",
    name: "輕巧便攜，包含鍋、碗、湯勺等露營必備餐具，",
    type: "耐高溫易清潔，適合戶外煮食，讓野餐變得輕鬆又愉快！",
    image_url: "/images/camp/簡易炊具組/Img.png",
    image_url_01: "/images/camp/簡易炊具組/Img-1.png",
    image_url_02: "/images/camp/簡易炊具組/Img-2.png",
    image_url_03: "/images/camp/簡易炊具組/Img-3.png",
  }
]
  
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

export default function HomePage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [products1, setProducts1] = useState([]);
  const [products6, setProducts6] = useState([]);

  const getProduct = async () =>{
    setIsScreenLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`)
      setProducts(res.data.products)
      setProducts1(res.data.products[0])
      setProducts6(res.data.products[6])
      console.log(res.data.products)
    } catch (error) {
      alert("取得產品失敗");
    } finally {
      setIsScreenLoading(false)
    }
  }

  useEffect(() => {
    getProduct();
    console.log(products)
  },[])

  return (
    <>
      <section className="container container-index">
        <p className="text-primary text-center pb-md-2 fs-md-9 fs-10">
          Winter Series
        </p>
        <h2 className="text-center pb-md-17 pb-10 h4 fs-md-2">冬眠季大應援</h2>
        <div className="row">
          <div className="col d-none d-md-block">

          <Product product={products1} />
            
          </div>
          <div className="col">
            <div className="row row-cols-2 gy-md-10 gy-8">
              {products.slice(1, 5).map((product) => (

              <div className="col" key={product.id}>
                <Product product={product} />
              </div>
              ))}

              <div className="col d-md-none d-block">
              <Product product={products6} />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center pt-md-17 pt-8">
        <Link
          className="btn btn-primary text-white fw-bold py-md-8 px-md-18 py-6 px-16"
          to={"/Products"}
          role="button"
        >
          立即選購
        </Link>
        </div>
      </section>

      <section className="container-index bg-gray-20">
        <div className="container">
          <p className="text-primary text-center pb-md-2 fs-md-9 fs-10">
            tents Series
          </p>
          <h2 className="text-center pb-md-17 pb-10 h4 fs-md-2">帳篷系列</h2>
          <div className="row g-0 d-flex flex-column-reverse flex-md-row">
            <div className="col-md d-flex justify-content-center align-items-center">
              <div className="text-md-end text-center me-md-21">
                <h3 className="pb-4 pb-md-8 pt-10 pt-md-0 fs-7 fs-md-3">
                  {productDisplay[0].title}
                </h3>
                <p>{productDisplay[0].name}</p>
                <p className="pb-md-14 pb-8">{productDisplay[0].type}</p>
                <Link
                className="btn btn-primary text-white fw-bold py-md-8 px-md-18 py-6 px-16"
                to={"/Products"}
                role="button"
                >
                  立即選購
                </Link>
              </div>
            </div>
            <div className="col-md">
              <div className="row row-cols-1 gy-md-10 gy-6">
                <div className="col">
                  < ProductLmg img={`${PUBLIC_URL}${productDisplay[0].image_url}`} product={productDisplay[0].title} />
                </div>
                <div className="col">
                  <div className="row gx-md-10 gx-6">
                    <div className="col">
                      < ProductLmg img={`${PUBLIC_URL}${productDisplay[0].image_url_01}`} product={productDisplay[0].title} />
                    </div>
                    <div className="col">
                      < ProductLmg img={`${PUBLIC_URL}${productDisplay[0].image_url_02}`} product={productDisplay[0].title} />
                    </div>
                    <div className="col">
                      < ProductLmg img={`${PUBLIC_URL}${productDisplay[0].image_url_03}`} product={productDisplay[0].title} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container container-index">
        <p className="text-primary text-center pb-md-2 fs-md-9 fs-10">
          Outdoor Series
        </p>
        <h2 className="text-center pb-md-17 pb-10 h4 fs-md-2">戶外用品系列</h2>
        <div className="row g-0 d-flex flex-column flex-md-row">
          <div className="col-md">
            <div className="row row-cols-1 gy-md-10 gy-6">
              <div className="col">
                < ProductLmg img={`${PUBLIC_URL}${productDisplay[1].image_url}`} product={productDisplay[0].title} />
              </div>
              <div className="col">
                <div className="row gx-md-10 gx-6">
                  <div className="col">
                    < ProductLmg img={`${PUBLIC_URL}${productDisplay[1].image_url_01}`} product={productDisplay[0].title} />
                  </div>
                  <div className="col">
                    < ProductLmg img={`${PUBLIC_URL}${productDisplay[1].image_url_02}`} product={productDisplay[0].title} />
                  </div>
                  <div className="col">
                    < ProductLmg img={`${PUBLIC_URL}${productDisplay[1].image_url_03}`} product={productDisplay[0].title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center align-items-center">
            <div className="text-md-start text-center ms-md-21">
              <h3 className="pb-4 pb-md-8 pt-10 pt-md-0 fs-7 fs-md-3">
              {productDisplay[1].title}
              </h3>
              <p>{productDisplay[1].name}</p>
              <p className="pb-md-14 pb-8">{productDisplay[1].type}</p>
              <Link
                className="btn btn-primary text-white fw-bold py-md-8 px-md-18 py-6 px-16"
                to={"/Products"}
                role="button"
              >
                立即選購
              </Link>
            </div>
          </div>
        </div>
      </section>

      <article className="container-index bg-primary">
        <div className="container">
          <p className="text-white text-center pb-md-2">CampEase design</p>
          <h2 className="text-white text-center pb-md-17 pb-12">
            青松嚴選，頂尖設計
          </h2>
          <div className="row justify-content-center">
            <div className="col-8">
              {designerList.map((designer, index) => (
                <div
                  className={`row mb-md-16 mb-12 d-flex flex-column-reverse flex-md-row ${
                    index % 2 === 0 ? "flex-md-row" : " flex-md-row-reverse"
                  }`}
                  key={designer.title}
                >
                  <div className="col-md-7">
                    <div className="text-white text-md-start text-center">
                      <span className="fs-md-10 pb-2 border-bottom">
                        {designer.title}
                      </span>
                      <p className="fs-md-8 fs-9 fw-bold py-4 py-md-6">
                        {`${designer.name}.${designer.type}`}
                      </p>
                      <p className="">{designer.description}</p>
                    </div>
                  </div>
                  <div className="col-md-5 mb-6 mb-md-0 text-center">
                    <picture>
                      <source
                        srcSet={`${PUBLIC_URL}${designer.image_mobile}`}
                        media="(max-width:767px)"
                      />
                      <img
                        src={`${PUBLIC_URL}${designer.image_pc}`}
                        alt={designer.title}
                        className="designer-img"
                      />
                    </picture>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="container container-index">
        <p className="text-primary text-center pb-md-2">Camping Tips</p>
        <h2 className="text-center pb-md-17 pb-10">露營知識，不可不知</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-8 mb-md-0"></div>
          <div className="col-md-3 mb-8 mb-md-0"></div>
          <div className="col-md-3 mb-8 mb-md-0"></div>
          <div className="col-md-3 mb-8 mb-md-0"></div>
        </div>
      </article>

      < ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
  