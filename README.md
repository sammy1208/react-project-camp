# React Project Camp

這是一個以 React 打造的露營電商網站，支援商品瀏覽、加入願望清單、購物車操作、後台商品管理等功能。前台 UI 設計以大地配色與戶外風格為主，提供順暢的使用者體驗。

[前台網站 Demo](https://sammy1208.github.io/react-project-camp/#/)


---

## 專案特色

### 使用者端功能

- 瀏覽商品與篩選分類
- 加入 / 移除願望清單
- 購物車操作（新增、刪除、數量調整）
- 結帳流程與訂單建立
- RWD 響應式設計，手機也能輕鬆購物！

### 管理者端功能（需登入）

- 後台登入驗證
- 商品列表（建立 / 編輯 / 刪除）
- 訂單管理
- 上傳商品圖片
- 權限驗證

---

## 技術使用

| 技術 | 說明 |
|------|------|
| **React** | 核心框架 |
| **React Router v6** | 前後台路由區分 |
| **Redux Toolkit** | 狀態管理（購物車、願望清單、訊息） |
| **Bootstrap 5** | UI 樣式與 modal |
| **Axios** | API 串接 |
| **Vite** | 開發建構工具，快速啟動專案 |

---

## 專案結構簡介

react-project-camp/
├── public/              # 靜態資源
├── src/
│   ├── components/      # 共用元件（前後台、Loading、Header）
│   ├── pages/           # 所有路由頁面（Products, Wish, Cart, Admin...）
│   ├── redux/           # Redux 設定與 slice
│   ├── utils/           # 工具函式與 API 設定
│   └── main.jsx         # 進入點
├── .gitignore
└── README.md

---

## API 資源

使用 六角學院 API 提供的購物車與商品資料。

---
