import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/admin/Pagination";
import ScreenLoading from "../../components/ScreenLoading";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";
import DelModal from "../../components/admin/DelModal";
import OrderModal from "../../components/admin/OrderModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function OrderListPage() {
  const [order, setOrder] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const dispatch = useDispatch();
  const [isDleModalOpen, setIsDleModalOpen] = useState(false);
  const [tempProduct, setTempProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setTempProduct(product);

    setIsModalOpen(true);
  };

  const getProduct = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`
      );
      setOrder(res.data.orders);
      setPageInfo(res.data.pagination);
    } catch (error) {
      const err = error.message;
      dispatch(
        PushMessage({
          text: err,
          status: "failed"
        })
      );
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token.length > 0) {
      axios.defaults.headers.common["Authorization"] = token;
      getProduct(1);
    }
  }, []);



  const handleOpenDelModal = (product) => {
    setTempProduct(product);
    setIsDleModalOpen(true);
  };

  return (
    <>
      <div className="container-default">
        <div className="container">
          <p className="text-center pb-md-2">Manage Orders</p>
          <h2 className="text-center pb-md-17 pb-12">管理訂單</h2>
          <div className="row justify-content-center">
            <div className="col">
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
                          <button
                            onClick={() => {
                              handleOpenModal(product);
                            }}
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => {
                              handleOpenDelModal(product);
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
              getProduct={getProduct}
            />
          )}
        </div>
      </div>
      <OrderModal
        tempProduct={tempProduct}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        getProduct={getProduct}
      />
      <DelModal
        tempProduct={tempProduct}
        isOpen={isDleModalOpen}
        setIsOpen={setIsDleModalOpen}
        getProduct={getProduct}
        type={"order"}
      />
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}

export default OrderListPage;
