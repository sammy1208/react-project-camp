import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import ProductLmg from "../components/ProductLmg";
import { Link, useLocation } from "react-router-dom";
import ScreenLoading from "../components/ScreenLoading";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import "swiper/css";
import Header from "../components/header";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const designerList = [
  {
    title: "IF 設計大獎得主",
    name: "Angel Li",
    type: "戶外產品設計師",
    description:
      "專注於戶外用品設計，將功能性與美感結合，作品以高效實用的特質廣受讚譽。她的設計靈感來自自然環境，致力於提升露營體驗。",
    image_pc: "./images/designer/Designer-01.png",
    image_mobile: "./images/designer/Designer-H501.png"
  },
  {
    title: "帳篷界的魔術師",
    name: "Kevin Wang",
    type: "戶外裝備設計師",
    description:
      "擅長設計創新的帳篷結構，曾獲多項專利。他的作品兼具輕量化與穩固性，適合各種極端環境，深受戶外探險家的喜愛。",
    image_pc: "./images/designer/Designer-02.png",
    image_mobile: "./images/designer/Designer-H502.png"
  },
  {
    title: "紅點設計大獎得主",
    name: "Shania Chen",
    type: "工業設計師",
    description:
      "擁有十多年工業設計經驗，以優雅簡約的線條聞名。她的戶外炊具設計以人體工學為核心，為露營者帶來美感與實用兼備的產品。",
    image_pc: "./images/designer/Designer-03.png",
    image_mobile: "./images/designer/Designer-H503.png"
  },
  {
    title: "戶外收納達人",
    name: "Michael Yang",
    type: "戶外收納達人",
    description:
      "專注於露營收納產品設計，解決行李空間問題。他設計的多功能收納袋獲得業界高度評價，將收納效率提升至新高度。",
    image_pc: "./images/designer/Designer-04.png",
    image_mobile: "./images/designer/Designer-H504.png"
  },
  {
    title: "綠色設計獎得主",
    name: "Joanna Lin",
    type: "永續設計師",
    description:
      "專注於環保材質的應用，倡導「愛自然，愛旅行」理念。她的產品強調可回收、可重複使用，深受重視環保的露營族群喜愛。",
    image_pc: "./images/designer/Designer-05.png",
    image_mobile: "./images/designer/Designer-05.png"
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
    image_url_03: "/images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow3.png"
  },
  {
    title: "簡易炊具組",
    name: "輕巧便攜，包含鍋、碗、湯勺等露營必備餐具，",
    type: "耐高溫易清潔，適合戶外煮食，讓野餐變得輕鬆又愉快！",
    image_url: "/images/camp/簡易炊具組/Img.png",
    image_url_01: "/images/camp/簡易炊具組/Img-1.png",
    image_url_02: "/images/camp/簡易炊具組/Img-2.png",
    image_url_03: "/images/camp/簡易炊具組/Img-3.png"
  }
];

