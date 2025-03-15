import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ScreenLoading from "../components/ScreenLoading";
import { useNavigate } from "react-router-dom";
import ProductLmg from "../components/ProductLmg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const Navigate = useNavigate();

  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
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
    Navigate("/");
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

  useEffect(() => {
    if (cart.carts) {
      const product = cart.carts.map((item) => {
        return item.product.origin_price * item.qty;
      });
      const totalALL = product.reduce((acc, item) => acc + item, 0);
      setTotal(totalALL);
    }
  }, [cart]);

  return (
    <>
      <article className="container-index">
        <div className="container">
          <p className="text-center pb-md-2">CampEase design</p>
          <h2 className="text-center pb-md-17 pb-12">購物車</h2>
          <div className="row justify-content-center">
            <div className="row mb-md-16 mb-12 d-flex">
              <div className="col-md-8">
                <div className="border border-primary-1 h-100 rounded">
                  <div className="my-5 justify-content-center p-8">
                    <form onSubmit={onSubmit} className="">
                      <div className="mb-6 text-start">
                        <label
                          htmlFor="email"
                          className="form-label mb-2 text-gray-70"
                        >
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "email 欄位必填",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "email 格式錯誤"
                            }
                          })}
                          id="email"
                          type="email"
                          className={`form-control ${
                            errors.email && "is-invalid"
                          } py-3 px-6`}
                          placeholder="請輸入 Email"
                        />
                        {errors.email && (
                          <p className="text-danger my-2">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6 text-start">
                        <label
                          htmlFor="name"
                          className="form-label mb-2 text-gray-70"
                        >
                          收件人姓名
                        </label>
                        <input
                          {...register("name", {
                            required: "姓名 欄位必填"
                          })}
                          id="name"
                          className={`form-control ${
                            errors.name && "is-invalid"
                          } py-3 px-6`}
                          placeholder="請輸入姓名"
                        />

                        {errors.name && (
                          <p className="text-danger my-2">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6 text-start">
                        <label
                          htmlFor="tel"
                          className="form-label mb-2 text-gray-70"
                        >
                          收件人電話
                        </label>
                        <input
                          {...register("tel", {
                            required: "電話 欄位必填",
                            pattern: {
                              value: /^(0[2-8]\d{7}|09\d{8})$/,
                              message: "電話 格式錯誤"
                            }
                          })}
                          id="tel"
                          type="tel"
                          className={`form-control ${
                            errors.tel && "is-invalid"
                          } py-3 px-6`}
                          placeholder="請輸入電話"
                        />

                        {errors.tel && (
                          <p className="text-danger my-2">
                            {errors.tel.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6 text-start">
                        <label
                          htmlFor="address"
                          className="form-label mb-2 text-gray-70"
                        >
                          收件人地址
                        </label>
                        <input
                          {...register("address", {
                            required: "地址 欄位必填"
                          })}
                          id="address"
                          type="text"
                          className={`form-control ${
                            errors.address && "is-invalid"
                          } py-3 px-6`}
                          placeholder="請輸入地址"
                        />

                        {errors.address && (
                          <p className="text-danger my-2">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6 text-start">
                        <label
                          htmlFor="message"
                          className="form-label mb-2 text-gray-70"
                        >
                          留言
                        </label>
                        <textarea
                          {...register("message")}
                          id="message"
                          className="form-control py-3 px-6"
                          cols="30"
                          rows="10"
                        ></textarea>
                      </div>
                      <div className="text-end">
                        <button
                          type="submit"
                          className={`btn btn-primary text-white fw-bold py-md-8 py-6 w-100 ${
                            cart.carts?.length === 0 && "disabled"
                          }`}
                        >
                          送出訂單
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border p-4 mb-4 rounded">
                  <h5 className="fw-bold mb-4">明細</h5>
                  {cart.carts?.map((cartItem) => (
                    <div className="d-flex mb-4 w-100">
                      <div className="mb-0 rounded-4 col-5 me-4">
                        <ProductLmg
                          img={cartItem.product?.imageUrl}
                          product={cartItem.product}
                        />
                      </div>
                      <div className="w-100">
                        <div>
                          <p className="mb-0 fw-bold">
                            {cartItem.product.title}
                          </p>
                          <p className="mb-0">{`$${cartItem.product.price}`}</p>
                        </div>
                        <p className="mb-0 fw-bold">{`X ${cartItem.qty}`}</p>
                      </div>
                    </div>
                  ))}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
