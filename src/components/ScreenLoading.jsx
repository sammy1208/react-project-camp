import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from "react-loading";

export default function ScreenLoading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999
          }}
        >
          <ReactLoading
            type="spokes"
            color="#638C6D"
            width="4rem"
            height="4rem"
          />
        </div>
      )}
    </>
  );
}

// **PropTypes 驗證**
ScreenLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};