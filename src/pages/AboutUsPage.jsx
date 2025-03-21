import React from 'react';
import { useSelector } from "react-redux";

export default function AboutUsPage() {
  const { brandTimeline, brandStory, responsibility } = useSelector(
    (state) => state.siteContent
  );
  return (
    <>
      <article className="container-index">
        <div className="container">
          <p className="text-center pb-md-2 text-primary">Brand Timeline</p>
          <h2 className="text-center pb-md-17 pb-12">品牌年表</h2>
          <div className="row row-cols-md-5 row-cols-1 d-flex align-items-end">
            {brandTimeline.map((data, index) => (
              <div className="col" key={index}>
                <div
                  className={`row d-flex justify-content-between ${
                    index % 2 === 0
                      ? "pt-md-15 pt-0 flex-md-column flex-row pb-10 pb-md-0"
                      : "align-self-start pb-md-15 pb-0 flex-md-column-reverse flex-row-reverse"
                  }`}
                >
                  <div className="col">
                    <div className="pb-md-6 pb-0 pe-10 pe-md-0">
                      <p className="fs-lg-1 fs-2 fw-light text-primary">
                        {data.time}
                      </p>
                      <p>{data.description}</p>
                    </div>
                  </div>
                  <div className="col">
                    <img className="rounded-4" src={data.imageUrl} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="container-index bg-primary">
        <div className="container">
          <p className="text-white text-center pb-md-2">Brand story</p>
          <h2 className="text-white text-center pb-md-17 pb-12">品牌故事</h2>
          <div className="row row-cols-md-3 row-cols-1 justify-content-center text-white pb-10 pb-md-14 gy-10">
            <div className="col">
              <p>{brandStory.content01}</p>
            </div>
            <div className="col">
              <p>{brandStory.content02}</p>
            </div>
            <div className="col">
              <p>{brandStory.content03}</p>
            </div>
          </div>
          <h5 className="text-center text-white pb-md-14 pb-10">
            {brandStory.title}
          </h5>
          <div className="text-center text-white fs-10">
            <img src={brandStory.imageUrl} alt={brandStory.type} />
            <p className="pt-md-8 pt-6 fs-11 fs-md-10">{brandStory.type}</p>
          </div>
        </div>
      </article>

      <article className="container-index">
        <div className="container">
          <p className="text-center pb-md-2 text-primary">Responsibility</p>
          <h2 className="text-center pb-md-17 pb-12">社會責任</h2>
          {responsibility.map((res, index) => (
            <div
              key={index}
              className={`row d-flex justify-content-center pb-md-18 pb-12 ${
                index % 2 === 0
                  ? "flex-column-reverse flex-md-row-reverse"
                  : "flex-column-reverse flex-md-row"
              }`}
            >
              <div
                className={`col-md-4 d-flex align-items-center ${
                  index % 2 === 0
                    ? "offset-md-1 justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div className="pb-md-6 pb-0 pe-10 pe-md-0">
                  <p className="fs-md-3 fs-7 fw-bold pb-2 pb-md-8">
                    {res.title}
                  </p>
                  <p>{res.content}</p>
                </div>
              </div>
              <div
                className={`col-md-5 ${index % 2 === 0 ? "" : "offset-md-1"}`}
              >
                <img
                  className="rounded-4 w-100 pb-6 pb-md-0"
                  src={res.imageUrl}
                  alt={res.title}
                  style={{ height: "395px", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
