import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProductLmg from "../components/ProductLmg";
import ProductNav from "../components/ProductNav";
import { Link, useLocation } from "react-router-dom";
import ScreenLoading from "../components/ScreenLoading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsDetailPageId () {
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [isColorActive, setIsColorActive ] = useState(null);
  const [isSpecsActive, setIsSpecsActive ] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const location = useLocation();

  const { id: product_id } = useParams();//因為有重新命名

  const Navigate = useNavigate()

    useEffect(() =>{
      const getProduct = async () => {
        setIsScreenLoading(true)
        try {
          const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`)
          setProduct(res.data.product)
          console.log(res.data.product)
        } catch (error) {
          alert("取得產品失敗")
        } finally {
          setIsScreenLoading(false);
        };
      }
      getProduct()
    },[])

    const updataCartItem = async (product_id, qty) => {
      setIsScreenLoading(true);
      try {
        await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
          data: {
            product_id,
            qty: Number(qty)
          }
        });
        alert(`加入購物車`);
      } catch (error) {
        alert(error);
      } finally {
        setIsScreenLoading(false);
      }
    };

    const handleQty = (qty) => {
      setQtySelect(qty)
    }

    const addCart = () => {
      updataCartItem(product_id, qtySelect)
    }

    const goCart = async () => {
      await updataCartItem(product_id, qtySelect);
      Navigate('/CartPage')
    }

    const [wishList, setWishList] = useState(() => {
      const initWishList = localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : {};

      return initWishList
  })

  const btnWishList = (e, product_id) => {
      e.stopPropagation()
      const newWishList = {
          ...wishList,
          [product_id]: !wishList[product_id]
      }

      localStorage.setItem("wishList", JSON.stringify(newWishList))

      setWishList(newWishList)
  }

  const btnColorActive = (item) => {
    setIsColorActive(item)
  }

  const btnSpecsActive = (item) => {
    setIsSpecsActive(item)
  }

    return (
        <div className="container">
          <main className="pt-8 pb-14 pt-md-18 pb-md-23">
            <div className="pb-md-18">
              < ProductNav product={product} />

              <div className="row">
                <figure className="col-md-7 m-0">
                  <div className="mb-md-10 mb-4">
                  < ProductLmg img={product?.imageUrl} product={product} />
                  </div>
                  <div className="row gx-4 gx-md-10">
                    {
                      product?.imagesUrl?.length > 0 && product?.imagesUrl.map((img, index) => (
                        <div className="col" key={index}>
                          < ProductLmg img={img} product={product} />
                        </div>
                      ))}
                  </div>
                </figure>
        
                <div className="col-md-5 pt-8 pt-md-0">
                  <section className="border-bottom mb-9 mb-md-12">
                    <h3 className="pb-md-4 pb-2 fs-7 fs-md-3">{product.title}</h3>
                    <p className="pb-md-4 pb-2 text-gray-70">VIP 會員獨享/VIP 會員獨享/VIP 會員獨享</p>
                    <p className="text-primary pb-md-12 pb-9 fw-bold fs-8 fs-md-4">{`$${product.price}`}</p>
                  </section>
        
                  <div className="mb-6 mb-md-10">
                    <p className="fs-md-9 fs-10 mb-md-6 mb-4">顏色</p>
                    <ul className="list-unstyled d-flex m-0 flex-wrap">
                      {product.colors?.map((color, index) => (
                        <li className="me-lg-5 me-3 mb-lg-3 mb-1" key={index}>
                          <button
                          onClick={() => btnColorActive(color)}
                          type="button" className={`btn btn-outline-secondary btn-detail py-4 px-6 border-gray-40 fw-normal ${isColorActive === color && "active"}`}>
                            <p className="fs-7">{color}</p>
                          </button>
                        </li>
                      ))}
                      </ul>
                  </div>
                  <div className="mb-6 mb-md-10">
                    <p className="fs-md-9 fs-10 mb-md-6 mb-4">規格</p>
                    <ul
                    className="list-unstyled d-flex m-0 flex-wrap">
                    {product.specs?.map((specs, index) => (
                      <li className="me-lg-5 me-3 mb-lg-3 mb-1" key={index}>
                        <button
                        onClick={() => btnSpecsActive(specs)}
                        key={index}
                        type="button" className={`btn btn-outline-secondary btn-detail py-4 px-6 border-gray-40 fw-normal ${isSpecsActive === specs && "active"}`}>
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
                      type="button" className="btn p-0 btn-qty text-gray-50">
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
                    >直接購買
                    </button>
                    <button
                    onClick={addCart}
                    type="button"
                    className="btn btn-outline-primary btn-addCart fw-bold py-md-8 py-6 w-100 me-4">加入購物車

                    </button>
                    <button
                    type="button"
                    onClick={(e) => btnWishList(e, product.id)}
                    className="btn btn-outline-primary btn-wish fw-bold py-md-8 py-6 d-flex justify-content-center align-items-center"
                    style={{width: "51px"}}
                    >
                      <i className={`bi fs-9 ${wishList[product.id] ? "bi-heart-fill" : "bi-heart" }`}></i>
                    </button>
                  
                  </div>
                </div>
              </div>
              <div className="col-md-7 mt-md-13 mt-10">
                <div className="mb-md-12 mb-8">
                  <p className="d-flex pb-md-6 pb-2">
                    <button
                    type="button"
                    className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon" data-bs-toggle="collapse" href="#ProductDataPage-1" role="button" aria-expanded="false" aria-controls="collapseExample">
                      產品說明
                    </button>
                  </p>
                  <div className="collapse" id="ProductDataPage-1">
                    <div className="pb-8 border-bottom">
                      {product.introduce?.map((item, index) => (
                        <p key={index}>{`·${item}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mb-md-12 mb-8">
                  <p className="d-flex pb-md-6 pb-2">
                    <button
                    type="button"
                    className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon" data-bs-toggle="collapse" href="#ProductDataPage-2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    注意事項
                    </button>
                  </p>
                  <div className="collapse" id="ProductDataPage-2">
                    <div className="pb-8 border-bottom">
                    {product.caution?.map((item, index) => (
                      <p key={index}>{`·${item}`}</p>
                    ))}
                    </div>
                  </div>
                </div>
                <div className="mb-md-12 mb-8">
                  <p className="d-flex pb-md-6 pb-2">
                    <button
                    type="button"
                    className="btn border-0 w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon" data-bs-toggle="collapse" href="#ProductDataPage-3" role="button" aria-expanded="false" aria-controls="collapseExample">
                    產品規格
                    </button>
                  </p>
                  <div className="collapse" id="ProductDataPage-3">
                    <div className="pb-8 border-bottom">
                      {product.specification?.map((item, index) => (
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
              <div className="row justify-content-center">
                <div className="col">
                  
                </div>
                <div className="col">
                  
                </div>
                <div className="col">
                  
                </div>
                <div className="col">
                  
                </div>
              </div>
            </section>
          </main>
          < ScreenLoading isLoading={isScreenLoading} />
        </div>
    )
}