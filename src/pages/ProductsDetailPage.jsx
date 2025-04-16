import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { PushMessage } from "../redux/slices/toastSlice";
import { wishMessage } from "../redux/slices/wishSlice";
import {
  getAllProduct,
  getProductDetail,
  getCart,
  updataCart
} from "../redux/slices/apiSlice";
import { PushSelectedProduct } from "../redux/slices/productSlice";
import { Collapse } from "bootstrap";
import ProductLmg from "../components/ProductLmg";
import ProductNav from "../components/ProductNav";
import ScreenLoading from "../components/ScreenLoading";
import Product from "../components/Product";
import "swiper/css/navigation";
import "swiper/css";

export default function ProductsDetailPage() {
  const [qtySelect, setQtySelect] = useState(1);
  const [isColorActive, setIsColorActive] = useState(null);
  const [isSpecsActive, setIsSpecsActive] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const wishList = useSelector((state) => state.wish.list);
  const dispatch = useDispatch();
  const { id: product_id } = useParams(); //因為有重新命名
  const Navigate = useNavigate();
  const { productsAll, productsDetail } = useSelector((state) => state.api); // 全部產品
  const swiperRef = useRef(null);

  useEffect(() => {
    setIsScreenLoading(true);
    dispatch(getProductDetail(product_id));
    dispatch(getAllProduct());
    dispatch(getCart()).finally(() => setIsScreenLoading(false));
  }, [product_id]);

  const addItemToCart = async (product_id, qty) => {
    const CartData = {
      product_id,
      qty
    };
    setIsScreenLoading(true);
    try {
      return await dispatch(updataCart(CartData)).unwrap();
    } catch (error) {
      dispatch(PushMessage({ text: "新增購物車失敗", status: "failed" }));
      throw error;
    } finally {
      setIsScreenLoading(false);
    }
  };

  const handleQty = (qty) => {
    setQtySelect(qty);
  };

  const handleAddToCart = async () => {
    if (isColorActive && isSpecsActive) {
      try {
        await addItemToCart(product_id, qtySelect);
        dispatch(PushMessage({ text: "成功加入購物車！", status: "success" }));
      } catch {
        dispatch(PushMessage({ text: "新增購物車失敗", status: "failed" }));
      }

      dispatch(
        PushSelectedProduct({
          id: product_id,
          color: isColorActive,
          specs: isSpecsActive
        })
      );
    } else {
      dispatch(
        PushMessage({
          text: "請選擇顏色和規格",
          status: "failed"
        })
      );
    }
  };

  const handleBuyNow = async () => {
    if (isColorActive && isSpecsActive) {
      try {
        await addItemToCart(product_id, qtySelect);
        dispatch(PushMessage({ text: "成功加入購物車！", status: "success" }));
        dispatch(
          PushSelectedProduct({
            id: product_id,
            color: isColorActive,
            specs: isSpecsActive
          })
        );
        Navigate("/CartPage");
      } catch {
        dispatch(PushMessage({ text: "新增購物車失敗", status: "failed" }));
      }
    } else {
      dispatch(
        PushMessage({
          text: "請選擇顏色和規格",
          status: "failed"
        })
      );
    }
  };

  const btnWishList = (e, product_id) => {
    e.stopPropagation();
    dispatch(wishMessage(product_id));
  };

  const btnColorActive = (item) => {
    setIsColorActive(item);
  };

  const btnSpecsActive = (item) => {
    setIsSpecsActive(item);
  };

  const descriptionRef = useRef(null);
  const cautionRef = useRef(null);
  const specsRef = useRef(null);
  const [isCollapseOpen, setIsCollapseOpen] = useState({
    description: false,
    caution: false,
    specs: false
  });

  const toggleCollapse = (key, ref) => {
    if (ref.current) {
      const bsCollapse = new Collapse(ref.current);
      bsCollapse.toggle();
      setIsCollapseOpen((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current.isEnd) {
      swiperRef.current.slideTo(0);
    } else {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current.isBeginning) {
      swiperRef.current.slideTo(swiperRef.current.slides.length - 1);
    } else {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="container">
      <main className="container-default">
        <div className="pb-md-18">
          <ProductNav product={productsDetail} />

          <div className="row">
            <figure className="col-md-7 m-0">
              <div className="mb-md-10 mb-4">
                {productsDetail?.imageUrl && (
                  <ProductLmg
                    img={productsDetail.imageUrl}
                    product={productsDetail}
                  />
                )}
              </div>
              <div className="row gx-4 gx-md-10">
                {productsDetail?.imagesUrl?.length > 0 &&
                  productsDetail?.imagesUrl.map(
                    (img, index) =>
                      img && (
                        <div className="col" key={index}>
                          <ProductLmg img={img} product={productsDetail} />
                        </div>
                      )
                  )}
              </div>
            </figure>

            <div className="col-md-5 pt-8 pt-md-0">
              <section className="border-bottom mb-9 mb-md-12">
                <h3 className="pb-md-4 pb-2 fs-7 fs-md-3">
                  {productsDetail.title}
                </h3>
                <p className="pb-md-4 pb-2 text-gray-70">
                  {productsDetail.tag?.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index !== productsDetail.tag?.length - 1 && "/"}
                    </span>
                  ))}
                </p>
                <p className="text-primary pb-md-12 pb-9 fw-bold fs-8 fs-md-4">{`$${productsDetail.price?.toLocaleString(
                  "zh-Hant-TW"
                )}`}</p>
              </section>

              <div className="mb-6 mb-md-10">
                <p className="fs-md-9 fs-10 mb-md-6 mb-4">顏色</p>
                <ul className="list-unstyled d-flex m-0 flex-wrap">
                  {productsDetail.colors?.map((color, index) => (
                    <li className="me-lg-5 me-3 mb-lg-3 mb-1" key={index}>
                      <button
                        onClick={() => btnColorActive(color)}
                        type="button"
                        className={`btn btn-outline-secondary btn-detail py-4 px-6 border-gray-40 fw-normal ${
                          isColorActive === color && "active"
                        }`}
                      >
                        <p>{color}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6 mb-md-10">
                <p className="fs-md-9 fs-10 mb-md-6 mb-4">規格</p>
                <ul className="list-unstyled d-flex m-0 flex-wrap">
                  {productsDetail.specs?.map((specs, index) => (
                    <li className="me-lg-5 me-3 mb-lg-3 mb-1" key={index}>
                      <button
                        onClick={() => btnSpecsActive(specs)}
                        key={index}
                        type="button"
                        className={`btn btn-outline-secondary btn-detail py-4 px-6 border-gray-40 fw-normal ${
                          isSpecsActive === specs && "active"
                        }`}
                      >
                        <p>{specs}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-block mb-9 mb-md-13">
                <p className="fs-md-9 fs-10 mb-md-6 mb-4">數量</p>
                <div>
                  <button
                    onClick={() => handleQty(qtySelect - 1)}
                    type="button"
                    className="btn p-0 btn-qty text-gray-50"
                    disabled={qtySelect === 1}
                  >
                    <span className="material-symbols-outlined">
                      do_not_disturb_on
                    </span>
                  </button>
                  <span className="text-gray-70 px-8">{qtySelect}</span>
                  <button
                    onClick={() => handleQty(qtySelect + 1)}
                    type="button"
                    className="btn p-0 btn-qty text-gray-50"
                  >
                    <span className="material-symbols-outlined">
                      add_circle
                    </span>
                  </button>
                </div>
              </div>

              <div className="list-unstyled d-flex">
                <button
                  onClick={handleBuyNow}
                  type="button"
                  className="btn btn-primary text-white fw-bold py-md-8 py-6 w-100 me-4"
                >
                  直接購買
                </button>
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="btn btn-outline-primary btn-addCart fw-bold py-md-8 py-6 w-100 me-4"
                >
                  加入購物車
                </button>
                <button
                  type="button"
                  onClick={(e) => btnWishList(e, productsDetail.id)}
                  className="btn btn-outline-primary btn-wish fw-bold py-md-8 py-6 d-flex justify-content-center align-items-center"
                  style={{ width: "51px" }}
                >
                  <i
                    className={`bi fs-9 ${
                      wishList[productsDetail.id] ? "bi-heart-fill" : "bi-heart"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-7 mt-md-13 mt-10">
            <div className="mb-md-12 mb-8">
              <p className="d-flex pb-md-6 pb-2">
                <button
                  onClick={() => toggleCollapse("description", descriptionRef)}
                  aria-expanded={isCollapseOpen.description}
                  type="button"
                  className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon"
                >
                  產品說明
                </button>
              </p>
              <div
                ref={descriptionRef}
                className="collapse"
                id="ProductDataPage-1"
              >
                <div className="pb-8 border-bottom">
                  {productsDetail.introduce?.map((item, index) => (
                    <p key={index}>{`·${item}`}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-md-12 mb-8">
              <p className="d-flex pb-md-6 pb-2">
                <button
                  onClick={() => toggleCollapse("caution", cautionRef)}
                  aria-expanded={isCollapseOpen.caution}
                  type="button"
                  className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon"
                >
                  注意事項
                </button>
              </p>
              <div ref={cautionRef} className="collapse" id="ProductDataPage-2">
                <div className="pb-8 border-bottom">
                  {productsDetail.caution?.map((item, index) => (
                    <p key={index}>{`·${item}`}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-md-12 mb-8">
              <p className="d-flex pb-md-6 pb-2">
                <button
                  onClick={() => toggleCollapse("specs", specsRef)}
                  aria-expanded={isCollapseOpen.specs}
                  type="button"
                  className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon"
                >
                  產品規格
                </button>
              </p>
              <div ref={specsRef} className="collapse" id="ProductDataPage-3">
                <div className="pb-8 border-bottom">
                  {productsDetail.specification?.map((item, index) => (
                    <p key={index}>{`·${item}`}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="d-none d-md-block">
          <p className="text-primary text-center pb-md-2">You May Also Like</p>
          <h2 className="text-center pb-md-17">猜你喜歡</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            initialSlide={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {productsAll.map((product) => (
              <SwiperSlide
                key={product.id}
                className="swiper-slide flex-column"
              >
                <div
                  onClick={() => Navigate(`/Products/${product.id}`)}
                  className="d-flex flex-column"
                  style={{ cursor: "pointer" }}
                >
                  <Product product={product} />
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
        </section>
      </main>
      <ScreenLoading isLoading={isScreenLoading} />
    </div>
  );
}
