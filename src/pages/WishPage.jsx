import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllProduct } from "../redux/slices/apiSlice";
import { Navigation } from "swiper/modules";
import Product from "../components/Product";
import ScreenLoading from "../components/ScreenLoading";
import "swiper/css/navigation";
import "swiper/css";

export default function WishPage() {
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const wishList = useSelector((state) => state.wish.list);
  const { productsAll } = useSelector((state) => state.api); // 全部產品

  useEffect(() => {
    setIsScreenLoading(true);
    dispatch(getAllProduct()).finally(() => setIsScreenLoading(false));
  }, []);

  const wishProduct = productsAll.filter((product) => wishList[product.id]);

  return (
    <>
      <main className="container-default">
        <div className="container">
          <div className="pb-md-18">
            <p className="text-center pb-md-2">Wish List</p>
            <h2 className="text-center pb-md-17 pb-12">收藏</h2>
            {wishProduct?.length > 0 ? (
              <div className="row gy-10" style={{ alignItems: "stretch" }}>
                {wishProduct.map((product) => (
                  <div
                    className="col-md-4 col-6 d-flex flex-column"
                    key={product.id}
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="text-center">
                  <img
                    src="./青松露營w.svg"
                    alt="logo"
                    style={{ height: "200px" }}
                  />
                  <h1 className="d-flex justify-content-center py-12 text-gray-80">
                    {`目前沒有收藏喔  >~<`}
                  </h1>
                </div>
              </>
            )}
          </div>
          <div className="d-none d-md-block">
            <p className="text-primary text-center pb-md-2">
              You May Also Like
            </p>
            <h2 className="text-center pb-md-17">猜你喜歡</h2>
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={4}
              spaceBetween={24}
              initialSlide={1}
            >
              {productsAll.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className="swiper-slide flex-column"
                >
                  <div className="d-flex flex-column">
                    <Product product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>

      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
