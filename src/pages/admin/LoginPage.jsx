import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScreenLoading from "../../components/ScreenLoading";
import Header from "../../components/header";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const routes = [
    { path: "/", name: "首頁" },
];
const layoutClass = "bg-primary";

function LoginPage( ) {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [account, setAccount] = useState({
    username: "qa821746@gmail.com",
    password: "az821746"
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { value, name } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = `${token}`;
      navigate("/admin/productList");
    } catch (error) {
      alert(`登入失敗`)
    }
  };

  const checkUser = async () => {
    setIsScreenLoading(true)
    try {
        await axios.post(`${BASE_URL}/v2/api/user/check`);
        navigate("/admin/productList");
    } catch (error) {
      console.log("驗證失敗，可能是因為用戶已登出");
    } finally {
      setIsScreenLoading(false)
    }
  }

  useEffect(() => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    if(token.length > 0){
      axios.defaults.headers.common["Authorization"] = token;
      checkUser();
    }

  },[])

  return (
    <>
    < Header className={layoutClass} routes={routes} />
    <article className="container-default">
      <div className="container">
        <p className="text-center pb-md-2">Administrator Login</p>
        <h2 className="text-center pb-md-17 pb-12">登入後台頁面</h2>
        <div className="row justify-content-center">
          <div className="col-6">
            <form onSubmit={handleLogin} className="d-flex flex-column gap-7">
              <div className="form-floating mb-3">
                <input
                  name="username"
                  value={account.username}
                  onChange={handleInput}
                  type="email"
                  className="form-control"
                  id="username"
                  placeholder="name@example.com"
                />
                <label htmlFor="username">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  name="password"
                  value={account.password}
                  onChange={handleInput}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary text-white">登入</button>
            </form>
            <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
          </div>
        </div>

      </div>
    </article>
    <ScreenLoading isLoading={isScreenLoading} />

    </>
  );
}

export default LoginPage;
