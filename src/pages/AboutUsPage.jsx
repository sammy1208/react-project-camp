const brandTimeline = [
    {
      time: "2004",
      description: "在台北松山，第一家 CampEase 青松露營開幕",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/0988/ec32/e6f9c0e9d4088d453f4faed740ce0595?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dalzbps-96WJ4Nwa~4Dnhbz7p5MZNYdkZ7Ai82XL0v8VhH31aatpWo9gpXLRQVpaMXFXY47oV3x5jhqsfac-yqfAvSn4CjyyJe12PN33cXS5iMGZvJiQK~b7ly4S-r2uJ53~nfGAb6vLXKxbIwydwmvIZ6Rt7uhqdcSZYmuZDOiWvyi4~xNEHGnxfEjIcy0DL~8Do53Y-dxW2Zso54xTtu~DgjeVq1ixajM1bbgAIrI45RlDRL6iQEezgEI~pZQd1ndzzo8ZPQg3ad4cmD6dYAQXTf3arFSy~BbvZ3gKKjwbuuaUc~Dp85oLN2VbRqdexQEnr5X0KT-P4JnNja2QUA__"
    },
    {
      time: "2008",
      description: "除了露營用品外，也邀請許多品牌合作，擴大營業方向",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/4e41/0a72/73aa6167191d313a92f254adf8bcfcb1?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HU~alxwi0KoI7DH2D8E~mkpQ8~KXi3FCtzrQK3x4AJKUei01jtgL8yXHMg3unE3Ip5XFgj05ITzCw15LAexoBmePTTLRCBDfJOKJuJLUDJmbONPtO5mfFx8rXQpl3uERCQQ8FWSJnYwDgHMClKOQYyP9tyvmGYgcmFd1WkEA90La-G1zean4T15XxYilzwPtOgXxWJmLxPIlrZiyBIJQ9vgHeNutJ1vW7Gz~unVSm0heOBJ4dQLYwKYBug4wZ0-tZhMa79k52J4f9NfMc5ghYV5bIEwuoAs~f6vTmUBY2UunUlmy8xDQYSyOSi34FUUOz2H42OX9RGJB2OX49ESbIg__"
    },
    {
      time: "2010",
      description: "CampEase 青松露營線上購物網開始營運",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/3303/84a0/0d61c4d0021293f7bf2f2f3f3a1ef55c?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hWKN~G5GzjtRTvz5VEAZz4dngvS8pHmGFD-OzPubIK-oHUnBTQARaTRIC1JIArCSIK9G~IJ4LZWtRylImVPoFnWog6RU3Wnlvt6w~rfuFbW3kzu9lGCvVX3rMVnOxF3p~ZRKUmYDW9hVhqoZoY8H6bYOZsJNg2GMjzmtec5rEnwooGmF4MNdVIIN-b6pyLnliPDd~YD-p-THGhIv6b6EF-qEWBukVbiyUH1nJJaEhTw2HnAQcxKXQMgQLQ-iyLyhaYDCSpicFzdu03I-vCl6NbMPBCTpysUSH8hsQLPFD2GNeN5OghCpKtk7BK-NFBkTmRt8RIJzgTUMmF03e3IZWA__"
    },
    {
      time: "2018",
      description: "榮獲 ECSA 環保企業永續獎",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/e6d5/7879/e383c267c97f7e33dd1629a8398e21bd?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VWRQ3cIFINUqvt6TuxOUDlT51R-chiDpFvp~IPOGTlo~c6mSZ2ValiKFqzcd3qw3Ht-u2PmjC2bg4gtTL0E8eqv0rfXBMMMH~9G8hjBcvDduzcMNcsI6ncSaISSPe5SL01a7V57B9oFkjs-lPhye8~89ydc7mvqtb2GhkPJ7gR-trc-3cXQyTNwi8NZWyZhzcJbJ3JIGhDGPKlzAA~YW8mtfXvebkKlaA70lo8HUS6ds1dLNBT9b4dyL-EnMrGdfDbseKwuf~FsAq1RA0Lkvicn6YYdZ1cD1lPhT4UZA2LiVCBkNlJSYFGsJ4owqUKpOk79T~g8JXsYvAu76~~CXaw__"
    },
    {
      time: "2024",
      description: "30 間店鋪達成，員工突破 1000 人",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/5314/3094/4f0da6c436ec5257dbe2f08453ae4073?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hZpkCc2d~EPvpefIR0JATTys0Du3ZDES0gjkUvFHLdjd09D0PAb2VjQZ~PYaP2uZ1n1d3y9i5SrH1wK8PZvz9HrO8~vwBGOtxNs4leNgJRgIGEnAKkCzccevg9eeyulVpkZdxcXTR6GsKXyjdqE9sm4l2qRrfv8KpyRboJZVbCcQNp5IOuyRut3auMMuaoNiCPdIKaG6lYxA0lZaZMlNQsl~uVm4IZdr2nfnoehDaFMaxFbiHweVVG5V9o5uqZdiR6100x7ZbrxaksnMgjOJ14YD~~W6UDjJgACMlpsfFD-hywKZjyyAuIYPuRb6bHNt8rw46uihTTq-NWzxXi1VTw__"
    }
  ];
  
  export default function AboutUsPage() {
    return (
      <>
        <article className="container-index">
          <div className="container">
            <p className="text-center pb-md-2 text-primary">Brand Timeline</p>
            <h2 className="text-center pb-md-17 pb-12">品牌年表</h2>
            <div className="row row-cols-md-5 row-cols-1 d-flex align-items-end">
                {brandTimeline.map((data, index) => (
                <div className="col" key={index}>
                    <div className={`row d-flex justify-content-between ${
                      index % 2 === 0 ? "pt-md-15 pt-0 flex-md-column flex-row pb-10 pb-md-0" : " pb-md-15 pb-0 flex-md-column-reverse flex-row-reverse"
                    }`}>
                        <div className="col">
                            <div className="pb-md-6 pb-0 pe-10 pe-md-0">
                                <p className="fs-lg-1 fs-2 fw-light text-primary">
                                {data.time}
                                </p>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div className="col">
                            <img
                                className="rounded-4"
                                src={data.imageUrl}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                ))}
            </div>


            <h5 className="text-center text-white">“輕鬆露營，樂享自然“</h5>
          </div>
        </article>
  
        <article className="container-index bg-primary">
          <div className="container">
            <p className="text-white text-center pb-md-2">Brand story</p>
            <h2 className="text-white text-center pb-md-17 pb-12">品牌故事</h2>
            <div className="row row-cols-md-3 row-cols-1 justify-content-center text-white pb-10 pb-md-14 gy-10">
              <div className="col">
                <p>
                  CampEase 青松露營
                  取自於對大自然的熱愛與對露營生活的熱情。我們相信，露營不該是一件困難的事，而是讓人放鬆心情、親近自然的美好體驗。無論你是露營新手，還是經驗豐富的戶外老手，我們都致力於提供高品質、易於使用的裝備，讓每一次旅程都更加輕鬆愉快。
                </p>
              </div>
              <div className="col">
                <p>
                  「青松」不僅僅是一個諧音梗，更蘊含堅韌與自然的精神象徵；而「Ease」則代表輕鬆與便利。我們致力於以專業與用心，設計出兼具功能性與美感的戶外裝備，無論是山林間的探險還是星空下的靜謐時光，都能滿足不同露營愛好者的需求，讓探索與享受更加輕鬆自在。
                </p>
              </div>
              <div className="col">
                <p>
                  我們不僅僅是販售產品，更希望傳遞一種生活態度：在自然中找到內心的平靜，與家人朋友一同創造難忘的珍貴回憶。CampEase
                  青松露營專注於設計輕便、實用又美觀的裝備，不論是靜享山林間的寧靜，還是與親友共享星空下的歡笑，我們都希望成為你露營旅程中的最佳夥伴。
                </p>
              </div>
            </div>
            <h5 className="text-center text-white pb-md-14 pb-10">
              “輕鬆露營，樂享自然“
            </h5>
            <div className="text-center text-white fs-10">
              <img
                src="https://s3-alpha-sig.figma.com/img/f304/8175/bf17c566a844eedf57bc8a9952a3ed0a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dNAvBj0hsDY8JG9DYsOlT5dfu6xmo9OhmkVUevVneoK39vNjTy~rdfuMD9wRK83cu8Pf92WaQIg5LBTy-XHkC4ntWnNoDg2LCX0GM9BdLV7tPNLeE2zJD5jXRv2EBBqO58LRk0ZbDY5OQqfEEf04cQRN28GZelB6GZOvVsVrCaS5N5BnUhSZoxc3tAuLat4P1ut~OPd7d7emmxXO6p4Qpgy1ItpIjvzu7p5DVDRdsVcH9Tc2FE1Tr7xsbiRbfcA5FpoI0SF7JKQhyFqlGCJ5-CgeMdbmmRuxWmzUlF5Zx0Y1xm5NSp8nQWzzDXcDrSutQCk0JECJDKspGCZctb4wiA__"
                alt=""
              />
              <p className="pt-md-8 pt-6 fs-11 fs-md-10">
                CampEase 青松露營，台北松山創始店
              </p>
            </div>
          </div>
        </article>
  
        <article className="container-index">
          <div className="container">
            <p className="text-center pb-md-2 text-primary">Responsibility</p>
            <h2 className="text-center pb-md-17 pb-12">社會責任</h2>
            <div className="row d-flex flex-column-reverse flex-md-row-reverse justify-content-center pb-md-18 pb-12">
              <div className="col-md-4 offset-md-1 d-flex justify-content-end align-items-center">
                <div className="pb-md-6 pb-0 pe-10 pe-md-0">
                  <p className="fs-md-3 fs-7 fw-bold pb-2 pb-md-8">
                    支持永續發展，守護大自然的美好
                  </p>
                  <p>
                    致力於環境保護，選用可回收材料製造商品，減少資源浪費。我們承諾在每售出一個帳篷後，投入部分收益支持植樹計畫，恢復森林生態。讓我們一起珍惜自然，為下一代留下一片綠意盎然的世界。
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <img
                  className="rounded-4 w-100 pb-6 pb-md-0"
                  src="https://s3-alpha-sig.figma.com/img/9a78/851b/113b6a5e9dd8499f330183704915443f?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OJ1MTJ-fGsmqsRa2VUrvx1qyOt1E~0XWroATxC03TbDeXAMpfV69nspySmjbtgNnWt73YNCKel7mcMi4CJ8brtgwlT59RfIKCuP7A5qn-gSFZOs-OdR6yWFVNH7ypEcDviFMe9Oox~BYrOoAsySgOSeblME-KIlPLqkPnetDLfAc1cjofCWlAQZ8QeY3j-KHeWvAZSac4YK1cohbo0esS~dMfv-Un52faTB~31E7hJsYv5OdFqCX9~ZbsYmFFaeOwIWTLHSQq4TUcPGiYWIEJWU44sIRs0ZA2ivpOLHKoegZPPMQfeoRmRaRACHkeAp1tVrQNZHpSgX~KGh7-CJOow__"
                  alt=""
                  style={{ height: "395px",objectFit:"cover" }}
                />
              </div>
            </div>
  
            <div className="row d-flex flex-column-reverse flex-md-row justify-content-center">
              <div className="col-md-4 d-flex justify-content-start align-items-center">
                <div className="pb-md-6 pb-0 pe-10 pe-md-0">
                  <p className="fs-md-3 fs-7 fw-bold pb-2 pb-md-8">
                  打造更友善的社會，共創露營新體驗
                  </p>
                  <p>
                    積極推動社會公益，定期舉辦「公益露營日」，邀請偏鄉孩童免費參與露營活動，體驗戶外生活的樂趣。我們相信，露營不僅是一場旅行，更是一個分享幸福與愛的機會，讓每個人都能感受大自然的美好。
                  </p>
                </div>
              </div>
              <div className="col-md-5 offset-md-1">
                <img
                  className="rounded-4 w-100 pb-6 pb-md-0"
                  src="https://s3-alpha-sig.figma.com/img/c10c/d8dc/b1523bc5cdeb051408ba858fa870de6b?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U0ABVP7jKnJofBv9QQowCx1jdRPZNVMoJb~5EPmhrelRwCsBnpdWjxPIW3aD~MXdBdNG9IOvVZ7XuQ1docFXGcf4ICWaeUxtehLgz3P3jtB7vgIngjw8cAYwyrvQ6mlimuCnqjqOx2Ez4PEeNJWBFROkDlzFq1j9D-tqOptG1LpxPLqxmve6NnCxfOTpyGThnJS0PiOvZ-QnXlTIDbOoDLoTpk7nwouNOh~rIx4dO85YcAUsdWsY9RAjl7zw1NNjs8eucRg5c7kBvtMJUtHGWRSip~9jQD2hTPEBgRq~jft-mQhshe-NI19uRzSYEdNfgYQ19avlwQzMhZZ4eoDf7g__"
                  alt=""
                  style={{ height: "395px",objectFit:"cover" }}
                />
              </div>
            </div>
  
            <h5 className="text-center text-white">“輕鬆露營，樂享自然“</h5>
          </div>
        </article>
      </>
    );
  }
  