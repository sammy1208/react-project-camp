import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCart } from "../redux/slices/apiSlice";
import { PushMessage } from "../redux/slices/toastSlice";
import axios from "axios";
import ScreenLoading from "../components/ScreenLoading";
import SectionTitle from "../components/SectionTitle";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function PayOrderPage() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const { id: order_id } = useParams();

  useEffect(() => {
    getOrder();
    dispatch(getCart());
  }, []);

  const handleGoToProducts = () => {
    setIsScreenLoading(true);
    try {
      Navigate("/Products");
    } catch {
      dispatch(
        PushMessage({
          text: "結帳失敗",
          status: "failed"
        })
      );
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
      setOrder(res.data.order);
    } catch {
      dispatch(
        PushMessage({
          text: "結帳失敗",
          status: "failed"
        })
      );
    } finally {
      setIsScreenLoading(false);
    }
  };

  return (
    <>
      <article className="container-default">
        <div className="container">
          <SectionTitle
            subtitle="Shopping Cart"
            title="購物車"
            subtitleColor="text-primary"
            titleColor=""
          />
          <div className="row justify-content-center">
            <div className="col-8">
              <ul className="list-unstyled mb-10 ms-md-auto d-flex align-items-center justify-content-between w-100 mt-md-0 mt-4 custom-step-line">
                <li className="me-md-6 me-3 position-relative bg-white">
                  <i className="bi bi-1-circle fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10">訂單資料</span>
                </li>
                <li className="me-md-6 me-3 position-relative bg-white">
                  <i className="bi bi-2-circle fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10">結帳付款</span>
                </li>
                <li className="bg-white">
                  <i className="bi bi-3-circle-fill fs-2 text-primary d-block text-center"></i>
                  <span className="text-nowrap fs-10 fw-bold">訂購結果</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center pb-12">
            <i className="bi bi-check-circle fs-1 text-primary"></i>
            <h4 className=" pt-0">訂購成功</h4>
          </div>
          <div className="row justify-content-center">
            <div className="col-8">
              <div
                key={order.id}
                className="border-top border-bottom border-primary-1 mb-4"
              >
                <div className="p-8">
                  <div className="d-flex mb-6 justify-content-between">
                    <p style={{ minWidth: "80px" }}>訂單編號</p>
                    <p className="text-break">{order.id}</p>
                  </div>
                  <div className="d-flex mb-6 justify-content-between">
                    <p style={{ minWidth: "80px" }}>訂單時間</p>
                    <p className="text-break">
                      {new Date(order.create_at * 1000).toLocaleString()}
                    </p>
                  </div>
                  <div className="d-flex mb-6 justify-content-between">
                    <p style={{ minWidth: "80px" }}>訂單總額</p>
                    <p>{`NT$ ${order.total?.toLocaleString("zh-Hant-TW")}`}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p style={{ minWidth: "80px" }}>付款狀態</p>
                    <p>{order.is_paid ? "已付款" : "未付款"}</p>
                  </div>
                </div>
              </div>
              <p className="fs-md-10 fs-11 mt-4 text-gray-70 mb-9">
                ※ 您的訂單將在付款後開始訂製，付款後，從開始製作到寄出商品為 14
                個工作天。
              </p>
              <div className="text-end w-100">
                <button
                  onClick={() => handleGoToProducts()}
                  type="button"
                  className="btn btn-primary btn-addCart fw-bold py-md-8 py-6 me-4 text-white"
                >
                  繼續逛逛產品
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