const Knowledge = [
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
    path: "/KnowledgePage/cookware",
    name: "環保炊具",
    title: "環保炊具：露營料理的新選擇",
    content:
      "露營時，享受美食是不可或缺的一部分。然而，傳統的炊具與料理方式往往會對環境造成影響，例如一次性燃料罐的浪費、過度使用木材生火、以及難以回收的鋁箔包裝等。因此，選擇環保炊具成為現代露營者的新趨勢。透過使用節能爐具、可重複使用的餐具，以及環保燃料，我們可以在享受美味料理的同時，也為地球盡一份心力。",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1680788452823-49bb63651490?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    path: "/KnowledgePage/outdoor",
    name: "永續戶外",
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


export default function HomePage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  
  const [products, setProducts] = useState([]);

  const [products1, setProducts1] = useState([]);
  const [products6, setProducts6] = useState([]);
  const [carouselData, setCarouselData] = useState([
    {
     id: 1,
     image: "https://s3-alpha-sig.figma.com/img/8835/5c8c/752ea4219d9204491205321901ad1dfc?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BZTGzuHW25OwlkJDw7hDod7k4~NizHb~Sl~GXGFYB9gvDyXoK4z1yCuFzfD65~WhKGOyxmujCvPFJy9eg4VpR2A6y4qjsijNzQhCikkNTEf9dsFPnfwbAiMGs7E4apMwRNWlbDiuzAh8BvwwyPfx2gPRququf29aLVbDIwTi8zqW9hgtc~KbYCxzRC3X9Le6~Xz5CDY~piICinx4r3MpiygdPqokf1ZFLEGpoiAdjIKh8kiZJ4RVjfI2xheafKyrF2RG1I-iX1K1Gt7mKC1WJWo-yNPCm~H7I3POO9JapiOYIoJE~NAfYdsfH~kpivNOl8o5skGAOhMx9cVdU4ylyA__",
     title:"單人露營組",
     description: "一人成家",
    },
    {
     id: 2,
     image: "https://s3-alpha-sig.figma.com/img/aa15/6217/fd9acf662d45ea43cedd23360970669c?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oil7rBvGmy~3p4DK9~fAOHBajhZvz8NZqms9BmNE6qH4MCymRpRymlYzbockag2jidbjxzLUN4h5arkkfRiXU2o3nqE99yC5Hl9EeFOgydRSBLEjyU2jZyJPdvkgUI8rg1FirFUdEMmWunW8IAOpFrYhIgdjE~5SYUE1r1WqjeQsIkvanXhKCdQyMAdvGHs7X~KeoTTpw4SwLW~B4y8nJvVPFn-P~NcK9KNFsbyDZl9eSb6xsqTXS9Ike9Yp5hKZb1Ie9YlWsJCDxqckI4nvAanmcd-GKrz9O4JoC-E7tKBlks7AfoO0W8J4t6gP-XNraYuBEhLeHSn0BP8sdwVV4w__",
     title:"野炊鍋具組",
     description: "食盡山水",
    },
    {
     id: 3,
     image: "https://s3-alpha-sig.figma.com/img/a308/edc3/e1dba6ebc7129d5878b2a9a3721b0dee?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ah71e8v0SQZv9mA3BMH1N4Qp8BMYIP8sAEkpP9rZdyjyovBPU4IsI8tz4Y-Pqtyfe0qK~snIoHa5ypNTPUFN2MVXDGnW20TeL5rosW6nbHVElZP~3qHF9oJ1UmDDemnYO2nMS3VeSI5n2qn2HsbNSErK6xn9JHSsTMvGEdZNXGFoKpkFh0IaEAcPdCR0wT2VqHJ7nL8Pg0rMuuiScPwFvhL8pADIRhu1E-O6Hy7GijySlCDlIEsAGlDsd~gqITqZDTzz4FFED8DRowWHBH-lRGaTutIr~jsJOP-ozSIT3iFhF5Z0Fyrzc9b10WbkM8qpuv5f9HRAnyteNUcebni2FA__",
     title:"質感手提燈",
     description: "引領夜空",
    },
   ])

  const getProduct = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
      setProducts(res.data.products);
      setProducts1(res.data.products[0]);
      setProducts6(res.data.products[6]);
      console.log(res.data.products);
    } catch (error) {
      alert("取得產品失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    console.log(products);
  }, []);

  return (
    <>
      {/* <Swiper
        modules={[Navigation]}
        navigation       
      >
        {carouselData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="banner" style={{backgroundImage:`url(${item.image})`}}>
            < Header />
              <div className="d-flex flex-column h-100 justify-content-center">
                <div className="container text-white text-center">
                  <h1 className="fw-bold fs-1 mb-md-13">{item.title}<br/>{item.description}</h1>
                  <a className="btn btn-primary text-white fw-bold py-md-8 px-md-18" href="#" role="button">立即選購</a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}




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
                  <ProductLmg
                    img={`${PUBLIC_URL}${productDisplay[0].image_url}`}
                    product={productDisplay[0].title}
                  />
                </div>
                <div className="col">
                  <div className="row gx-md-10 gx-6">
                    <div className="col">
                      <ProductLmg
                        img={`${PUBLIC_URL}${productDisplay[0].image_url_01}`}
                        product={productDisplay[0].title}
                      />
                    </div>
                    <div className="col">
                      <ProductLmg
                        img={`${PUBLIC_URL}${productDisplay[0].image_url_02}`}
                        product={productDisplay[0].title}
                      />
                    </div>
                    <div className="col">
                      <ProductLmg
                        img={`${PUBLIC_URL}${productDisplay[0].image_url_03}`}
                        product={productDisplay[0].title}
                      />
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
                <ProductLmg
                  img={`${PUBLIC_URL}${productDisplay[1].image_url}`}
                  product={productDisplay[0].title}
                />
              </div>
              <div className="col">
                <div className="row gx-md-10 gx-6">
                  <div className="col">
                    <ProductLmg
                      img={`${PUBLIC_URL}${productDisplay[1].image_url_01}`}
                      product={productDisplay[0].title}
                    />
                  </div>
                  <div className="col">
                    <ProductLmg
                      img={`${PUBLIC_URL}${productDisplay[1].image_url_02}`}
                      product={productDisplay[0].title}
                    />
                  </div>
                  <div className="col">
                    <ProductLmg
                      img={`${PUBLIC_URL}${productDisplay[1].image_url_03}`}
                      product={productDisplay[0].title}
                    />
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
                        srcSet={designer.image_mobile}
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
          {Knowledge.map((know) => (
            <div className="col-md-3 mb-8 mb-md-0" key={know.path}>
              <div
                className="card mb-3 border-0 h-100 flex-row flex-md-column justify-content-between"
                key={know.title}
              >
                <div className="tips-img mb-md-8 mb-0 me-6 me-md-0">
                  <img
                    src={know.imageUrl}
                    className="rounded-4 h-100"
                    alt="..."
                  />
                </div>
                <div className="card-body p-0">
                  <p className="fs-10 pb-md-6 pb-2 text-gray-70">2024/12/01</p>
                  <p className="fs-9 fs-md-8 fw-bold pb-md-6 pb-5">
                    {know.title}
                  </p>
                  <div
                  className="d-none d-md-block">
                    <p className="text-overflow">{know.content}</p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      to={know.path}
                      className="fs-10 fw-bold text-primary pt-md-9 pt-0"
                    >
                      立即閱讀
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
