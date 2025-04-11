import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css/navigation";
import "swiper/css";

export default function Banner({ imageUrl, data, title, type }) {
  if (type === "carousel" && Array.isArray(data)) {
      const swiperRef = useRef(null)

      const handleNextSlide = () => {
        if (swiperRef.current.isEnd) {
          swiperRef.current.slideTo(0)
        } else {
          swiperRef.current.slideNext()
        }
      }
    
      const handlePrevSlide = () => {
        if (swiperRef.current.isBeginning) {
          swiperRef.current.slideTo(swiperRef.current.slides.length - 1)
        } else {
          swiperRef.current.slidePrev()
        }
      }

    return (
      <>
        <Swiper
          onSwiper={(swiper) =>
            swiperRef.current = swiper
          }
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="banner-carousel position-relative"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="container text-white text-center">
                    <h1 className="fw-bold mb-13 fs-md-1 fs-3">
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
              <ul className="pagination m-0 d-flex align-items-center justify-content-center position-absolute start-50 end-100 pb-15 translate-middle-y">
                <li className="page-item">
                  <button
                    type="button"
                    className={`btn border-0 fs-md-9 fs-10 page-hover py-8`}
                    onClick={() => handlePrevSlide()}
                  >
                    <i className="bi bi-arrow-left d-flex align-items-center text-white fs-4"></i>
                  </button>
                </li>
                <li className={`page-item`}>
                  <button
                    type="button"
                    className={`btn border-0 fs-md-9 fs-10 page-hover py-8`}
                    onClick={() => handleNextSlide()}
                  >
                    <i className="bi bi-arrow-right d-flex align-items-center text-white fs-4"></i>
                  </button>
                </li>
              </ul>

            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  } else if (type === "static") {
    return (
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="banner-static d-flex flex-column"
      >
        <div className="container text-white text-center h-100 d-flex flex-column justify-content-center">
          <h1 className="fw-bold fs-md-1 fs-3">{title}</h1>
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
  type: PropTypes.oneOf(["carousel", "static", "default"]).isRequired
};
