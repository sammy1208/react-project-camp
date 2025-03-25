import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/admin/Pagination";
import ScreenLoading from "../../components/ScreenLoading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderListPage() {
  const [order, setOrder] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});

  const getOrder = async (page) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`
      );
      setOrder(res.data.orders);
      setPageInfo(res.data.pagination);
    } catch (error) {
      alert(error.message);
    }
  };

  const checkUser = async () => {
    setIsScreenLoading(true)
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      getOrder(1);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsScreenLoading(false)
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token.length > 0) {
      axios.defaults.headers.common["Authorization"] = token;
      checkUser();
    }
  }, []);

  const removeOrder = async (order_id) => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${order_id}`
      );
      alert("刪除成功");
      getOrder();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container-default">
        <div className="container">
          <p className="text-center pb-md-2">Manage Orders</p>
          <h2 className="text-center pb-md-17 pb-12">管理訂單</h2>
          <div className="row justify-content-center">
            <div className="col">
              <div className="d-flex justify-content-between">
                {/* <button
                  onClick={() => {
                    handleOpenModal("create");
                  }}
                  type="button"
                  className="btn btn-primary text-white"
                >
                  建立新的產品
                </button> */}
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">訂單編號</th>
                    <th scope="col">時間</th>
                    <th scope="col">是否付款</th>
                    <th scope="col">查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((product) => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>
                        {new Date(product.create_at * 1000).toLocaleString()}
                      </td>
                      <td>
                        {product.is_paid ? (
                          <span className="text-success">付款</span>
                        ) : (
                          <span>未付款</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group">
                          {/* <button
                          onClick={() => {
                            handleOpenModal("edit", product);
                          }}
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button> */}
                          <button
                            onClick={() => {
                              removeOrder(product.id);
                            }}
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {pageInfo.total_pages !== undefined && (
            <Pagination
              products={order}
              pageInfo={pageInfo}
              getProduct={getOrder}
            />
          )}
        </div>
      </div>
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}

export default OrderListPage;
