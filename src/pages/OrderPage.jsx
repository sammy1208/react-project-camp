import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ScreenLoading from "../components/ScreenLoading";
import { useNavigate, useParams } from "react-router-dom";
import ProductLmg from "../components/ProductLmg";
import { PushMessage } from "../redux/slices/toastSlice";
import { useDispatch } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const { id: order_id } = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
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
    getOrder();
  }, []);

  const checkout = async (data) => {
    setIsScreenLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data);
      reset();
    } catch (error) {
      alert("結帳失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  const getOrder = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/order/${order_id}`
      );
      console.log(res.data.order);
      setOrder(res.data.order);
    } catch (error) {
      alert("結帳失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  const getPay = async (order_id) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/pay/${order_id}`
      );
      console.log(res);
      dispatch(PushMessage({ text: "付款成功！", status: "success" }));
      Navigate(`/PayOrder/${order_id}`);
    } catch (error) {
      alert(error);
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
          <div className="row justify-content-center">
            <div className="col-8">
              <ul className="list-unstyled mb-14 ms-md-auto d-flex align-items-center justify-content-between w-100 mt-md-0 mt-4 custom-step-line">
                <li className="me-md-6 me-3 position-relative bg-white">
                  <i class="bi bi-1-circle fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10">訂單資料</span>
                </li>
                <li className="me-md-6 me-3 position-relative bg-white">
                  <i class="bi bi-2-circle-fill fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10 fw-bold">結帳付款</span>
                </li>
                <li className="bg-white">
                  <i class="bi bi-3-circle fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10">訂購結果</span>
                </li>
              </ul>
                <div
                  key={order.id}
                  className="border-top border-bottom border-primary-1 mb-4"
                >
                  <div className="p-8">
                    <div className="d-flex mb-6 justify-content-between">
                      <p>訂單編號</p>
                      <p>{order.id}</p>
                    </div>
                    <div className="d-flex mb-6 justify-content-between">
                      <p>訂單總額</p>
                      <p>{`NT$ ${order.total}`}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>付款狀態:</p>
                      <p>{order.is_paid ? "已付款" : "未付款"}</p>
                    </div>
                  </div>
                </div>
                <p className="fs-md-10 fs-11 mt-4 text-gray-70 mb-9">
                  ※ 您的訂單將在付款後開始訂製，付款後，從開始製作到寄出商品為 14
                  個工作天。
                </p>
                <div className="text-end">
                  <button
                    onClick={() => getPay(order.id)}
                    className="btn btn-primary text-white btn-addCart fw-bold py-md-8 py-6 ms-auto"
                    type="button"
                  >
                    結帳付款
                  </button>
                </div>
            </div>
          </div>
        </div>
      </article>
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
