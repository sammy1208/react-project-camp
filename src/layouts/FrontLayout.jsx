import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import "swiper/css";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import AutoScrollToTop from "../components/AutoScrollToTop";

export default function FrontLayout() {
  const [bannerProps, setBannerProps] = useState(null)
  const location = useLocation();
  const [carouselData, setCarouselData] = useState()
  const path = location.pathname;
  const bannerStyles = {
    home: {
      type: "carousel",
      data: [
        {
         id: 1,
         image: "https://s3-alpha-sig.figma.com/img/8835/5c8c/752ea4219d9204491205321901ad1dfc?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BZTGzuHW25OwlkJDw7hDod7k4~NizHb~Sl~GXGFYB9gvDyXoK4z1yCuFzfD65~WhKGOyxmujCvPFJy9eg4VpR2A6y4qjsijNzQhCikkNTEf9dsFPnfwbAiMGs7E4apMwRNWlbDiuzAh8BvwwyPfx2gPRququf29aLVbDIwTi8zqW9hgtc~KbYCxzRC3X9Le6~Xz5CDY~piICinx4r3MpiygdPqokf1ZFLEGpoiAdjIKh8kiZJ4RVjfI2xheafKyrF2RG1I-iX1K1Gt7mKC1WJWo-yNPCm~H7I3POO9JapiOYIoJE~NAfYdsfH~kpivNOl8o5skGAOhMx9cVdU4ylyA__",
         title:"單人露營組",
         description: "一人成家",
        },
        {
         id: 2,
         image: "https://s3-alpha-sig.figma.com/img/aa15/6217/fd9acf662d45ea43cedd23360970669c?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oil7rBvGmy~3p4DK9~fAOHBajhZvz8NZqms9BmNE6qH4MCymRpRymlYzbockag2jidbjxzLUN4h5arkkfRiXU2o3nqE99yC5Hl9EeFOgydRSBLEjyU2jZyJPdvkgUI8rg1FirFUdEMmWunW8IAOpFrYhIgdjE~5SYUE1r1WqjeQsIkvanXhKCdQyMAdvGHs7X~KeoTTpw4SwLW~B4y8nJvVPFn-P~NcK9KNFsbyDZl9eSb6xsqTXS9Ike9Yp5hKZb1Ie9YlWsJCDxqckI4nvAanmcd-GKrz9O4JoC-E7tKBlks7AfoO0W8J4t6gP-XNraYuBEhLeHSn0BP8sdwVV4w__",
         title:"野炊鍋具組",
         description: "食盡山水",
        },
        {
         id: 3,
         image: "https://s3-alpha-sig.figma.com/img/a308/edc3/e1dba6ebc7129d5878b2a9a3721b0dee?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ah71e8v0SQZv9mA3BMH1N4Qp8BMYIP8sAEkpP9rZdyjyovBPU4IsI8tz4Y-Pqtyfe0qK~snIoHa5ypNTPUFN2MVXDGnW20TeL5rosW6nbHVElZP~3qHF9oJ1UmDDemnYO2nMS3VeSI5n2qn2HsbNSErK6xn9JHSsTMvGEdZNXGFoKpkFh0IaEAcPdCR0wT2VqHJ7nL8Pg0rMuuiScPwFvhL8pADIRhu1E-O6Hy7GijySlCDlIEsAGlDsd~gqITqZDTzz4FFED8DRowWHBH-lRGaTutIr~jsJOP-ozSIT3iFhF5Z0Fyrzc9b10WbkM8qpuv5f9HRAnyteNUcebni2FA__",
         title:"質感手提燈",
         description: "引領夜空",
        },
       ]
    },
    products: {
      type: "static",
      imageUrl: "https://plus.unsplash.com/premium_photo-1669674583896-15235322d26e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "產品一覽",
    },
    aboutUs: {
      type: "static",
      imageUrl: "https://images.unsplash.com/photo-1734383641626-23d1c68e4dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "關於我們",
    },
    default:
    {
      type: "default",
    }
  };

  const primaryBgRoutes = [
    "/CartPage",
    "/KnowledgePage",
    "/products/",
  ];

  const isPrimaryBg = primaryBgRoutes.some((route) => path.includes(route))
  console.log(isPrimaryBg)
  const layoutClass = isPrimaryBg ? "bg-primary"  : "";

  useEffect(() => {
    if ( path === "/" ) {
      setBannerProps(bannerStyles.home)
    } else if ( path === "/Products" ) {
      setBannerProps(bannerStyles.products)
    } else if ( path === "/aboutUs" ) {
      setBannerProps(bannerStyles.aboutUs)
    } else {
      setBannerProps(bannerStyles.default)
    }
  }, [path])

  return (
    <>
      < AutoScrollToTop />
      < Banner {...bannerProps} className={layoutClass}/>
      <Outlet />
      <Footer />
      <Toast />
    </>
  );
}
