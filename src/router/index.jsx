import { createHashRouter } from "react-router-dom"
import FrontLayout from "../layouts/FrontLayout"
import ProductsDetailPage from "../pages/ProductsDetailPage"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"

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
            }
        ]
    }
])

export default router
{/* <HomePage/> */}