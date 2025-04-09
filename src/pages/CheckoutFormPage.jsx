import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { PushMessage } from "../redux/slices/toastSlice";
import { getCart } from "../redux/slices/apiSlice";
import axios from "axios";
import ScreenLoading from "../components/ScreenLoading";
import ProductLmg from "../components/ProductLmg";
import SectionTitle from '../components/SectionTitle';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutFormPage() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { message, ...user } = data;
    const userInfo = {
      data: {
        user,
        message
      }
    };
    const res = await checkout(userInfo);
    dispatch(PushMessage({ text: "建立訂單成功！", status: "success" }));
    Navigate(`/Order/${res.orderId}`);
  });

  const checkout = async (data) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/order`,
        data
      );
      reset();
      dispatch(getCart());
      return res.data;
    } catch {
      dispatch(
        PushMessage({
          text: "建立訂單失敗",
          status: "failed"
        })
      )
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
      <article className="container-default">
        <div className="container">
          <SectionTitle subtitle="Shopping Cart" title="購物車" subtitleColor="text-primary" titleColor=""/>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ul className="list-unstyled mb-14 ms-md-auto d-flex align-items-center justify-content-between w-100 mt-md-0 mt-4 custom-step-line">
                <li className="me-md-6 me-3 position-relative bg-white">
                  <i className="bi bi-1-circle-fill fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10 fw-bold">訂單資料</span>
                </li>
                <li className="me-md-6 me-3 position-relative bg-white">
                  <i className="bi bi-2-circle fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10">結帳付款</span>
                </li>
                <li className="bg-white">
                  <i className="bi bi-3-circle fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10">訂購結果</span>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={onSubmit} className="row mb-md-16 mb-12">
            <div className="col-md-8">
              <div className="h-100 rounded">
                <div className="mb-5 justify-content-center">
                  <div onSubmit={onSubmit}>
                    <p className="fw-bold fs-8 fs-md-7 mb-6">訂單資料</p>
                    <div className="mb-6 text-start">
                      <label
                        htmlFor="email"
                        className="form-label mb-2 text-gray-70"
                      >
                        Email
                        <span className='text-danger'>*</span>
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
                        <span className='text-danger'>*</span>
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
                        <span className='text-danger'>*</span>
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
                        <p className="text-danger my-2">{errors.tel.message}</p>
                      )}
                    </div>

                    <div className="mb-6 text-start">
                      <label
                        htmlFor="address"
                        className="form-label mb-2 text-gray-70"
                      >
                        收件人地址
                        <span className='text-danger'>*</span>
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
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="border border-primary-1 p-8 mb-4 rounded">
                <h5 className="fw-bold mb-6 fs-8 fs-md-7">明細</h5>
                {cart.carts?.map((cartItem) => (
                  <div key={cartItem.id} className="d-flex mb-4 w-100">
                    <div className="mb-0 rounded-4 col-5 me-4">
                      <ProductLmg
                        img={cartItem.product?.imageUrl}
                        product={cartItem.product}
                      />
                    </div>
                    <div className="w-100">
                      <div>
                        <p className="mb-0 fw-bold">{cartItem.product.title}</p>
                        <p className="mb-0">{`$${cartItem.product.price.toLocaleString("zh-Hant-TW")}`}</p>
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
                        {`NT$${total.toLocaleString("zh-Hant-TW")}`}
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
                        {`- NT$${(total - cart.final_total).toLocaleString("zh-Hant-TW")}`}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between my-8">
                  <p className="mb-0 fs-7 fw-bold">總計金額</p>
                  <p className="mb-0 fs-7 fw-bold text-primary">
                    {`NT$${cart.final_total.toLocaleString("zh-Hant-TW")}`}
                  </p>
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
              </div>
            </div>
          </form>
        </div>
      </article>
      <ScreenLoading isLoading={isScreenLoading}/>
    </>
  );
}
