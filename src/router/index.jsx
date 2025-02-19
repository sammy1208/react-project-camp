import { createHashRouter } from "react-router-dom"
import FrontLayout from "../layouts/FrontLayout"
import ProductsDetailPage from "../pages/ProductsDetailPage"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"
import ProductsDetailPageId from "../pages/ProductsDetailPageid"

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
                path: 'ProductsDetail',
                element: < ProductsDetailPage />
            },
            {
                path: 'CartPage',
                element: < CartPage />
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