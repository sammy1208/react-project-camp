import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Product from "../components/Product";
import ProductLmg from "../components/ProductLmg";
import ScreenLoading from "../components/ScreenLoading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function HomePage() {
  const { designerList, productShow, Knowledge } = useSelector(
    (state) => state.siteContent
  );
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [products1, setProducts1] = useState(null);
  const [products6, setProducts6] = useState(null);

  const getProduct = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
      setProducts(res.data.products);
      setProducts1(res.data.products[0]);
      setProducts6(res.data.products[6]);
    } catch {
      alert("取得產品失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <section className="container container-index">
        <p className="text-primary text-center pb-md-2 fs-md-9 fs-10">
          Winter Series
        </p>
        <h2 className="text-center pb-md-17 pb-10 h4 fs-md-2">冬眠季大應援</h2>
        <div className="row">
          <div className="col d-none d-md-block">
            {products1 && <Product product={products1} />}
          </div>
          <div className="col">
            <div className="row row-cols-2 gy-md-10 gy-8">
              {products.slice(1, 5).map((product) => (
                <div className="col" key={product.id}>
                  <Product product={product} />
                </div>
              ))}

              <div className="col d-md-none d-block">
                {products6 && <Product product={products6} />}
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
                  {productShow[0].title}
                </h3>
                <p>{productShow[0].name}</p>
                <p className="pb-md-14 pb-8">{productShow[0].type}</p>
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
                    img={`${productShow[0].image_url}`}
                    product={productShow[0]}
                  />
                </div>
                <div className="col">
                  <div className="row gx-md-10 gx-6">
                    <div className="col">
                      <ProductLmg
                        img={`${productShow[0].image_url_01}`}
                        product={productShow[0]}
                      />
                    </div>
                    <div className="col">
                      <ProductLmg
                        img={`${productShow[0].image_url_02}`}
                        product={productShow[0]}
                      />
                    </div>
                    <div className="col">
                      <ProductLmg
                        img={`${productShow[0].image_url_03}`}
                        product={productShow[0]}
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
                  img={`${productShow[1].image_url}`}
                  product={productShow[0]}
                />
              </div>
              <div className="col">
                <div className="row gx-md-10 gx-6">
                  <div className="col">
                    <ProductLmg
                      img={`${productShow[1].image_url_01}`}
                      product={productShow[0]}
                    />
                  </div>
                  <div className="col">
                    <ProductLmg
                      img={`${productShow[1].image_url_02}`}
                      product={productShow[0]}
                    />
                  </div>
                  <div className="col">
                    <ProductLmg
                      img={`${productShow[1].image_url_03}`}
                      product={productShow[0]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center align-items-center">
            <div className="text-md-start text-center ms-md-21">
              <h3 className="pb-4 pb-md-8 pt-10 pt-md-0 fs-7 fs-md-3">
                {productShow[1].title}
              </h3>
              <p>{productShow[1].name}</p>
              <p className="pb-md-14 pb-8">{productShow[1].type}</p>
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
                        src={designer.image_pc}
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
                <div className="tips-img mb-md-8 mb-0 me-6 me-md-0 flex-shrink-0">
                  <img
                    src={know.imageUrl}
                    className="rounded-4 h-100"
                    alt={know.title}
                  />
                </div>
                <div className="card-body p-0 d-flex flex-column">
                  <p className="fs-10 pb-md-6 pb-2 text-gray-70">2024/12/01</p>
                  <p className="fs-9 fs-md-8 fw-bold pb-md-6 pb-5 tips-title">
                    {know.title}
                  </p>
                  <div className="d-none d-md-block">
                    <p className="tips-content">{know.content}</p>
                  </div>
                  <div className="mt-md-auto">
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
