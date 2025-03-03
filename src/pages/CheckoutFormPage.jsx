import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ScreenLoading from "../components/ScreenLoading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [qtySelect, setQtySelect] = useState();

  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
console.log(res.data.data)
      setCart(res.data.data);
      setQtySelect
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
  } = useForm()

  const onSubmit = handleSubmit((data) => {

    const { message, ...user} = data;

    const userInfo = {
      data:{
        user,
        message
      }
    }
    checkout(userInfo);
    alert(`送出訂單成功`)
  })

  const checkout = async (data) => {
    setIsScreenLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data)
      reset();
      getCart()
    } catch (error) {
      alert("結帳失敗")
    } finally {
      setIsScreenLoading(false);
    }

  }

  const qtyChange = (e) => {
    setQtySelect(e.target.value)
  }

  return (
    <>
        <article className="container-index">
          <div className="container">
            <p className="text-center pb-md-2">CampEase design</p>
            <h2 className="text-center pb-md-17 pb-12">購物車</h2>
          {cart.carts?.length > 0 ? (<div>
            <div className="row justify-content-center">
              <div className="row mb-md-16 mb-12 d-flex">
                <div className="col-md-7">
                  
                  {cart.carts?.map((cartItem) => (
                  <div className="mb-3 border rounded p-6" key={cartItem.id}>
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
                          <img src={cartItem.product.imageUrl} alt={cartItem.product.title} />
                      </div>
                      <div className="p-0 col-7">
                        <p className="fs-9 fs-md-8 pb-2 fw-bold">{cartItem.product.title}</p>
                        <p className="fs-9 fs-md-10 text-decoration-line-through text-gray-70">{`$${cartItem.product.origin_price}`}</p>
                        <p className="fs-8 fs-md-9 fw-bold pb-5 text-primary">{`$${cartItem.product.price}`}</p>
                        <div className="d-flex align-items-center mt-2 input-group w-100">
                          <i
                          onClick={() => updataCartItem(cartItem.id, cartItem.product.id, cartItem.qty - 1)}
                          className="bi bi-dash-square-fill fs-6 me-2 text-primary"></i>
                          <input
                          onChange={(e) => qtyChange(e)}
                          value={cartItem.qty}
                          type="text"
                          className="form-control p-0 mt-1 text-center" />
                          <i
                          onClick={() => updataCartItem(cartItem.id, cartItem.product.id, cartItem.qty + 1)}
                          className="bi bi-plus-square-fill fs-6 ms-2 text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}

                  
                  <div className="text-end py-3">
                    <button
                      onClick={removeCart}
                      className="btn btn-outline-danger"
                      type="button"
                    >
                      清空購物車
                    </button>
                  </div>

                </div>
                
                <div className="col-md-5 mb-6 mb-md-0 text-center">
                  <div className="border p-4 mb-4">
                    <h4 className="fw-bold mb-4">Order Detail</h4>
                    <table className="table text-muted border-bottom">
                      <tbody>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-4 font-weight-normal"
                          >
                            Subtotal
                          </th>
                          <td className="text-end border-0 px-0 pt-4">NT$${cart.final_total}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                          >
                            Payment
                          </th>
                          <td className="text-end border-0 px-0 pt-0 pb-4">
                            ApplePay
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-4">
                      <p className="mb-0 h4 fw-bold">Total</p>
                      <p className="mb-0 h4 fw-bold">NT$${cart.final_total}</p>
                    </div>
                    <div className="btn btn-dark w-100 mt-4">
                      結帳
                    </div>
                  </div>

                  <div className="border border-primary-1 h-100 rounded">                    
                    <div className="my-5 justify-content-center p-8">
                      <form onSubmit={onSubmit} className="">
                        <div className="mb-6 text-start">
                          <label htmlFor="email" className="form-label mb-2 text-gray-70">
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
                            className={`form-control ${errors.email && "is-invalid"} py-3 px-6`}
                            placeholder="請輸入 Email"
                            />
                          {errors.email && (
                            <p className="text-danger my-2">{errors.email.message}</p>
                          )}
                        </div>

                        <div className="mb-6 text-start">
                          <label htmlFor="name" className="form-label mb-2 text-gray-70">
                            收件人姓名
                          </label>
                          <input
                            {...register("name", {
                              required: "姓名 欄位必填"
                            })}
                            id="name"
                            className={`form-control ${errors.name && "is-invalid"} py-3 px-6`}
                            placeholder="請輸入姓名"
                            />

                          {errors.name && (
                            <p className="text-danger my-2">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="mb-6 text-start">
                          <label htmlFor="tel" className="form-label mb-2 text-gray-70">
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
                            className={`form-control ${errors.tel && "is-invalid"} py-3 px-6`}
                            placeholder="請輸入電話"
                            />

                          {errors.tel && (
                            <p className="text-danger my-2">{errors.tel.message}</p>
                          )}
                        </div>

                        <div className="mb-6 text-start">
                          <label htmlFor="address" className="form-label mb-2 text-gray-70">
                            收件人地址
                          </label>
                          <input
                            {...register("address", {
                              required: "地址 欄位必填"
                            })}
                            id="address"
                            type="text"
                            className={`form-control ${errors.address && "is-invalid"} py-3 px-6`}
                            placeholder="請輸入地址"
                            />

                          {errors.address && (
                            <p className="text-danger my-2">{errors.address.message}</p>
                          )}
                        </div>

                        <div className="mb-6 text-start">
                          <label htmlFor="message" className="form-label mb-2 text-gray-70">
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
              </div>
            </div>
          </div>): (<h1 className="d-flex justify-content-center py-5">購物車沒有商品</h1>)}

            
          </div>
        </article>
        < ScreenLoading isLoading={isScreenLoading} />


        

    </>
  );
}
