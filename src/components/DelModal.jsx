import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { PushMessage } from "../redux/slices/toastSlice";
import { getCart } from "../redux/slices/apiSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelModal({ isOpen, setIsOpen }) {
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
    try {
      await removeCart();
      dispatch(getCart());
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
      )
    }
    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style = "";
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }, 400);
  };

  const handleCloseDelModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  // const deleteProduct = async () => {
  //   try {
  //     await axios.delete(
  //       `${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`
  //     );
  //   } catch {
  //     dispatch(
  //       PushMessage({
  //         text: "刪除產品失敗`",
  //         status: "failed"
  //       })
  //     )
  //   }
  // };

  const removeCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
    } catch {
      dispatch(
        PushMessage({
          text: "刪除購物車失敗",
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
            <h1 className="modal-title fs-5">清空購物車</h1>
            <button
              onClick={handleCloseDelModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要清空購物車?
            {/* <span className="text-danger fw-bold">{carts.title}</span> */}
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseDelModal}
              type="button"
              className="btn btn-secondary text-white"
            >
              取消
            </button>
            <button
              onClick={handleDeleteProduct}
              type="button"
              className="btn btn-danger text-white"
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
DelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default DelModal;
