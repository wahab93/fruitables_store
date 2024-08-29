import React, { useState, useEffect, useMemo } from 'react'
import { orderServices } from '../../services/orderServices';
import Swal from 'sweetalert2';

export const Orderlisting = () => {
    const [orders, setOrders] = useState([])
    const [filterCode, setFilterCode] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            let getOrdersURL = '/getOrders'
            try {
                const res = await orderServices.getAllOrder(getOrdersURL);
                setOrders(res.reverse());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])


    const updateOrderStatus = async (orderId, status) => {
        try {
            let shouldUpdate = true;

            if (status === 'completed') {
                const result = await Swal.fire({
                    title: 'Order Completed',
                    text: 'Do you want to complete the Order?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Complete',
                    cancelButtonText: 'No, cancel'
                });

                if (!result.isConfirmed) {
                    shouldUpdate = false;
                }
            }

            if (shouldUpdate) {
                let addEditOrderURL = '/addEditOrder';
                // Fetch the current order details
                const currentOrder = orders.find(order => order._id === orderId);

                if (!currentOrder) {
                    throw new Error('Order not found');
                }

                // Create an order object with the current order's details and updated status
                const updatedOrderDetails = {
                    ...currentOrder,
                    orderStatus: status
                };

                // Call the postorder service to update the order
                const updatedOrder = await orderServices.postorder(addEditOrderURL, updatedOrderDetails, orderId);
                console.log('updatedOrder', updatedOrder);

                // Update the state with the new order status
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, orderStatus: status } : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };


    const filteredOrders = useMemo(() => {
        return orders.filter((order) =>
            order.orderCode.toLowerCase().includes(filterCode.toLowerCase())
        );
    }, [orders, filterCode]);


    return (
        <div className='container'>
            <div className='row my-4'>
                <div className='col-md-12'>
                    <h2>Order Listing</h2>
                    {orders.length > 0 ? (
                        <>
                            <input
                                type='text'
                                placeholder='Enter Order Code'
                                className='form-control'
                                value={filterCode}
                                onChange={(e) => setFilterCode(e.target.value)}
                            />
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Customer Name</th>
                                        <th>Customer Phone</th>
                                        <th>Order Code</th>
                                        <th>Order Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.billingAddress.name}</td>
                                            <td>{order.customerId.phone}</td>
                                            <td>{order.orderCode}</td>
                                            <td>{order.totalAmount}</td>
                                            <td>
                                                {order.orderStatus !== 'completed' ? (
                                                    <select
                                                        className='form-select'
                                                        value={order.orderStatus}
                                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="dispatching">Dispatching</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                ) : (
                                                    'Completed'
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <h1 className='text-center'>No orders Yet</h1>
                    )}
                </div>
            </div>
        </div>
    )
}