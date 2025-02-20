const designerList = [
    {
      title: "IF 設計大獎得主",
      name: "Angel Li",
      type: "戶外產品設計師",
      description:
        "專注於戶外用品設計，將功能性與美感結合，作品以高效實用的特質廣受讚譽。她的設計靈感來自自然環境，致力於提升露營體驗。",
      image_pc: "/images/designer/Designer-01.png",
      image_mobile: "/images/designer/Designer-H501.png"
    },
    {
      title: "帳篷界的魔術師",
      name: "Kevin Wang",
      type: "戶外裝備設計師",
      description:
        "擅長設計創新的帳篷結構，曾獲多項專利。他的作品兼具輕量化與穩固性，適合各種極端環境，深受戶外探險家的喜愛。",
      image_pc: "/images/designer/Designer-02.png",
      image_mobile: "/images/designer/Designer-H502.png"
    },
    {
      title: "紅點設計大獎得主",
      name: "Shania Chen",
      type: "工業設計師",
      description:
        "擁有十多年工業設計經驗，以優雅簡約的線條聞名。她的戶外炊具設計以人體工學為核心，為露營者帶來美感與實用兼備的產品。",
      image_pc: "/images/designer/Designer-03.png",
      image_mobile: "/images/designer/Designer-H503.png"
    },
    {
      title: "戶外收納達人",
      name: "Michael Yang",
      type: "戶外收納達人",
      description:
        "專注於露營收納產品設計，解決行李空間問題。他設計的多功能收納袋獲得業界高度評價，將收納效率提升至新高度。",
      image_pc: "/images/designer/Designer-04.png",
      image_mobile: "/images/designer/Designer-H504.png"
    },
    {
      title: "綠色設計獎得主",
      name: "Joanna Lin",
      type: "永續設計師",
      description:
        "專注於環保材質的應用，倡導「愛自然，愛旅行」理念。她的產品強調可回收、可重複使用，深受重視環保的露營族群喜愛。",
      image_pc: "/images/designer/Designer-05.png",
      image_mobile: "/images/designer/Designer-05.png"
    }
  ];
  
  export default function HomePage() {
    return (
      <>
        <section class="container container-index">
          <p class="text-primary text-center pb-md-2 fs-md-9 fs-10">
            Winter Series
          </p>
          <h2 class="text-center pb-md-17 pb-10 h4 fs-md-2">冬眠季大應援</h2>
          <div class="row">
            <div class="col d-none d-md-block"></div>
            <div class="col">
              <div class="row row-cols-2 gy-md-10 gy-8">
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col d-md-none d-block"></div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center pt-md-17 pt-8">
            <a
              class="btn btn-primary text-white fw-bold py-md-8 px-md-18"
              href="#"
              role="button"
            >
              立即選購
            </a>
          </div>
        </section>
  
        <section class="container-index bg-gray-20">
          <div class="container">
            <p class="text-primary text-center pb-md-2 fs-md-9 fs-10">
              tents Series
            </p>
            <h2 class="text-center pb-md-17 pb-10 h4 fs-md-2">帳篷系列</h2>
            <div class="row g-0 d-flex flex-column-reverse flex-md-row">
              <div class="col-md d-flex justify-content-center align-items-center">
                <div class="text-md-end text-center me-md-21">
                  <h3 class="pb-4 pb-md-8 pt-10 pt-md-0 fs-7 fs-md-3">
                    印地安單峰帳
                  </h3>
                  <p>輕量設計，簡易搭建，適合冒險者探索自然。</p>
                  <p class="pb-md-14 pb-8">提供可靠遮蔽，享受純粹的露營體驗。</p>
                  <a
                    class="btn btn-primary text-white fw-bold py-md-8 px-md-18 py-6 px-16"
                    href="#"
                    role="button"
                  >
                    立即選購
                  </a>
                </div>
              </div>
              <div class="col-md">
                <div class="row row-cols-1 gy-md-10 gy-6">
                  <div class="col"></div>
                  <div class="col">
                    <div class="row gx-md-10 gx-6">
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <section class="container container-index">
          <p class="text-primary text-center pb-md-2 fs-md-9 fs-10">
            Outdoor Series
          </p>
          <h2 class="text-center pb-md-17 pb-10 h4 fs-md-2">戶外用品系列</h2>
          <div class="row g-0 d-flex flex-column flex-md-row">
            <div class="col-md">
              <div class="row row-cols-1 gy-md-10 gy-6">
                <div class="col"></div>
                <div class="col">
                  <div class="row gx-md-10 gx-6">
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md d-flex justify-content-center align-items-center">
              <div class="text-md-start text-center ms-md-21">
                <h3 class="pb-4 pb-md-8 pt-10 pt-md-0 fs-7 fs-md-3">
                  印地安單峰帳
                </h3>
                <p>輕量設計，簡易搭建，適合冒險者探索自然。</p>
                <p class="pb-md-14 pb-8">提供可靠遮蔽，享受純粹的露營體驗。</p>
                <a
                  class="btn btn-primary text-white fw-bold py-md-8 px-md-18 py-6 px-16"
                  href="#"
                  role="button"
                >
                  立即選購
                </a>
              </div>
            </div>
          </div>
        </section>
  
        <article class="container-index bg-primary">
          <div class="container">
            <p class="text-white text-center pb-md-2">CampEase design</p>
            <h2 class="text-white text-center pb-md-17 pb-12">
              青松嚴選，頂尖設計
            </h2>
            <div class="row justify-content-center">
              <div class="col-8">
                {designerList.map((designer, index) => (
                  <div
                    class={`row mb-md-16 mb-12 d-flex flex-column-reverse flex-md-row ${
                      index % 2 === 0 ? "flex-md-row" : " flex-md-row-reverse"
                    }`}
                    key={designer.title}
                  >
                    <div class="col-md-7">
                      <div class="text-white text-md-start text-center">
                        <span class="fs-md-10 pb-2 border-bottom">
                          {designer.title}
                        </span>
                        <p class="fs-md-8 fs-9 fw-bold py-4 py-md-6">
                          {`${designer.name}.${designer.type}`}
                        </p>
                        <p class="">{designer.description}</p>
                      </div>
                    </div>
                    <div class="col-md-5 mb-6 mb-md-0 text-center">
                      <picture>
                        <source
                          srcSet={designer.image_mobile}
                          media="(max-width:767px)"
                        />
                        <img
                          src={designer.image_pc}
                          alt={designer.title}
                          class="designer-img"
                        />
                      </picture>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
  
        <article class="container container-index">
          <p class="text-primary text-center pb-md-2">Camping Tips</p>
          <h2 class="text-center pb-md-17 pb-10">露營知識，不可不知</h2>
          <div class="row justify-content-center">
            <div class="col-md-3 mb-8 mb-md-0"></div>
            <div class="col-md-3 mb-8 mb-md-0"></div>
            <div class="col-md-3 mb-8 mb-md-0"></div>
            <div class="col-md-3 mb-8 mb-md-0"></div>
          </div>
        </article>
      </>
    );
  }
  