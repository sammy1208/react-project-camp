import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ScreenLoading from "../components/ScreenLoading";
import ProductLmg from "../components/ProductLmg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      console.log(res.data.data);
      setCart(res.data.data);
    } catch (error) {
      alert("取得購物車失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const removeCart = async () => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);

      getCart();
    } catch (error) {
      alert(`刪除購物車失敗`);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const removeCartItem = async (cartItem_id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);

      getCart();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { message, ...user } = data;

    const userInfo = {
      data: {
        user,
        message
      }
    };
    checkout(userInfo);
    alert(`送出訂單成功`);
  });

  const checkout = async (data) => {
    setIsScreenLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data);
      reset();
      getCart();
    } catch (error) {
      alert("結帳失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

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
                            NT$24,000
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-0 pb-4 text-gray-90"
                          >
                            付款方式
                          </th>
                          <td className="text-end border-0 px-0 pt-0 pb-4 text-gray-70">
                            ApplePay
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between my-8">
                      <p className="mb-0 fs-7 fw-bold">總計金額</p>
                      <p className="mb-0 fs-7 fw-bold text-primary">
                        NT$24,000
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
                      <button
                        // onClick={goCart}
                        type="button"
                        className="btn btn-primary text-white fw-bold py-md-8 py-6 w-100 me-4"
                      >
                        結帳
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <img
                  src="/青松露營w.svg"
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
