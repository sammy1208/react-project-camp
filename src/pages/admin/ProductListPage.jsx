import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/admin/Pagination";
import ProductModal from "../../components/admin/ProductModal";
import DelProductModal from "../../components/admin/DelProductModal";
import ScreenLoading from "../../components/ScreenLoading";
import { PushMessage } from "../../redux/slices/toastSlice";
import { useDispatch } from "react-redux";

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

function ProductListPage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [products, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDleModalOpen, setIsDleModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const dispatch = useDispatch();

  const handleOpenModal = (mode, product) => {
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempProduct({ ...defaultModalState });
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

  const getProduct = async (page) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProduct(res.data.products);
      setPageInfo(res.data.pagination);
    } catch (error) {
      const err = error.message
      dispatch(
        PushMessage({
          text: err,
          status: "failed"
        })
      )
    } finally {
      setIsScreenLoading(false);
    }
  };

  // const checkUser = async () => {
  //   setIsScreenLoading(true);
  //   try {
  //     await axios.post(`${BASE_URL}/v2/api/user/check`);
  //     getProduct(1);
  //   } catch (error) {
  //     const err = error.message
  //     dispatch(
  //       PushMessage({
  //         text: err,
  //         status: "failed"
  //       })
  //     )
  //   } finally {
  //     setIsScreenLoading(false);
  //   }
  // };

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

  return (
    <>
      <article className="container-default">
        <div className="container">
          <p className="text-center pb-md-2">Manage Products</p>
          <h2 className="text-center pb-md-17 pb-12">管理產品</h2>
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => {
                    handleOpenModal("create");
                  }}
                  type="button"
                  className="btn btn-primary text-white"
                >
                  建立新的產品
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">產品名稱</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th scope="row">{product.title}</th>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>
                        {product.is_enabled ? (
                          <span className="text-primary">啟用</span>
                        ) : (
                          <span>未啟用</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group">
                          <button
                            onClick={() => {
                              handleOpenModal("edit", product);
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
              products={products}
              pageInfo={pageInfo}
              getProduct={getProduct}
            />
          )}
        </div>
        {modalMode && (
          <ProductModal
            modalMode={modalMode}
            tempProduct={tempProduct}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            getProduct={getProduct}
          />
        )}
        {tempProduct.id !== undefined && (
          <DelProductModal
            tempProduct={tempProduct}
            isOpen={isDleModalOpen}
            setIsOpen={setIsDleModalOpen}
            getProduct={getProduct}
          />
        )}
      </article>
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}

export default ProductListPage;
