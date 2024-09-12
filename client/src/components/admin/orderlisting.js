import React, { useState, useEffect, useMemo } from 'react'
import { orderServices } from '../../services/orderServices';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';


export const Orderlisting = () => {
    const [orders, setOrders] = useState([])
    const [filterCode, setFilterCode] = useState('');
    // console.log('orders in orderlisting', orders[0]._id)

    const location = useLocation();

    // Extract the order ID from the query parameter
    const queryParams = new URLSearchParams(location.search);
    const highlightedOrderId = queryParams.get('orderId');
    console.log('highlightedOrderId', highlightedOrderId);

    useEffect(() => {
        const getProducts = async () => {
            let getOrdersURL = `${process.env.REACT_APP_BASE_URL}/getOrders`
            try {
                const response = await axios.get(getOrdersURL);
                setOrders(response.data.reverse());
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
                let addEditOrderURL = `${process.env.REACT_APP_BASE_URL}/addEditOrder`;
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

    const columns = [
        {
            name: 'Customer Name',
            selector: row => row.billingAddress.name,
        },
        {
            name: 'Customer Phone',
            selector: row => row.customerId.phone,
        },
        {
            name: 'Order Code',
            selector: row => row.orderCode,
        },
        {
            name: 'Order Total',
            selector: row => row.totalAmount,
        },
        {
            name: 'Action',
            cell: row => (
                row.orderStatus !== 'completed' ? (
                    <select
                        className='form-select form-select-sm'
                        value={row.orderStatus}
                        onChange={(e) => updateOrderStatus(row._id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="dispatching">Dispatching</option>
                        <option value="completed">Completed</option>
                    </select>
                ) : (
                    'Completed'
                )
            ),
        },
    ];

    // Define conditional row styles
    const conditionalRowStyles = [
        {
            when: row => {
                console.log('Row _id:', row.orderCode, 'Highlighted ID:', highlightedOrderId); // Debug row._id
                return row.orderCode === highlightedOrderId; // Condition to check if the row is highlighted
            },
            style: {
                backgroundColor: '#c8e6c9', // Light green background
                color: 'black', // Text color
                fontWeight: 'bold',
            },
        },
    ];



    return (
        <div className='row my-4'>
            <div className='col-md-12'>
                <h3>Order Listing</h3>
                {orders.length > 0 ? (
                    <>
                        <input
                            type='text'
                            placeholder='Enter Order Code'
                            className='form-control'
                            value={filterCode}
                            onChange={(e) => setFilterCode(e.target.value)}
                        />
                        <DataTable
                            columns={columns}
                            data={orders.filter(order =>
                                order.orderCode.toLowerCase().includes(filterCode.toLowerCase())
                            )}
                            pagination
                            paginationPerPage={6}
                            highlightOnHover
                            striped
                            conditionalRowStyles={conditionalRowStyles}
                        />
                    </>
                ) : (
                    <h1 className='text-center'>No orders Yet</h1>
                )}
            </div>
        </div>
    )
}