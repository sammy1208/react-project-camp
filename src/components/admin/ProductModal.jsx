import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
function ProductModal({
  modalMode,
  tempProduct,
  isOpen,
  setIsOpen,
  getProduct
}) {
  const [modalData, setModalData] = useState(tempProduct);

  const productModalRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setModalData({
      ...tempProduct
    });
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file-to-upload", file);

    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/admin/upload`,
        formData
      );
      const uploadedImageUrl = res.data.imageUrl;

      setModalData({
        ...modalData,
        imageUrl: uploadedImageUrl
      });
      fileInputRef.current.value = "";
    } catch {
      dispatch(
        PushMessage({
          text: "上傳失敗",
          status: "failed"
        })
      );
    }
  };

  const handleInputChange = (e) => {
    const { value, name, checked, type } = e.target;
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;

    const newImages = [...modalData.imagesUrl];

    newImages[index] = value;

    setModalData({
      ...modalData,
      imagesUrl: newImages
    });
  };

  const handleAddImage = () => {
    const newImages = [...modalData.imagesUrl, ""];

    setModalData({
      ...modalData,
      imagesUrl: newImages
    });
  };

  const handleRemoveImage = () => {
    const newImages = [...modalData.imagesUrl];

    newImages.pop();

    setModalData({
      ...modalData,
      imagesUrl: newImages
    });
  };

  const handleUpdateProduct = async () => {
    const apiCall = modalMode === "create" ? createProduct : updateProduct;

    try {
      await apiCall();

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

  const createProduct = async () => {
    return await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`, {
      data: {
        ...modalData,
        origin_price: Number(modalData.origin_price),
        price: Number(modalData.price),
        is_enabled: modalData.is_enabled ? 1 : 0
      }
    });
  };

  const updateProduct = async () => {
    return await axios.put(
      `${BASE_URL}/v2/api/${API_PATH}/admin/product/${modalData.id}`,
      {
        data: {
          ...modalData,
          origin_price: Number(modalData.origin_price),
          price: Number(modalData.price),
          is_enabled: modalData.is_enabled ? 1 : 0
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
              <div className="col-md-4">
                <div className="mb-5">
                  <label htmlFor="fileInput" className="form-label">
                    {" "}
                    圖片上傳{" "}
                  </label>
                  <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="form-control"
                    id="fileInput"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="primary-image" className="form-label">
                    主圖
                  </label>
                  <div className="input-group">
                    <input
                      value={modalData.imageUrl}
                      onChange={handleInputChange}
                      name="imageUrl"
                      type="text"
                      id="primary-image"
                      className="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img
                    src={modalData.imageUrl}
                    alt={modalData.title}
                    className="img-fluid"
                  />
                </div>

                {/* 副圖 */}
                <div className="border border-2 border-dashed rounded-4 p-3">
                  {modalData.imagesUrl?.map((image, index) => (
                    <div key={index} className="mb-2">
                      <label
                        htmlFor={`imagesUrl-${index + 1}`}
                        className="form-label"
                      >
                        副圖 {index + 1}
                      </label>
                      <input
                        value={image}
                        onChange={(e) => handleImageChange(e, index)}
                        id={`imagesUrl-${index + 1}`}
                        type="text"
                        placeholder={`圖片網址 ${index + 1}`}
                        className="form-control mb-2"
                      />
                      {image && (
                        <img
                          src={image}
                          alt={`副圖 ${index + 1}`}
                          className="img-fluid mb-2"
                        />
                      )}
                    </div>
                  ))}

                  <div className="btn-group w-100">
                    {modalData.imagesUrl.length < 5 &&
                      modalData.imagesUrl[modalData.imagesUrl.length - 1] !==
                        "" && (
                        <button
                          onClick={handleAddImage}
                          className="btn btn-outline-primary btn-sm w-100"
                        >
                          新增圖片
                        </button>
                      )}

                    {modalData.imagesUrl.length > 1 && (
                      <button
                        onClick={handleRemoveImage}
                        className="btn btn-outline-danger btn-sm w-100"
                      >
                        取消圖片
                      </button>
                    )}
                  </div>
                </div>
              </div>

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
                  <label htmlFor="category" className="form-label">
                    分類
                  </label>
                  <input
                    value={modalData.category}
                    onChange={handleInputChange}
                    name="category"
                    id="category"
                    type="text"
                    className="form-control"
                    placeholder="請輸入分類"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="unit" className="form-label">
                    單位
                  </label>
                  <input
                    value={modalData.unit}
                    onChange={handleInputChange}
                    name="unit"
                    id="unit"
                    type="text"
                    className="form-control"
                    placeholder="請輸入單位"
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label htmlFor="origin_price" className="form-label">
                      原價
                    </label>
                    <input
                      value={modalData.origin_price}
                      onChange={handleInputChange}
                      name="origin_price"
                      id="origin_price"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="price" className="form-label">
                      售價
                    </label>
                    <input
                      value={modalData.price}
                      onChange={handleInputChange}
                      name="price"
                      id="price"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    產品描述
                  </label>
                  <textarea
                    value={modalData.description}
                    onChange={handleInputChange}
                    name="description"
                    id="description"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    說明內容
                  </label>
                  <textarea
                    value={modalData.content}
                    onChange={handleInputChange}
                    name="content"
                    id="content"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入說明內容"
                  ></textarea>
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
              onClick={handleUpdateProduct}
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

ProductModal.propTypes = {
  modalMode: PropTypes.oneOf(["create", "edit"]).isRequired, // 限定只能是 "create" 或 "edit"
  tempProduct: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    unit: PropTypes.string,
    origin_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    content: PropTypes.string,
    is_enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]), // 可能是布林值或數字
    imageUrl: PropTypes.string,
    imagesUrl: PropTypes.arrayOf(PropTypes.string) // 陣列內為字串
  }).isRequired,
  isOpen: PropTypes.bool.isRequired, // 是否開啟 Modal
  setIsOpen: PropTypes.func.isRequired, // 設置 Modal 狀態
  getProduct: PropTypes.func.isRequired // 取得產品列表
};

export default ProductModal;
