import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { PushMessage } from '../../redux/slices/toastSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function FooterAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch(PushMessage);

  const checkUser = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
    } catch (error) {
      const err = error.message
      dispatch(
        PushMessage({
          text: err,
          status: "failed"
        })
      )
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token.length > 0) {
      axios.defaults.headers.common["Authorization"] = token;
      checkUser();
    }
  }, []);

  const handelLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/logout`);
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      navigate("/login");
    } catch (error) {
      const err = `登出失敗:${error.message}`
      dispatch(
        PushMessage({
          text: err,
          status: "failed"
        })
      )
    }
  };
  return (
    <footer className="footer bg-primary">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <Link className="navbar-brand me-7 logo" to={"/"}>
            <img src="./images/icons/Logo.png" alt="logo" />
          </Link>
          <button
            onClick={handelLogout}
            type="button"
            className="btn text-white"
          >
            <i className="bi bi-door-open fs-3"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
