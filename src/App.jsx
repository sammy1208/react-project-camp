import { useEffect, useState } from 'react'
import axios from 'axios'


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

function App({ setIsAuth }) {
  const [products, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDleModalOpen, setIsDleModalOpen] = useState(false);

  const handleOpenModal = (mode, product) => {
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempProduct({...defaultModalState});
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
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProduct(res.data.products);
      setPageInfo(res.data.pagination);
      console.log(res.data)
    } catch (error) {
      alert(error.data.message)
    }
  };

  const checkUser = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      getProduct();
      setIsAuth(true);
    } catch (error) {
      alert(error.data.message)
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    axios.defaults.headers.common["Authorization"] = token;

    checkUser();
  }, []);

  const [modalMode, setModalMode] = useState(null);
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  return (
    <>
        <main className="container-lg">
    <div className="pt-8 pb-14 pt-md-18 pb-md-23">
      <div className="row">
        <div className="col-3">
          <p className="fs-8 fw-bold mb-6">產品分類</p>
          <ul className="list-unstyled">
            <li className="mb-4">
              <a href="" className="py-8 border-bottom w-100">新品報到</a>
            </li>
            <li className="mb-4">
              <a href="" className="py-8 border-bottom w-100">冠軍排名</a>
            </li>
            <li className="mb-4">
              <a href="" className="py-8 add-icon border-bottom">限時搶購</a>
            </li>
            <li className="mb-4">
              <a href="" className="py-8 add-icon border-bottom">青松｜帳篷系列</a>
            </li>
            <li className="mb-4">
              <a href="" className="py-8 add-icon border-bottom">青松｜環保系列</a>
            </li>
          </ul>
        </div>
        <div className="col">
          <nav aria-label="breadcrumb" className=" pb-4 pb-md-8">
            <ol className="breadcrumb mb-lg-7 mb-3 fs-10">
              <li className="breadcrumb-item"><a href="#">首頁</a></li>
              <li className="breadcrumb-item" aria-current="page"><a href="#">青松·帳篷系列</a></li>
              <li className="breadcrumb-item active" aria-current="page"><a href="#">標準帳篷</a></li>
            </ol>
          </nav>
          <div className="pb-md-10 pb-8 border-bottom">
            <h5 className="mb-4">經典設計，可靠守護你的露營時光</h5>
            <p>充氣帳篷以其快速搭建、輕便攜帶的特性，成為露營愛好者的新寵。無需繁瑣的支架安裝，僅需幾分鐘即可完成搭建，省時又省力。堅固的氣柱結構，具備卓越的抗風與穩定性，無論是家庭露營還是好友野營，都能提供安全舒適的居住空間。讓你專注享受大自然，而非繁瑣的搭帳過程。</p>
          </div>
          <p className="fs-10 text-gray-70 py-md-10 py-8">共 5 項商品</p>

          <div className="row gy-10">
            {products.map((product) =>(
              <div className="col-4">
              <div className="card mb-3 border-0 h-100">
                <div className="mb-md-6 mb-2 bg-gray-30 rounded-3 card-padding h-100">
                  <img src={product.imageUrl} className="" alt="..."/>
                </div>
                <div className="card-body p-0">
                  <h5 className="card-title fs-md-8 fs-10 fw-normal text-gray-100 m-0 mb-md-2">{product.title}</h5>
                  <p className="card-text fs-md-10 fs-11 text-gray-70 mb-md-4 mb-2">{product.description}</p>
                  <p className="card-text fs-md-8 fs-9 fw-bold text-gray-100"><small className="text-muted">{`$${product.price}`}</small></p>
                </div>
              </div>
            </div>
            ))}
          </div>

          <nav aria-label="..." className="d-flex justify-content-md-center justify-content-center mt-16">
            <ul className="pagination m-0 d-flex align-items-center justify-content-center">
              <li className="page-item">
                <a className="page-link border-0 text-gray-80">
                  <span className="material-symbols-outlined  d-flex align-items-center">
                    chevron_left
                  </span></a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-gray-70" href="#">1</a>
              </li>
              <li className="page-item" aria-current="page">
                <a className="page-link border-0 text-gray-70" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-gray-70" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-gray-70" href="#">...</a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-gray-70" href="#">10</a>
              </li>
              <li className="page-item">
                <a className="page-link  border-0 text-gray-70" href="#">
                  <span className="material-symbols-outlined  d-flex align-items-center">
                    chevron_right
                  </span></a>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </div>
  </main>
    </>
  );
}

export default App
