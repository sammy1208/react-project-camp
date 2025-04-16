import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CouponModal({
  modalMode,
  tempCoupons,
  isOpen,
  setIsOpen,
  getCoupon
}) {
  const [modalData, setModalData] = useState(tempCoupons);

  const productModalRef = useRef(null);

  useEffect(() => {
    setModalData({
      ...tempCoupons,
      due_date: tempCoupons.due_date ? String(tempCoupons.due_date) : ""
    });
  }, [tempCoupons]);

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
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUpdateCoupon = async () => {
    const apiCall = modalMode === "create" ? createCoupon : updateCoupon;

    try {
      await apiCall();

      getCoupon();

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

  const createCoupon = async () => {
    return await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, {
      data: {
        ...modalData,
        due_date: Number(modalData.due_date),
        percent: Number(modalData.percent),
        is_enabled: modalData.is_enabled ? 1 : 0
      }
    });
  };

  const updateCoupon = async () => {
    return await axios.put(
      `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${modalData.id}`,
      {
        data: {
          ...modalData,
          percent: Number(modalData.percent),
          due_date: Number(modalData.due_date),
          is_enabled: modalData.is_enabled ? 1 : 0
        }
      }
    );
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    getCoupon();

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
            <h5 className="modal-title fs-4">
              {modalMode === "create" ? "新增產品" : "編輯產品"}
            </h5>
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4">
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    標題
                  </label>
                  <input
                    value={modalData.title}
                    onChange={handleInputChange}
                    name="title"
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入標題"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="code" className="form-label">
                    code
                  </label>
                  <input
                    value={modalData.code}
                    onChange={handleInputChange}
                    name="code"
                    id="code"
                    type="text"
                    className="form-control"
                    placeholder="請輸入code"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="percent" className="form-label">
                    折扣
                  </label>
                  <input
                    value={modalData.percent}
                    onChange={handleInputChange}
                    name="percent"
                    id="percent"
                    type="text"
                    className="form-control"
                    placeholder="請輸入折扣"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="due_date" className="form-label">
                    到期日
                  </label>
                  <select
                    name="due_date"
                    id="due_date"
                    value={String(modalData.due_date)}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">請選擇到期日</option>
                    <option
                      value={String(
                        Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
                      )}
                    >
                      7 天後
                    </option>
                    <option
                      value={String(
                        Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60
                      )}
                    >
                      14 天後
                    </option>
                    <option
                      value={String(
                        Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
                      )}
                    >
                      30 天後
                    </option>
                    <option
                      value={String(
                        Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60
                      )}
                    >
                      60 天後
                    </option>
                  </select>
                  {modalData.due_date && (
                    <p className="text-muted mt-1">
                      選擇的到期日為：
                      {new Date(
                        Number(modalData.due_date) * 1000
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="form-check">
                  <input
                    checked={modalData.is_enabled}
                    onChange={handleInputChange}
                    name="is_enabled"
                    type="checkbox"
                    className="form-check-input"
                    id="isEnabled"
                  />
                  <label className="form-check-label" htmlFor="isEnabled">
                    是否啟用
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
              onClick={handleUpdateCoupon}
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

CouponModal.propTypes = {
  modalMode: PropTypes.oneOf(["create", "edit"]).isRequired,
  tempCoupons: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    code: PropTypes.string,
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    due_date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    is_enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  getCoupon: PropTypes.func.isRequired
};

export default CouponModal;
