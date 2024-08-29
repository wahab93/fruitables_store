import { createBrowserRouter } from 'react-router-dom';
import { ClientLayout } from './clientLayout'
import { Home } from '../user/MainPage/Home'
import { About } from '../user/About'
import { Contact } from '../user/Contact'
import { Login } from '../common/Login';
import { Register } from '../common/Register';
import { Products } from '../user/products/products';
import { Product } from '../user/singleProduct/product';
import { Cart } from '../user/cart/cart';
import { Checkout } from '../user/checkout/checkout';
import { ErrorPage } from '../common/ErrorPage';
import { MyOrders } from '../user/myOrders';
import { AddProduct } from '../admin/products/addProduct';
import { Dashboard } from '../admin/dashboard';
import { Orderlisting } from '../admin/orderlisting';
import { AdminLayout } from './adminLayout';
import { PrivateRoute } from '../admin/PrivateRoute'

const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/products/:productId",
                element: <Product />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/myOrders",
                element: <MyOrders />
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    },
    {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "addProduct",
            element: <AddProduct />,
          },
          {
            path: "orderlisting",
            element: <Orderlisting />,
          },
        ],
      }      
])

export default router