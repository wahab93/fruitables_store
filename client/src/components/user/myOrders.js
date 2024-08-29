import React, { useState, useEffect } from 'react'
import { orderServices } from '../../services/orderServices';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const MyOrders = () => {
    const stateUser = useSelector((state) => state.userHandler);
    const [orders, setOrders] = useState([]);
    console.log(orders)

    useEffect(() => {
        const getOrders = async () => {
            try {
                let userId = stateUser.user._id
                let OrderByIdURL = '/getOrders/'
                const response = await orderServices.getOrderbyId(OrderByIdURL, userId);
                setOrders(response)
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        getOrders();
    }, [stateUser.user._id]);

    return (
        <div className='container mt-5 pt-5'>
            <div className='row pt-5'>
                <div className='col-md-12'>
                    {orders && orders.length > 0 ? (
                        <>
                            <h1>Order Listing</h1>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        {/* <th>Customer ID</th> */}
                                        <th>Order Date</th>
                                        <th>Customer Name</th>
                                        <th>Customer Phone</th>
                                        <th>Order Code</th>
                                        <th>Order Total</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            {/* <td>{order.customerId._id}</td> */}
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                            <td>{order.billingAddress.name}</td>
                                            <td>{order.customerId.phone}</td>
                                            <td>{order.orderCode}</td>
                                            <td>{order.totalAmount}</td>
                                            <td>{order.orderStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className='text-center my-5'>
                            <h1>No orders</h1>
                            <Link className='btn btn-primary' to='/products'>Go to Products</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
