import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductLmg from "../components/ProductLmg";
import ProductNav from "../components/ProductNav";
import ScreenLoading from "../components/ScreenLoading";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { PushMessage } from "../redux/slices/toastSlice";
import { updateCartNum } from "../redux/slices/cartSlice";
import { PushSelectedProduct } from "../redux/slices/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Collapse } from "bootstrap";
import { getAllProduct, getProductDetail, getCart, updataCart } from "../redux/slices/apiSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsDetailPage() {
  // const [product, setProduct] = useState({});
  // const [allProduct, setAllProduct] = useState([]);
  const [qtySelect, setQtySelect] = useState(1);
  const [isColorActive, setIsColorActive] = useState(null);
  const [isSpecsActive, setIsSpecsActive] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const dispatch = useDispatch();

  const { id: product_id } = useParams(); //因為有重新命名

  const Navigate = useNavigate();

  const { productsAll, productsDetail } = useSelector((state) => state.api) // 全部產品

  const currentSelection = useSelector(
    (state) => state.product.selectedProduct
  );

  useEffect(() => {
    // const getProduct = async () => {
    //   setIsScreenLoading(true);
    //   try {
    //     const res = await axios.get(
    //       `${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`
    //     );
    //     setProduct(res.data.product);
    //   } catch (error) {
    //     alert("取得產品失敗");
    //   } finally {
    //     setIsScreenLoading(false);
    //   }
    // };
    // getProduct();
    // getAllProducts();
    dispatch(getProductDetail(product_id))
    dispatch(getAllProduct())
    // getCart();
    dispatch(getCart())
    console.log(productsDetail.tag)
  }, []);

  // const getAllProducts = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}/v2/api/${API_PATH}/products/all`
  //     );
  //     setAllProduct(res.data.products);
  //   } catch (error) {
  //     alert("取得產品失敗");
  //   }
  // };

  // const getCart = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
  //     dispatch(updateCartNum(res.data.data));
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const updataCartItem = async (product_id, qty) => {
  //   setIsScreenLoading(true);
  //   try {
  //     await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
  //       data: {
  //         product_id,
  //         qty: Number(qty)
  //       }
  //     });
  //     dispatch(
  //       PushMessage({
  //         text: "加入購物車",
  //         status: "success"
  //       })
  //     );
  //     // getCart();
  //     dispatch(getCart())
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //     setIsScreenLoading(false);
  //   }
  // };

  const updataCartItem = (product_id, qty) => {
    const CartData = {
      product_id,
      qty
    }
    return dispatch(updataCart(CartData))
  }

  const handleQty = (qty) => {
    setQtySelect(qty);
  };

  const addCart = () => {
    if (isColorActive && isSpecsActive) {
      updataCartItem(product_id, qtySelect);
      // dispatch(
      //   PushSelectedProduct({
      //     id: product_id,
      //     color: isColorActive,
      //     specs: isSpecsActive
      //   })
      // );
    } else {
      dispatch(
        PushMessage({
          text: "請選擇顏色和規格",
          status: "failed"
        })
      );
    }
  };

  const goCart = () => {
    if (isColorActive && isSpecsActive) {
      updataCartItem(product_id, qtySelect);
      // dispatch(
      //   PushSelectedProduct({
      //     id: product_id,
      //     color: isColorActive,
      //     specs: isSpecsActive
      //   })
      // );
      Navigate("/CartPage");
    } else {
      dispatch(
        PushMessage({
          text: "請選擇顏色和規格",
          status: "failed"
        })
      );
    }
  };

  const [wishList, setWishList] = useState(() => {
    const initWishList = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : {};

    return initWishList;
  });

  const btnWishList = (e, product_id) => {
    e.stopPropagation();
    setWishList((prev) => {
      const newWishList = {
        ...prev,
        [product_id]: !wishList[product_id]
      };
      localStorage.setItem("wishList", JSON.stringify(newWishList));
      return newWishList;
    });
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

  return (
    <div className="container">
      <main className="pt-8 pb-14 pt-md-18 pb-md-23">
        <div className="pb-md-18">
          <ProductNav product={productsDetail} />

          <div className="row">
            <figure className="col-md-7 m-0">
              <div className="mb-md-10 mb-4">
                <ProductLmg img={productsDetail?.imageUrl} product={productsDetail} />
              </div>
              <div className="row gx-4 gx-md-10">
                {productsDetail?.imagesUrl?.length > 0 &&
                  productsDetail?.imagesUrl.map((img, index) => (
                    <div className="col" key={index}>
                      <ProductLmg img={img} product={productsDetail} />
                    </div>
                  ))}
              </div>
            </figure>

            <div className="col-md-5 pt-8 pt-md-0">
              <section className="border-bottom mb-9 mb-md-12">
                <h3 className="pb-md-4 pb-2 fs-7 fs-md-3">{productsDetail.title}</h3>
                <p className="pb-md-4 pb-2 text-gray-70">
                  {productsDetail.tag?.map((item, index) => (
                    <span key={index}>{item}{index !== productsDetail.tag?.length - 1 && "/"}</span>
                  ))}
                </p>
                <p className="text-primary pb-md-12 pb-9 fw-bold fs-8 fs-md-4">{`$${productsDetail.price}`}</p>
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
                        <p className="fs-7">{color}</p>
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
                        <p className="fs-7">{specs}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-block mb-9 mb-md-13">
                <p className="fs-md-9 fs-10 mb-md-6 mb-4">數量</p>
                <div>
                  <button
                    onClick={() => handleQty(qtySelect + 1)}
                    type="button"
                    className="btn p-0 btn-qty text-gray-50"
                  >
                    <span className="material-symbols-outlined">
                      add_circle
                    </span>
                  </button>
                  <span className="text-gray-70 px-8">{qtySelect}</span>
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
                </div>
              </div>

              <div className="list-unstyled d-flex">
                <button
                  onClick={goCart}
                  type="button"
                  className="btn btn-primary text-white fw-bold py-md-8 py-6 w-100 me-4"
                >
                  直接購買
                </button>
                <button
                  onClick={addCart}
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
                  // data-icon={isCollapseOpen.description ? "\e15b" : "\f3dd"}
                  type="button"
                  className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon"
                  // data-bs-toggle="collapse"
                  // href="#ProductDataPage-1"
                  // role="button"
                  // aria-expanded="false"
                  // aria-controls="collapseExample"
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
                  // data-icon={isCollapseOpen.description ? "\e15b" : "\f3dd"}
                  type="button"
                  className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon"
                  // data-bs-toggle="collapse"
                  // href="#ProductDataPage-2"
                  // role="button"
                  // aria-expanded="false"
                  // aria-controls="collapseExample"
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
                  // data-bs-toggle="collapse"
                  // href="#ProductDataPage-3"
                  // role="button"
                  // aria-expanded="false"
                  // aria-controls="collapseExample"
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
          <p className="text-primary text-center pb-md-2">Camping Tips</p>
          <h2 className="text-center pb-md-17">露營知識，不可不知</h2>
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
        </section>
      </main>
      <ScreenLoading isLoading={isScreenLoading} />
    </div>
  );
}
