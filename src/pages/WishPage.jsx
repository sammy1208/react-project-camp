import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllProduct } from "../redux/slices/apiSlice";
import Product from "../components/Product";
import ScreenLoading from "../components/ScreenLoading";
import "swiper/css/navigation";
import "swiper/css";
import SectionTitle from '../components/SectionTitle';

export default function WishPage() {
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const wishList = useSelector((state) => state.wish.list);
  const { productsAll } = useSelector((state) => state.api); // 全部產品
  const swiperRef = useRef(null)

  useEffect(() => {
    setIsScreenLoading(true);
    dispatch(getAllProduct()).finally(() => setIsScreenLoading(false));
  }, []);

  const wishProduct = productsAll.filter((product) => wishList[product.id]);

  const handleNextSlide = () => {
    if (swiperRef.current.isEnd) {
      swiperRef.current.slideTo(0)
    } else {
      swiperRef.current.slideNext()
    }
  }

  const handlePrevSlide = () => {
    if (swiperRef.current.isBeginning) {
      swiperRef.current.slideTo(swiperRef.current.slides.length - 1)
    } else {
      swiperRef.current.slidePrev()
    }
  }

  return (
    <>
      <main className="container-default">
        <div className="container">
          <div className="pb-md-18">
            <SectionTitle subtitle="Wish List" title="收藏" subtitleColor="text-primary" titleColor=""/>
            {wishProduct?.length > 0 ? (
              <div className="row gy-10" style={{ alignItems: "stretch" }}>
                {wishProduct.map((product) => (
                  <div
                    className="col-md-4 col-6 d-flex flex-column"
                    key={product.id}
                  >
                    <Product product={product}/>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="text-center">
                  <img
                    src="./青松露營w.svg"
                    alt="logo"
                    style={{ height: "100px" }}
                  />
                  <h5 className="d-flex justify-content-center py-12 text-gray-80">
                    {`目前沒有收藏喔  >~<`}
                  </h5>
                </div>
              </>
            )}
          </div>
          <div className="d-none d-md-block">
            <SectionTitle subtitle="You May Also Like" title="猜你喜歡" subtitleColor="text-primary" titleColor=""/>
            <Swiper
              slidesPerView={4}
              spaceBetween={24}
              initialSlide={1}
              onSwiper={(swiper) =>
                swiperRef.current = swiper
              }
            >
              {productsAll.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className="swiper-slide flex-column"
                >
                  <div className="d-flex flex-column">
                    <Product product={product}/>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <ul className="pagination m-0 d-flex align-items-center justify-content-end text-gray-70">
              <li className="page-item">
                <button
                  type="button"
                  className={`btn border-0 fs-md-9 fs-10 page-hover py-8`}
                  onClick={() => handlePrevSlide()}
                >
                  <i className="bi bi-arrow-left d-flex align-items-center"></i>
                </button>
              </li>
              <li className={`page-item`}>
                <button
                  type="button"
                  className={`btn border-0 fs-md-9 fs-10 page-hover py-8`}
                  onClick={() => handleNextSlide()}
                >
                  <i className="bi bi-arrow-right d-flex align-items-center"></i>
                </button>
              </li>
            </ul>




          </div>
        </div>
      </main>

      <ScreenLoading isLoading={isScreenLoading}/>
    </>
  );
}
