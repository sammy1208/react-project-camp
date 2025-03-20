import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const routes = [
    { path: "/", name: "首頁" },
];

function LoginPage( ) {
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
    try {
        await axios.post(`${BASE_URL}/v2/api/user/check`);
        navigate("/admin/productList");
    } catch (error) {
      console.log("驗證失敗，可能是因為用戶已登出");
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
    < Navbar routes={routes} />
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
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
        <button className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
    </>
  );
}

export default LoginPage;
