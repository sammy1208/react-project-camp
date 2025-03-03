import { createHashRouter } from "react-router-dom"
import FrontLayout from "../layouts/FrontLayout"
import ProductsDetailPage from "../pages/ProductsDetailPage"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"
import AboutUsPage from "../pages/AboutUsPage"
import KnowledgePage from "../pages/KnowledgePage"
import NotFound from "../pages/NotFound"
import Knowledge_camping from "../components/Knowledge_camping"
import Knowledge_cookware from "../components/Knowledge_cookware"
import Knowledge_outdoor from "../components/Knowledge_outdoor"
import Knowledge_newbie from "../components/Knowledge_newbie"


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
                element: < KnowledgePage />,
                children:[
                    {
                        path: '',
                        element: < Knowledge_camping/>
                    },
                    {
                        path: 'cookware',
                        element: <Knowledge_cookware />
                    },
                    {
                        path: 'outdoor',
                        element: < Knowledge_outdoor />
                    },
                    {
                        path: 'newbie',
                        element: < Knowledge_newbie />
                    }
                ]
            },
            {
                path: 'Products/:id',
                element: < ProductsDetailPage />
            }
        ]
    },
    {
        path: '*',
        element: < NotFound />
    }
])

export default router
{/* <HomePage/> */}
const routes = [
    { path: "/Camping", name: "無痕露營" },
    { path: "/outdoor", name: "永續戶外" },
    { path: "/cookware", name: "環保炊具" }
];