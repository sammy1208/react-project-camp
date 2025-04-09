import React from "react";
import PropTypes from "prop-types";

export default function SectionTitle({ subtitle, title, subtitleColor, titleColor }) {
  return (
    <>
      <p className={`${subtitleColor} text-center pb-md-2 fs-md-9 fs-10`}>
        {subtitle}
      </p>
      <h2 className={`${titleColor} text-center pb-md-17 pb-10 h4 fs-md-2`}>{title}</h2>
    </>
  );
}

// **PropTypes 驗證**
SectionTitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitleColor: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};
