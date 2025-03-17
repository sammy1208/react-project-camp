import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  designerList: [
    {
      title: "IF 設計大獎得主",
      name: "Angel Li",
      type: "戶外產品設計師",
      description:
        "專注於戶外用品設計，將功能性與美感結合，作品以高效實用的特質廣受讚譽。她的設計靈感來自自然環境，致力於提升露營體驗。",
      image_pc: "./images/designer/Designer-01.png",
      image_mobile: "./images/designer/Designer-H501.png"
    },
    {
      title: "帳篷界的魔術師",
      name: "Kevin Wang",
      type: "戶外裝備設計師",
      description:
        "擅長設計創新的帳篷結構，曾獲多項專利。他的作品兼具輕量化與穩固性，適合各種極端環境，深受戶外探險家的喜愛。",
      image_pc: "./images/designer/Designer-02.png",
      image_mobile: "./images/designer/Designer-H502.png"
    },
    {
      title: "紅點設計大獎得主",
      name: "Shania Chen",
      type: "工業設計師",
      description:
        "擁有十多年工業設計經驗，以優雅簡約的線條聞名。她的戶外炊具設計以人體工學為核心，為露營者帶來美感與實用兼備的產品。",
      image_pc: "./images/designer/Designer-03.png",
      image_mobile: "./images/designer/Designer-H503.png"
    },
    {
      title: "戶外收納達人",
      name: "Michael Yang",
      type: "戶外收納達人",
      description:
        "專注於露營收納產品設計，解決行李空間問題。他設計的多功能收納袋獲得業界高度評價，將收納效率提升至新高度。",
      image_pc: "./images/designer/Designer-04.png",
      image_mobile: "./images/designer/Designer-H504.png"
    },
    {
      title: "綠色設計獎得主",
      name: "Joanna Lin",
      type: "永續設計師",
      description:
        "專注於環保材質的應用，倡導「愛自然，愛旅行」理念。她的產品強調可回收、可重複使用，深受重視環保的露營族群喜愛。",
      image_pc: "./images/designer/Designer-05.png",
      image_mobile: "./images/designer/Designer-05.png"
    }
  ],
  productShow: [
    {
      title: "印地安單峰帳",
      name: "輕量設計，簡易搭建，適合冒險者探索自然。",
      type: "提供可靠遮蔽，享受純粹的露營體驗。",
      image_url: "./images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow5.png",
      image_url_01: "./images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow1.png",
      image_url_02: "./images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow4.png",
      image_url_03: "./images/camp/碧海微風沙灘帳篷/Dark_Tent_Glow3.png"
    },
    {
      title: "簡易炊具組",
      name: "輕巧便攜，包含鍋、碗、湯勺等露營必備餐具，",
      type: "耐高溫易清潔，適合戶外煮食，讓野餐變得輕鬆又愉快！",
      image_url: "./images/camp/簡易炊具組/Img.png",
      image_url_01: "./images/camp/簡易炊具組/Img-1.png",
      image_url_02: "./images/camp/簡易炊具組/Img-2.png",
      image_url_03: "./images/camp/簡易炊具組/Img-3.png"
    }
  ],
  Knowledge: [
    {
      path: "/KnowledgePage",
      name: "無痕露營",
      title: "無痕露營：減少廢棄物，愛護大自然",
      content:
        "隨著露營活動的興起，環境保護成為不可忽視的議題。許多露營區因為遊客的垃圾、一次性用品的使用，導致自然生態受損，甚至影響當地動植物的生存環境。",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1680788452823-49bb63651490?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      path: "/KnowledgePage/cookware",
      name: "環保炊具",
      title: "環保炊具：露營料理的新選擇",
      content:
        "露營時，享受美食是不可或缺的一部分。然而，傳統的炊具與料理方式往往會對環境造成影響，例如一次性燃料罐的浪費、過度使用木材生火、以及難以回收的鋁箔包裝等。因此，選擇環保炊具成為現代露營者的新趨勢。透過使用節能爐具、可重複使用的餐具，以及環保燃料，我們可以在享受美味料理的同時，也為地球盡一份心力。",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1680788452823-49bb63651490?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      path: "/KnowledgePage/outdoor",
      name: "永續戶外",
      title: "永續戶外：享受自然，同時保護地球",
      content:
        "戶外活動，如登山、露營、健行和攀岩，讓人們親近自然，享受戶外生活的美好。然而，隨著戶外活動的普及，環境問題也隨之而來，如垃圾污染、自然棲地破壞與碳排放增加。",
      imageUrl:
        "https://images.unsplash.com/photo-1707007730851-c53cc2879f00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      path: "/KnowledgePage/newbie",
      name: "新手露營指南",
      title: "新手必讀！如何選擇適合的露營帳篷",
      content:
        "露營是一項受到許多人喜愛的戶外活動，而選擇一個合適的露營帳篷則是成功露營的關鍵之一。無論是野外露營還是豪華露營，選擇帳篷時需要考慮多方面的因素，包括帳篷的尺寸、材質、設計、透氣性、防水性、安裝便利性等。新手在選擇帳篷時，最常遇到的挑戰是如何根據自己的需求和露營環境來做出正確的選擇。",
      imageUrl:
        "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ],
  brandTimeline: [
    {
      time: "2004",
      description: "在台北松山，第一家 CampEase 青松露營開幕",
      imageUrl: "./images/AboutUsPage/Rectangle 2.png"
    },
    {
      time: "2008",
      description: "除了露營用品外，也邀請許多品牌合作，擴大營業方向",
      imageUrl: "./images/AboutUsPage/Rectangle 3.png"
    },
    {
      time: "2010",
      description: "CampEase 青松露營線上購物網開始營運",
      imageUrl: "./images/AboutUsPage/Rectangle 4.png"
    },
    {
      time: "2018",
      description: "榮獲 ECSA 環保企業永續獎",
      imageUrl: "./images/AboutUsPage/Rectangle 5.png"
    },
    {
      time: "2024",
      description: "30 間店鋪達成，員工突破 1000 人",
      imageUrl: "./images/AboutUsPage/Rectangle 1.png"
    }
  ],
  brandStory: {
    content01:
      "CampEase 青松露營 取自於對大自然的熱愛與對露營生活的熱情。我們相信，露營不該是一件困難的事，而是讓人放鬆心情、親近自然的美好體驗。無論你是露營新手，還是經驗豐富的戶外老手，我們都致力於提供高品質、易於使用的裝備，讓每一次旅程都更加輕鬆愉快。",
    content02:
      "「青松」不僅僅是一個諧音梗，更蘊含堅韌與自然的精神象徵；而「Ease」則代表輕鬆與便利。我們致力於以專業與用心，設計出兼具功能性與美感的戶外裝備，無論是山林間的探險還是星空下的靜謐時光，都能滿足不同露營愛好者的需求，讓探索與享受更加輕鬆自在。",
    content03:
      "我們不僅僅是販售產品，更希望傳遞一種生活態度：在自然中找到內心的平靜，與家人朋友一同創造難忘的珍貴回憶。CampEase 青松露營專注於設計輕便、實用又美觀的裝備，不論是靜享山林間的寧靜，還是與親友共享星空下的歡笑，我們都希望成為你露營旅程中的最佳夥伴。",
    title: "“輕鬆露營，樂享自然“",
    type: "CampEase 青松露營，台北松山創始店",
    imageUrl: "./images/AboutUsPage/alpen-tokyo-the-north-face 1.png"
  },
  responsibility: [
    {
      title: "支持永續發展，守護大自然的美好",
      content:
        "致力於環境保護，選用可回收材料製造商品，減少資源浪費。我們承諾在每售出一個帳篷後，投入部分收益支持植樹計畫，恢復森林生態。讓我們一起珍惜自然，為下一代留下一片綠意盎然的世界。",
      imageUrl: "./images/AboutUsPage/社會責任-1.png"
    },
    {
      title: "打造更友善的社會，共創露營新體驗",
      content:
        "積極推動社會公益，定期舉辦「公益露營日」，邀請偏鄉孩童免費參與露營活動，體驗戶外生活的樂趣。我們相信，露營不僅是一場旅行，更是一個分享幸福與愛的機會，讓每個人都能感受大自然的美好。",
      imageUrl: "./images/AboutUsPage/社會責任-2.png"
    }
  ],
  KnowledgeRoutes: [
    {
      path: "/KnowledgePage",
      name: "無痕露營",
      title: "無痕露營：減少廢棄物，愛護大自然",
      content:
        "隨著露營活動的興起，環境保護成為不可忽視的議題。許多露營區因為遊客的垃圾、一次性用品的使用，導致自然生態受損，甚至影響當地動植物的生存環境。",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1680788452823-49bb63651490?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      path: "/KnowledgePage/outdoor",
      name: "永續戶外",
      title: "環保炊具：露營料理的新選擇",
      content:
        "露營時，享受美食是不可或缺的一部分。然而，傳統的炊具與料理方式往往會對環境造成影響，例如一次性燃料罐的浪費、過度使用木材生火、以及難以回收的鋁箔包裝等。因此，選擇環保炊具成為現代露營者的新趨勢。透過使用節能爐具、可重複使用的餐具，以及環保燃料，我們可以在享受美味料理的同時，也為地球盡一份心力。",
      imageUrl:
        "https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      path: "/KnowledgePage/cookware",
      name: "環保炊具",
      title: "永續戶外：享受自然，同時保護地球",
      content:
        "戶外活動，如登山、露營、健行和攀岩，讓人們親近自然，享受戶外生活的美好。然而，隨著戶外活動的普及，環境問題也隨之而來，如垃圾污染、自然棲地破壞與碳排放增加。",
      imageUrl:
        "https://images.unsplash.com/photo-1707007730851-c53cc2879f00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      path: "/KnowledgePage/newbie",
      name: "新手露營指南",
      title: "新手必讀！如何選擇適合的露營帳篷",
      content:
        "露營是一項受到許多人喜愛的戶外活動，而選擇一個合適的露營帳篷則是成功露營的關鍵之一。無論是野外露營還是豪華露營，選擇帳篷時需要考慮多方面的因素，包括帳篷的尺寸、材質、設計、透氣性、防水性、安裝便利性等。新手在選擇帳篷時，最常遇到的挑戰是如何根據自己的需求和露營環境來做出正確的選擇。",
      imageUrl:
        "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ],
  bannerStyles: {
    home: {
      type: "carousel",
      data: [
        {
          id: 1,
          image:
            "./images/banner/Home-banner-01.png",
          title: "單人露營組",
          description: "一人成家"
        },
        {
          id: 2,
          image:
            "./images/banner/Home-banner-02.png",
          title: "野炊鍋具組",
          description: "食盡山水"
        },
        {
          id: 3,
          image:
            "./images/banner/Home-banner-03.png",
          title: "質感手提燈",
          description: "引領夜空"
        }
      ]
    },
    products: {
      type: "static",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1669674583896-15235322d26e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "產品分類"
    },
    aboutUs: {
      type: "static",
      imageUrl:
        "https://images.unsplash.com/photo-1734383641626-23d1c68e4dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "關於 CampEase"
    },
    default: {
      type: "default"
    }
  }
};

const siteContentSlice = createSlice({
  name: "siteContent",
  initialState,
  reducers: {}
});

export default siteContentSlice.reducer;
