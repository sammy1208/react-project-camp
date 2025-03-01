import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { useParams } from "react-router-dom";
import ProductLmg from "../components/ProductLmg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsDetailPage () {
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [isLoading, setIsLoading] = useState(false)


  const { id: product_id } = useParams();//因為有重新命名

    useEffect(() =>{
      const getProduct = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`)
          setProduct(res.data.products[0])
          console.log(res.data.products[0])
        } catch (error) {
          alert("取得產品失敗")
        };
      }
      getProduct()
    },[])

  // useEffect(() => {
  //     const getProduct = async () => {
  //     //   setIsScreenLoading(true);
  //       try {
  //         const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
  //         setProduct(res.data.products[0]);
  //       } catch (error) {
  //         alert("取得產品失敗");
  //       } finally {
  //         // setIsScreenLoading(false);
  //       }
  //     };
  //     getProduct();
  // }, []);

  // const addCartItem = async (product_id, qty) =>{
  //     setIsLoading(true);
  //     try {
  //       await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
  //         data: {
  //         product_id,
  //         qty: Number(qty)
  //       }
  //       });
  //       alert(`加入購物車成功`)
  //     } catch (error) {
  //       alert(`加入購物車失敗`)
  //     } finally {
  //       setIsLoading(false);
  //     }
  // }
    return (
        <div className="container">
        <main className="pt-8 pb-14 pt-md-18 pb-md-23">
          <div className="pb-md-18">
            <nav aria-label="breadcrumb" className="pb-4 pb-md-10">
              <ol className="breadcrumb fs-10 m-0">
                <li className="breadcrumb-item"><a href="#">首頁</a></li>
                <li className="breadcrumb-item" aria-current="page"><a href="#">青松·帳篷系列</a></li>
                <li className="breadcrumb-item active" aria-current="page"><a href="#">標準帳篷</a></li>
              </ol>
            </nav>
            <div className="row">
              <figure className="col-md-7 m-0">
                <div className="mb-md-10 mb-4">
                <div className="bg-gray-30 rounded py-md-10 px-md-8 p-6">
                    <img src={product.imageUrl} className="" alt="..." />
                </div>
                </div>
                <div className="row gx-4 gx-md-10">
                  <div className="col">
                    < ProductLmg img={product.imageUrl}/>
                  </div>
                  <div className="col">
                  < ProductLmg img={product.imageUrl}/>
                  </div>
                  <div className="col">
                  < ProductLmg img={product.imageUrl}/>
                  </div>
                  <div className="col">
                  < ProductLmg img={product.imageUrl}/>
                  </div>
                </div>
              </figure>
      
              <div className="col-md-5 pt-8 pt-md-0">
                <section className="border-bottom mb-9 mb-md-12">
                  <h3 className="pb-md-4 pb-2 fs-7 fs-md-3">{product.title}</h3>
                  <p className="pb-md-4 pb-2 text-gray-70">VIP 會員獨享/VIP 會員獨享/VIP 會員獨享</p>
                  <p className="text-primary pb-md-12 pb-9 fw-bold fs-8 fs-md-4">{`$${product.price}`}</p>
                </section>
      
                <div className="mb-6 mb-md-10">
                  <p className="fs-md-9 fs-10 mb-md-6 mb-4">顏色</p>
                  <ul className="list-unstyled d-flex m-0">
                      <li className="me-lg-5 me-3">
                        <button type="button" className="btn btn-outline-secondary py-4 px-6 border-gray-40 fw-normal">
                          <p className="fs-7">陽光黃</p>
                        </button>
                      </li>
                      <li className="me-lg-5 me-3">
                        <button type="button" className="btn btn-outline-secondary py-4 px-6 border-gray-40 fw-normal">
                          <p className="fs-7">陽光黃</p>
                        </button>
                      </li>
                      <li className="me-lg-5 me-3">
                        <button type="button" className="btn btn-outline-secondary py-4 px-6 border-gray-40 fw-normal">
                          <p className="fs-7">陽光黃</p>
                        </button>
                      </li>
                    </ul>
                </div>
                <div className="mb-6 mb-md-10">
                  <p className="fs-md-9 fs-10 mb-md-6 mb-4">規格</p>
                  <ul className="list-unstyled d-flex m-0">
                      <li className="me-lg-5 me-3">
                        <button type="button" className="btn btn-outline-secondary py-4 px-6 border-gray-40 fw-normal">
                          <p className="fs-7">陽光黃</p>
                        </button>
                      </li>
                      <li className="me-lg-5 me-3">
                        <button type="button" className="btn btn-outline-secondary py-4 px-6 border-gray-40 fw-normal">
                          <p className="fs-7">陽光黃</p>
                        </button>
                      </li>
                      <li className="me-lg-5 me-3">
                        <button type="button" className="btn btn-outline-secondary py-4 px-6 border-gray-40 fw-normal">
                          <p className="fs-7">陽光黃</p>
                        </button>
                      </li>
                    </ul>
                </div>
                <div className="btn-group d-block mb-9 mb-md-13" role="group" aria-label="Basic example">
                  <p className="fs-md-9 fs-10 mb-md-6 mb-4">數量</p>
                  <div>
                    <button type="button" className="btn p-0">
                      <span className="material-symbols-outlined text-gray-50">
                      add_circle
                      </span>
                    </button>
                    <span className="text-gray-70 px-8">1</span>
                    <button type="button" className="btn p-0">
                      <span className="material-symbols-outlined text-gray-50">
                      do_not_disturb_on
                      </span>
                    </button>
                  </div>
                </div>
                
      
                <div className="list-unstyled d-flex">
                  <a className="btn btn-primary text-white fw-bold py-md-8 py-6 w-100 me-4" href="#" role="button">立即選購</a>
                  <a className="btn btn-outline-primary fw-bold py-md-8 py-6 w-100 me-4" href="#" role="button">立即選購</a>
                  <a className="btn btn-outline-primary fw-bold py-md-8 py-6 d-flex justify-content-center align-items-center" href="#" role="button" style={{width: "51px"}}>
                    <span className="material-symbols-outlined">
                    favorite
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-7 mt-md-13 mt-10">
              <div className="mb-md-12 mb-8">
                <p className="d-flex pb-md-6 pb-2">
                  <a className="btn w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon" data-bs-toggle="collapse" href="#ProductDataPage-1" role="button" aria-expanded="false" aria-controls="collapseExample">
                    產品說明
                  </a>
                </p>
                <div className="collapse" id="ProductDataPage-1">
                  <div className="pb-8 border-bottom">
                    {product.introduce?.map((item, index) => (
                      <p key={index}>{`●${item}`}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-md-12 mb-8">
                <p className="d-flex pb-md-6 pb-2">
                  <a className="btn w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon" data-bs-toggle="collapse" href="#ProductDataPage-2" role="button" aria-expanded="false" aria-controls="collapseExample">
                  注意事項
                  </a>
                </p>
                <div className="collapse" id="ProductDataPage-2">
                  <div className="pb-8 border-bottom">
                    輕巧便攜設計：重量僅1.5公斤，方便隨身攜帶。
                    快速搭建：支架簡易，3分鐘內完成安裝。
                    高效防水功能：採用 PU 防水布料，抵禦中強度雨水。
                    通風透氣結構：雙層設計，確保空氣流通不悶熱。
                    穩定抗風支架：鋁合金支架，抵抗惡劣天氣。
                  </div>
                </div>
              </div>
              <div className="mb-md-12 mb-8">
                <p className="d-flex pb-md-6 pb-2">
                  <a className="btn w-100 text-start fw-bold fs-md-7 fs-9 py-1 px-0 add-icon" data-bs-toggle="collapse" href="#ProductDataPage-3" role="button" aria-expanded="false" aria-controls="collapseExample">
                  產品規格
                  </a>
                </p>
                <div className="collapse" id="ProductDataPage-3">
                  <div className="pb-8 border-bottom">
                    {product.specification?.map((item, index) => (
                      <p key={index}>{`●${item}`}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
      
          </div>
    
          <section className="d-none d-md-block">
            <p className="text-primary text-center pb-md-2">Camping Tips</p>
            <h2 className="text-center pb-md-17">露營知識，不可不知</h2>
            <div className="row justify-content-center">
              <div className="col">
                
              </div>
              <div className="col">
                
              </div>
              <div className="col">
                
              </div>
              <div className="col">
                
              </div>
            </div>
          </section>
        </main>
      </div>
    )
}