import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../user/MainPage/Home';
import { About } from '../user/About';
import { Contact } from '../user/Contact';
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
import { ClientLayout } from './clientLayout';
import { AdminLayout } from './adminLayout';
import { PrivateRoute } from '../admin/PrivateRoute'

export const Routing = () => {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<ClientLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:productId" element={<Product />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="myOrders" element={<MyOrders />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={<PrivateRoute><AdminLayout /></PrivateRoute>}
                >
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="orderlisting" element={<Orderlisting />} />
                </Route>
            </Routes>
        </Router>
    );
};