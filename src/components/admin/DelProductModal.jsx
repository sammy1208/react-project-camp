import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal({ tempProduct, isOpen, setIsOpen, getProduct, type }) {
  const delProductModalRef = useRef(null);
  const dispatch = useDispatch(PushMessage);

  useEffect(() => {
    new Modal(delProductModalRef.current, {
      backdrop: false
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delProductModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  const handleDeleteProduct = async () => {
    const deleteItem = type === "product" ? deleteProduct : removeOrder;

    try {
      await deleteItem();
      getProduct();
      handleCloseDelModal();
      dispatch(
        PushMessage({
          text: "刪除成功",
          status: "success"
        })
      );
    } catch {
      dispatch(
        PushMessage({
          text: "刪除失敗`",
          status: "failed"
        })
      );
    }
  };

  const handleCloseDelModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`
      );
    } catch {
      dispatch(
        PushMessage({
          text: "刪除產品失敗`",
          status: "failed"
        })
      );
    }
  };

  const removeOrder = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${tempProduct.id}`
      );
      dispatch(
        PushMessage({
          text: "刪除成功",
          status: "success"
        })
      );
    } catch (error) {
      const err = error.message;
      dispatch(
        PushMessage({
          text: err,
          status: "failed"
        })
      );
    }
  };

  return (
    <div
      ref={delProductModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              onClick={handleCloseDelModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {type === "product" ? (
              <>
                你是否要刪除
                <span className="text-danger fw-bold">
                  {tempProduct?.title}
                </span>
              </>
            ) : (
              <>
                你是否要刪除訂單編號：
                <span className="text-danger fw-bold">{tempProduct?.id}</span>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseDelModal}
              type="button"
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              onClick={handleDeleteProduct}
              type="button"
              className="btn btn-danger"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// **🔹 PropTypes 驗證**
DelProductModal.propTypes = {
  tempProduct: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default DelProductModal;
