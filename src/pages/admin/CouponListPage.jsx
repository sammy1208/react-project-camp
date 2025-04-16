import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/admin/Pagination";
import ScreenLoading from "../../components/ScreenLoading";
import { useDispatch } from "react-redux";
import { PushMessage } from "../../redux/slices/toastSlice";
import CouponModal from "../../components/admin/CouponModal";
import DelCouponModal from "../../components/admin/DelCouponModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  title: "",
  is_enabled: 0,
  percent: "",
  due_date: "",
  code: ""
};

function CouponListPage() {
  const [coupons, setCoupons] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const dispatch = useDispatch();
  const [modalMode, setModalMode] = useState(null);
  const [isDleModalOpen, setIsDleModalOpen] = useState(false);
  const [tempCoupons, setTempCoupons] = useState(defaultModalState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (mode, product) => {
    setModalMode(mode);
    switch (mode) {
      case "create":
        setTempCoupons({ ...defaultModalState });
        break;

      case "edit":
        setTempCoupons(product);
        break;
    }
    setIsModalOpen(true);
  };

  const getCoupon = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`
      );
      setCoupons(res.data.coupons);
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
      getCoupon(1);
    }
  }, []);

  const handleOpenDelModal = (product) => {
    setTempCoupons(product);
    setIsDleModalOpen(true);
  };

  return (
    <>
      <div className="container-default">
        <div className="container">
          <p className="text-center pb-md-2">Manage Coupon</p>
          <h2 className="text-center pb-md-17 pb-12">管理優惠卷</h2>
          <div className="row justify-content-center">
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
                    <th scope="col">優惠卷編號</th>
                    <th scope="col">到期時間</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((product) => (
                    <tr key={product.id}>
                      <th scope="row">{product.code}</th>
                      <td>
                        {new Date(product.due_date * 1000).toLocaleString()}
                      </td>
                      <td>
                        {product.is_enabled ? (
                          <span className="text-success">啟用</span>
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
              products={coupons}
              pageInfo={pageInfo}
              onPageChange={getCoupon}
            />
          )}
        </div>
      </div>
      {modalMode && (
        <CouponModal
          modalMode={modalMode}
          tempCoupons={tempCoupons}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          getCoupon={getCoupon}
        />
      )}
      <DelCouponModal
        tempCoupons={tempCoupons}
        isOpen={isDleModalOpen}
        setIsOpen={setIsDleModalOpen}
        getCoupon={getCoupon}
      />
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}

export default CouponListPage;
