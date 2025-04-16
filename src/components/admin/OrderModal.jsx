import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderModal({
  tempProduct,
  isOpen,
  setIsOpen,
  getProduct
}) {
  const [modalData, setModalData] = useState({
    id: "",
    create_at: Math.floor(Date.now() / 1000),
    is_paid: false,
    message: "",
    num: 1,
    products: {},
    user: {
      address: "",
      email: "",
      name: "",
      tel: ""
    }
  });

  const productModalRef = useRef(null);

  useEffect(() => {
    if (tempProduct) {
      setModalData({
        id: tempProduct?.id || "",
        create_at: tempProduct?.create_at || Date.now() / 1000,
        is_paid: tempProduct?.is_paid || false,
        message: tempProduct?.message || "",
        num: tempProduct?.num || 1,
        products: tempProduct?.products || {},
        user: {
          address: tempProduct?.user?.address || "",
          email: tempProduct?.user?.email || "",
          name: tempProduct?.user?.name || "",
          tel: tempProduct?.user?.tel || ""
        }
      });
    }
  }, [tempProduct]);

  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false
    });
  }, []);
  
  useEffect(() => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    if (isOpen) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }
  }, [isOpen]);

  const dispatch = useDispatch(PushMessage);



  const handleInputChange = (e) => {
    const { value, name, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if(name.includes("user")) {
      const key = name.split(".")[1];
      setModalData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [key]: fieldValue
        }
      }));
    } else {
      setModalData((prev) => ({
        ...prev,
        [name]: fieldValue
      }));
    }
  };



  const handleUpdateOrder = async () => {

    try {
      await updateOrder();

      getProduct();

      handleCloseModal();
      dispatch(
        PushMessage({
          text: "編輯成功",
          status: "success"
        })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      const errorMessage = Array.isArray(message)
        ? message.join("、")
        : message || "操作失敗";
      dispatch(
        PushMessage({
          text: errorMessage,
          status: "failed"
        })
      );
    }
  };

  const updateOrder = async () => {
    return await axios.put(
      `${BASE_URL}/v2/api/${API_PATH}/admin/order/${modalData.id}`,
      {
        data: {
          create_at: modalData.create_at,
          is_paid: modalData.is_paid,
          message: modalData.message,
          products: modalData.products,
          num: modalData.num,
          user: {
            address: modalData.user.address,
            email: modalData.user.email,
            name: modalData.user.name,
            tel: modalData.user.tel
          }
        }
      }
    );
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    getProduct();

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style = "";
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }, 400);
  };

  return (
    <div
      ref={productModalRef}
      id="productModal"
      className="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4">

              <div className="col">
                <div className="mb-3">
                  <label htmlFor="userAddress" className="form-label">
                    地址
                  </label>
                  <input
                    value={modalData.user?.address}
                    onChange={handleInputChange}
                    name="user.address"
                    id="userAddress"
                    type="text"
                    className="form-control"
                    placeholder="請輸入地址"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">
                    email
                  </label>
                  <textarea
                    value={modalData.user?.email}
                    onChange={handleInputChange}
                    name="user.email"
                    id="userEmail"
                    type="email"
                    className="form-control"
                    placeholder="請輸入 Email"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="userTel" className="form-label">
                    電話
                  </label>
                  <textarea
                    value={modalData.user?.tel}
                    onChange={handleInputChange}
                    name="user.tel"
                    id="userTel"
                    type="tel"
                    className="form-control"
                    placeholder="請輸入電話"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    姓名
                  </label>
                  <textarea
                    value={modalData.user?.name}
                    onChange={handleInputChange}
                    name="user.name"
                    id="userName"
                    type="text"
                    className="form-control"
                    placeholder="請輸入姓名"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    留言
                  </label>
                  <textarea
                    value={modalData.message}
                    onChange={handleInputChange}
                    name="message"
                    id="message"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入留言"
                  ></textarea>
                </div>

                <div className="form-check">
                  <input
                    checked={modalData.is_paid}
                    onChange={handleInputChange}
                    name="is_paid"
                    type="checkbox"
                    className="form-check-input"
                    id="isPaid"
                  />
                  <label className="form-check-label" htmlFor="isPaid">
                    是否付款
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top bg-light">
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn btn-secondary text-white"
            >
              取消
            </button>
            <button
              onClick={handleUpdateOrder}
              type="button"
              className="btn btn-primary text-white"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderModal.propTypes = {
  tempProduct: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    create_at: PropTypes.number,
    is_paid: PropTypes.bool,
    message: PropTypes.string,
    num: PropTypes.number,
    products: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        product_id: PropTypes.string,
        qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        final_total: PropTypes.number,
        product: PropTypes.object
      })
    ),
    user: PropTypes.shape({
      address: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      tel: PropTypes.string
    })
  }).isRequired,
  isOpen: PropTypes.bool.isRequired, // 是否開啟 Modal
  setIsOpen: PropTypes.func.isRequired, // 設置 Modal 狀態
  getProduct: PropTypes.func.isRequired // 取得產品列表
};

export default OrderModal;
