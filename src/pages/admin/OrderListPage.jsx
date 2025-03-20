import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import axios from "axios";
// import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import DelProductModal from "../../components/DelProductModal";
import { useNavigate } from "react-router-dom";
// import ProductPage from './pages/ProductPage';
// import './App.css'

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""]
};

function OrderListPage () {
  const [order, setOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDleModalOpen, setIsDleModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const navigate = useNavigate();

  const handleOpenModal = (mode, product) => {
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempProduct({...defaultModalState});
        break;

      case "edit":
        setTempProduct(product);
        break;
    }

    setIsModalOpen(true);
  };

  const handleOpenDelModal = (product) => {
    setTempProduct(product);
    setIsDleModalOpen(true);
  };

  const [pageInfo, setPageInfo] = useState({});

  const getOrder = async (page) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`
      );
      console.log(res.data)
      setOrder(res.data.orders);
      setPageInfo(res.data.pagination)
    } catch (error) {
      alert(error.message)
      
    }
  };

  const checkUser = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      getOrder(1);
    } catch (error) {
      alert(error.message)
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if(token.length > 0){
      axios.defaults.headers.common["Authorization"] = token;
      checkUser();
    }
  }, []);

  const removeOrder = async (order_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${order_id}`
      );
      alert("刪除成功")
      getOrder()
    } catch (error) {
      alert(error.message)
      
    }
  };


  const handelLogout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/logout`);
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      navigate('/login')
    } catch (error) {
      alert(`登出失敗:${error.message}`)
    }
  };

  return (
    <>
      <div className="container py-5">
      <div className="row mb-3">
        <div className="justify-content-end">
          <button
          onClick={handelLogout}
          type="button" className="btn btn-secondary">
            登出
          </button>
        </div>
      </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>訂單列表</h2>
              <button
                onClick={() => {
                  handleOpenModal("create");
                }}
                type="button"
                className="btn btn-primary"
              >
                建立新的產品
              </button>
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
                    <td>{new Date(product.create_at* 1000).toLocaleString()}</td>
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
        <Pagination
          products={order}
          pageInfo={pageInfo}
          getProduct={getOrder}
        />
      </div>


      {/* <DelProductModal
        tempProduct={tempProduct}
        isOpen={isDleModalOpen}
        setIsOpen={setIsDleModalOpen}
        getProduct={getProduct}
      /> */}
    </>
  );
}

export default OrderListPage;
