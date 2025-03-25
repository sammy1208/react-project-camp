import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css/navigation";
import "swiper/css";

export default function Banner({ imageUrl, data, title, type }) {
  if (type === "carousel" && Array.isArray(data)) {
    return (
      <Swiper modules={[Navigation]} navigation>
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="banner-carousel"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="d-flex flex-column h-100 justify-content-center">
                <div className="container text-white text-center">
                  <h1 className="fw-bold fs-1 mb-md-13">
                    {item.title}
                    <br />
                    {item.description}
                  </h1>
                  <Link
                    className="btn btn-primary text-white fw-bold py-md-8 px-md-18"
                    to={"/Products"}
                    role="button"
                  >
                    立即選購
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  } else if (type === "static") {
    return (
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="banner-static d-flex flex-column"
      >
        <div className="container text-white text-center h-100 d-flex flex-column justify-content-center">
          <h1 className="fw-bold fs-1">{title}</h1>
        </div>
      </div>
    );
  } else if (type === "default") {
    return null; 
  }
}

// **PropTypes 驗證**
Banner.propTypes = {
  imageUrl: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  title: PropTypes.string,
  type: PropTypes.oneOf(["carousel", "static", "default"]).isRequired,
};