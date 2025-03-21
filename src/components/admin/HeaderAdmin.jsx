import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin({ routes }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScrollRef = useRef(null);

  useEffect(() => {
    handleScrollRef.current = () => {
      if (window.scrollY > 560) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScrollRef.current);

    return () => {
      window.removeEventListener("scroll", handleScrollRef.current);
    };
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: "2",
        backgroundColor: isScrolled ? "#638C6D" : "transparent",
        transition: "background-color 0.3s ease"
      }}
      className={`bg-primary w-100`}
    >
      <div
        className={`navbar navbar-expand-lg navbar-dark py-md-10 py-6`}
        style={{ transition: "1s" }}
      >
        <div className="container-fluid d-block">
          <div className="d-flex">
            <NavLink className="navbar-brand me-7 logo p-0" to={"/"}>
              <img src="./images/icons/Logo.png" alt="logo" />
            </NavLink>
            <div className="ms-auto d-flex">
              <ul className="list-unstyled d-flex align-items-center m-0">
                {routes.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <NavLink
                      className="nav-link text-white px-4"
                      to={item.path}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// **PropTypes 驗證**
HeaderAdmin.propTypes = {
  routes: PropTypes.array.isRequired,
};
