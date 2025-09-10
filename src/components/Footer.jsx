import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-primary">
      <div className="container-fluid">
        <div className="d-md-flex justify-content-md-between align-items-md-center pb-9">
          <div className="pb-6 pb-md-0">
            <Link className="navbar-brand me-7 logo" to={"/"}>
              <img src="./images/icons/Logo.png" alt="logo" />
            </Link>
          </div>
          <ul className="d-flex text-white list-unstyled mb-lg-0 mb-6 justify-content-md-end d-md-none">
            <li>
              <Link to={"/"}>
                <i className="bi bi-linkedin fs-3"></i>
              </Link>
            </li>
            <li className="ps-8">
              <a href="https://github.com/sammy1208/react-project-camp">
                <i className="bi bi-github  fs-3"></i>
              </a>
            </li>
            <li className="ps-8">
              <Link to="/login">
                <i className="bi bi-person-circle fs-3"></i>
              </Link>
            </li>
          </ul>
          <ul className="text-white list-unstyled fs-10 fs-md-9 d-flex m-0">
            <li className="footer-li">
              <Link to={"/Products"}>產品資訊</Link>
            </li>
            <li className="footer-li ps-12">
              <Link to={"/aboutUs"}>關於青松</Link>
            </li>
            <li className="footer-li ps-12">
              <Link to={"/KnowledgePage"}>知識專欄</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-md-between align-items-md-end pb-9 py-md-9 ">
          <div className="text-white fs-10 fs-md-9">
            <p>統一編號：77776666</p>
            <p>CampEase 青松露營股份有限公司</p>
            <p>100 台北市中正區重慶南路一段 122 號</p>
          </div>
          <div className="d-none d-md-block">
            <ul className="text-white list-unstyled d-flex m-0">
              <li>
                <Link to={"/"}>
                  <i className="bi bi-linkedin fs-md-4"></i>
                </Link>
              </li>
              <li className="ps-8">
                <a href="https://github.com/sammy1208/react-project-camp">
                  <i className="bi bi-github fs-md-4"></i>
                </a>
              </li>
              <li className="ps-8">
                <Link to="/login">
                  <i className="bi bi-person-circle fs-md-4"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-white fs-11 fs-md-10 mt-9">
          © Copyright 2024 CampEase. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
