import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelCouponModal({ tempCoupons, isOpen, setIsOpen, getCoupon }) {
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

  const handleDeleteCoupon = async () => {
    try {
      await deleteProduct();
      getCoupon();
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
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupons.id}`
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
            你是否要刪除
            <span className="text-danger fw-bold">{tempCoupons?.title}</span>
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
              onClick={handleDeleteCoupon}
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
DelCouponModal.propTypes = {
  tempCoupons: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  getCoupon: PropTypes.func.isRequired
};

export default DelCouponModal;
