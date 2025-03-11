import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import Header from "../components/header";
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

export default function Banner({imageUrl, data, title, type, className}) {
  if (type === "carousel") {
    return (
      <Swiper modules={[Navigation]} navigation>
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="banner"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <Header className={className}/>
              <div className="d-flex flex-column h-100 justify-content-center">
                <div className="container text-white text-center">
                  <h1 className="fw-bold fs-1 mb-md-13">
                    {item.title}
                    <br />
                    {item.description}
                  </h1>
                  <a
                    className="btn btn-primary text-white fw-bold py-md-8 px-md-18"
                    href="#"
                    role="button"
                  >
                    立即選購
                  </a>
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
      className="banner-Products d-flex flex-column">
            <Header className={className}/>
        <div className="container text-white text-center h-100 d-flex flex-column justify-content-center">
          <h1 className="fw-bold fs-1">{title}</h1>
        </div>
      </div>
    );
  } else {
    return (
        <Header className={className}/>
    );
  }
}
