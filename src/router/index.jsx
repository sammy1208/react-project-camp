import { createHashRouter } from "react-router-dom"
import FrontLayout from "../layouts/FrontLayout"
import ProductsDetailPage from "../pages/ProductsDetailPage"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"
import ProductsDetailPageId from "../pages/ProductsDetailPageid"
import AboutUsPage from "../pages/AboutUsPage"
import KnowledgePage from "../pages/KnowledgePage"


const router = createHashRouter ([
    {
        path: '/',
        element: <FrontLayout/>,
        children: [
            {
                path: '',
                element: < HomePage />
            },
            {
                path: 'Products',
                element: < ProductsPage />
            },
            {
                path: 'aboutUs',
                element: < AboutUsPage />
            },
            {
                path: 'CartPage',
                element: < CartPage />
            },
            {
                path: 'KnowledgePage',
                element: < KnowledgePage />
            },
            {
                path: 'Products/:id',
                element: < ProductsDetailPageId />
            }
        ]
    }
])

export default router
{/* <HomePage/> */}