import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCartNum } from "../redux/slices/cartSlice";
import { getCart } from "../redux/slices/apiSlice";
import { PushMessage } from "../redux/slices/toastSlice";
import axios from "axios";
import ScreenLoading from "../components/ScreenLoading";
import ProductLmg from "../components/ProductLmg";
import SectionTitle from "../components/SectionTitle";
import DelModal from "../components/DelModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const currentSelection = useSelector(
    (state) => state.product.selectedProduct
  );
  const [total, setTotal] = useState(0);
  const carts = useSelector((state) => state.cart);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (carts) {
      const product = carts.carts?.map((item) => {
        return item.product.origin_price * item.qty;
      });
      const totalOriginPrice = product.reduce((acc, item) => acc + item, 0);
      setTotal(totalOriginPrice);
    }
  }, [carts]);

  const openClearCartModal = async () => {
    setIsDelModalOpen(true);
  };

  const removeCartItem = async (cartItem_id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);

      dispatch(getCart());
      dispatch(clearCartNum());
    } catch {
      dispatch(
        PushMessage({
          text: "刪除購物車失敗",
          status: "failed"
        })
      );
    } finally {
      setIsScreenLoading(false);
    }
  };

  const updateCartItem = async (cartItem_id, product_id, qty) => {
    setIsScreenLoading(true);
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
        data: {
          product_id,
          qty: Number(qty)
        }
      });

      dispatch(getCart());
    } catch {
      dispatch(
        PushMessage({
          text: "更新購物車品項失敗",
          status: "failed"
        })
      );
    } finally {
      setIsScreenLoading(false);
    }
  };

  const getSelectProduct = (id) => {
    const matchedSelection = currentSelection.find((product) => id === product.id);
    return matchedSelection || null;
  };

  const handleProductList = () => {
    Navigate("/Products");
  };

  return (
    <>
      <article className="container-default">
        <div className="container">
          <SectionTitle
            subtitle="Shopping Cart"
            title="購物車"
            subtitleColor="text-primary"
            titleColor=""
          />
          {carts.carts?.length > 0 ? (
            <div>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="p-1">
                    {carts.carts?.map((cartItem) => (
                      <div className="mb-3 pb-6" key={cartItem.id}>
                        <div className="row py-6">
                          <div className="mb-0 rounded-4 col-5">
                            <ProductLmg
                              img={cartItem.product?.imageUrl}
                              product={cartItem.product}
                            />
                          </div>
                          <div className="col-7">
                            <div className="d-flex justify-content-between align-items-start">
                              <p className="fs-9 fs-md-8 pb-2 fw-bold">
                                {cartItem.product.title}
                              </p>
                              {getSelectProduct(cartItem.product?.id) && (
                                <p className="fs-11 fs-md-10 text-gray-70 pb-3">
                                  {`${
                                    getSelectProduct(cartItem.product?.id).color
                                  } / ${
                                    getSelectProduct(cartItem.product?.id).specs
                                  }`}
                                </p>
                              )}
                                                        <button
                              onClick={() => removeCartItem(cartItem.id)}
                              type="button"
                              className="badge rounded-pill p-0 cursor-pointer border-0 bg-transparent"
                            >
                              <i className="bi bi-x text-gray-80 fs-4"></i>
                            </button>
                            </div>
                            <div className="d-flex align-items-center pb-5 ">
                              <p className="fs-9 fs-md-8 text-decoration-line-through text-gray-70 pe-4">{`$${cartItem.product.origin_price}`}</p>
                              <p className="fs-9 fs-md-8 fw-bold text-primary">{`$${cartItem.product.price?.toLocaleString(
                                "zh-Hant-TW"
                              )}`}</p>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center pt-4 input-group w-100">
                              <button
                                type="button"
                                className="btn border-0 p-1"
                                onClick={() =>
                                  updateCartItem(
                                    cartItem.id,
                                    cartItem.product.id,
                                    cartItem.qty - 1
                                  )
                                }
                                disabled={cartItem.qty === 1}
                              >
                                <i className="bi bi-dash-square-fill fs-6 me-2 text-primary"></i>
                              </button>
                              <div className="form-control p-0 mt-1 text-center">
                                {cartItem.qty}
                              </div>
                              <button
                                type="button"
                                className="btn border-0 p-1"
                                onClick={() =>
                                  updateCartItem(
                                    cartItem.id,
                                    cartItem.product.id,
                                    cartItem.qty + 1
                                  )
                                }
                              >
                                <i className="bi bi-plus-square-fill fs-6 me-2 text-primary"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-1">
                    <div className="border p-8 mb-4 rounded">
                      <h5 className="fw-bold mb-4">明細</h5>
                      <table className="table text-muted border-bottom">
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 pt-4 text-gray-90"
                            >
                              總計金額
                            </th>
                            <td className="text-end border-0 px-0 pt-4 text-gray-70">
                              {`NT$${total.toLocaleString("zh-Hant-TW")}`}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 pt-0 pb-4 text-gray-90"
                            >
                              折扣金額
                            </th>
                            <td className="text-end border-0 px-0 pt-0 pb-4 text-gray-70">
                              {`- NT$${(total - carts.final_total).toLocaleString(
                                "zh-Hant-TW"
                              )}`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-between my-8">
                        <p className="mb-0 fs-7 fw-bold">總計金額</p>
                        <p className="mb-0 fs-7 fw-bold text-primary">
                          {`NT$${carts.final_total?.toLocaleString(
                            "zh-Hant-TW"
                          )}`}
                        </p>
                      </div>
                      <div className="d-flex">
                        <button
                          onClick={openClearCartModal}
                          className="btn btn-outline-primary btn-addCart fw-bold py-md-8 py-6 w-100 me-4"
                          type="button"
                        >
                          清空購物車
                        </button>
                        <Link
                          to={"/Checkout-Form"}
                          type="button"
                          className="btn btn-primary text-white fw-bold py-md-8 py-6 w-100 me-4"
                        >
                          結帳
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <img
                  src="./青松露營w.svg"
                  alt="logo"
                  style={{ height: "100px" }}
                />
                <h5 className="d-flex justify-content-center py-12 text-gray-80">
                  {`購物車還沒有商品喔  >~<`}
                </h5>
                <button
                  onClick={() => handleProductList()}
                  className="btn btn-primary text-white btn-addCart fw-bold py-md-8 py-6 ms-auto"
                  type="button"
                >
                  去逛逛產品
                </button>
              </div>
            </>
          )}
        </div>
      </article>
      <DelModal isOpen={isDelModalOpen} setIsOpen={setIsDelModalOpen}></DelModal>
      <ScreenLoading isLoading={isScreenLoading} />
    </>
  );
}
