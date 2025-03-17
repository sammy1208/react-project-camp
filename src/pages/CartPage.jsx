import { useEffect, useState } from "react";
import axios from "axios";
import ScreenLoading from "../components/ScreenLoading";
import ProductLmg from "../components/ProductLmg";
import { useDispatch, useSelector } from "react-redux";
import { PushMessage } from "../redux/slices/toastSlice";
import { updateCartNum, clearCartNum } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const currentSelection = useSelector(state => state.product.selectedProduct)
  const [total, setTotal] = useState(0)
  // const { carts } = useSelector(state => state.cart)

  useEffect(() => {
    getCart()
  }, []);
  
  useEffect(() => {
    if (cart.carts){
      const product = cart.carts.map((item) => {
        return item.product.origin_price * item.qty
      })
      const totalALL = product.reduce((acc, item) => acc + item, 0);
      setTotal(totalALL)
    }
  },[cart])
  
  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCart(res.data.data);
      dispatch(updateCartNum(res.data.data))
    } catch (error) {
      dispatch(PushMessage({
        text: "取得購物車失敗",
        status: "failed"
      }))
    } finally {
      setIsScreenLoading(false);
    }
  };

  const removeCart = async () => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);

      getCart();
    } catch (error) {
      dispatch(PushMessage({
        text: "刪除購物車失敗",
        status: "failed"
      }))
    } finally {
      setIsScreenLoading(false);
    }
  };

  const removeCartItem = async (cartItem_id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);

      getCart();
      dispatch(clearCartNum())
    } catch (error) {
      alert(`刪除購物車品項失敗`);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const updataCartItem = async (cartItem_id, product_id, qty) => {
    setIsScreenLoading(true);
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
        data: {
          product_id,
          qty: Number(qty)
        }
      });

      getCart();
    } catch (error) {
      alert(`更新購物車品項失敗`);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const getSelectProduct = (id) => {
    const curren = currentSelection.find((product) => id === product.id )
    return curren || null;
  }

  return (
    <>
      <article className="container-index">
        <div className="container">
          <p className="text-center pb-md-2">CampEase design</p>
          <h2 className="text-center pb-md-17 pb-12">購物車</h2>
          {cart.carts?.length > 0 ? (
            <div>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  {cart.carts?.map((cartItem) => (
                    <div className="mb-3 p-6" key={cartItem.id}>
                      <div className="row p-6">
                        <div className="position-relative">
                          <button
                            onClick={() => removeCartItem(cartItem.id)}
                            type="button"
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill p-0 cursor-pointer border-0 bg-transparent pt-7 pe-7"
                          >
                            <i className="bi bi-x text-gray-80 fs-4"></i>
                          </button>
                        </div>
                        <div className="mb-0 rounded-4 col-5">
                          <ProductLmg
                            img={cartItem.product?.imageUrl}
                            product={cartItem.product}
                          />
                        </div>
                        <div className="p-0 col-7">
                          <p className="fs-9 fs-md-8 pb-2 fw-bold">
                            {cartItem.product.title}
                          </p>
                          {getSelectProduct(cartItem.product?.id) && (
                              <p className="fs-11 fs-md-10 text-gray-70 pb-3">
                                {`${getSelectProduct(cartItem.product?.id).color} / ${getSelectProduct(cartItem.product?.id).specs}`}
                              </p>
                          )}
                          <div className="d-flex align-items-center pb-5 ">
                            <p className="fs-9 fs-md-8 text-decoration-line-through text-gray-70 pe-4">{`$${cartItem.product.origin_price}`}</p>
                            <p className="fs-9 fs-md-8 fw-bold text-primary">{`$${cartItem.product.price}`}</p>
                          </div>
                          <hr />
                          <div className="d-flex align-items-center pt-4 input-group w-100">
                            <button
                              type="button"
                              className="btn border-0"
                              onClick={() =>
                                updataCartItem(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty - 1
                                )
                              }
                              disabled={cartItem.qty === 1}
                            >
                              <i className="bi bi-dash-square-fill fs-6 me-2 text-primary"></i>
                            </button>
                            <div className="form-control p-0 mt-1 text-center">
                              {cartItem.qty}
                            </div>
                            <button
                              type="button"
                              className="btn border-0"
                              onClick={() =>
                                updataCartItem(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty + 1
                                )
                              }
                            >
                              <i className="bi bi-plus-square-fill fs-6 me-2 text-primary"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-md-4">
                  <div className="border p-4 mb-4 rounded">
                    <h5 className="fw-bold mb-4">明細</h5>
                    <table className="table text-muted border-bottom">
                      <tbody>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-4 text-gray-90"
                          >
                            總計金額
                          </th>
                          <td className="text-end border-0 px-0 pt-4 text-gray-70">
                            {`NT$${total}`}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-0 pb-4 text-gray-90"
                          >
                            折扣金額
                          </th>
                          <td className="text-end border-0 px-0 pt-0 pb-4 text-gray-70">
                          {`- NT$${total - cart.final_total}`}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between my-8">
                      <p className="mb-0 fs-7 fw-bold">總計金額</p>
                      <p className="mb-0 fs-7 fw-bold text-primary">
                      {`NT$${cart.final_total}`}
                      </p>
                    </div>
                    <div className="d-flex">
                      <button
                        onClick={removeCart}
                        className="btn btn-outline-primary btn-addCart fw-bold py-md-8 py-6 w-100 me-4"
                        type="button"
                      >
                        清空購物車
                      </button>
                      <Link
                      to={"/Checkout-Form"}
                        type="button"
                        className="btn btn-primary text-white fw-bold py-md-8 py-6 w-100 me-4"
                      >
                        結帳
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
                  {`購物車還沒有商品喔  >~<`}
                </h1>
              </div>
            </>
          )}
        </div>
      </article>

      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
