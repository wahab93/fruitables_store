import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderServices } from '../../../services/orderServices';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { CardDetails } from './cardDetails';

export const Checkout = () => {
    const stateCart = useSelector((state) => state.cartHandler.cart || []);
    const stateUser = useSelector((state) => state.userHandler);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const total = stateCart.reduce((acc, product) => acc + product.productPrice * product.qty, 0);

    const OrdersDetails = stateCart.map((product) => {
        return {
            _id: product._id,
            name: product.productName,
            price: product.productPrice,
            quantity: product.qty,
        };
    });

    const initialOrderState = {
        billingAddress: {
            name: stateUser?.user?.name || '',
            email: stateUser?.user?.email || '',
            address: 'test',
            phoneNumber: stateUser?.user?.phone || '',
            country: 'test',
            zip: 'test',
        },
        payment: {
            nameOnCard: 'test',
            cardNumber: 'test',
            cvv: 'test',
            expiration: 'test',
        },
        cart: OrdersDetails,
        totalAmount: total,
        orderStatus: 'pending',
        customerId: stateUser?.user?._id || 0,
    };

    const [order, setOrder] = useState(initialOrderState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [parentKey, childKey] = name.split('.');
        setOrder((prevState) => ({
            ...prevState,
            [parentKey]: {
                ...prevState[parentKey],
                [childKey]: value,
            },
        }));
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            let addEditOrderURL = `${process.env.REACT_APP_BASE_URL}/addEditOrder`;
            setLoading(true)
            const response = await orderServices.postorder(addEditOrderURL, order);
            const { orderCode } = response;
            swal("Success", `Your Order is Placed. \nOrderCode: ${orderCode}`, "success");
            dispatch({ type: 'CLEAR_CART' });
            setOrder(initialOrderState);
            navigate('/');
            console.log('response in checkout', response);
            setLoading(false)
        } catch (error) {
            console.error('Error:', error);
            swal("Error", `Error in creating order: ${error.error}`, "error");
            setLoading(false)
        }
    };

    return (
        <div className='container mt-md-5 pt-md-5'>
            <div className='row mt-5 pt-5'>
                <div className="col-md-8 order-md-first order-last">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" onSubmit={handleOrder}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.name">Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.name"
                                    name="billingAddress.name"
                                    placeholder="Enter Name"
                                    value={order.billingAddress.name}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.email">Email</label>
                                <input type="email"
                                    className="form-control"
                                    id="billingAddress.email"
                                    name="billingAddress.email"
                                    placeholder="you@example.com"
                                    value={order.billingAddress.email}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="billingAddress.address">Address</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.address"
                                    name="billingAddress.address"
                                    placeholder="1234 Main St"
                                    required
                                    value={order.billingAddress.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.phoneNumber">Phone Number</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.phoneNumber"
                                    name="billingAddress.phoneNumber"
                                    placeholder="Phone Number"
                                    value={order.billingAddress.phoneNumber}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.country">Country</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.country"
                                    name="billingAddress.country"
                                    placeholder="Country"
                                    value={order.billingAddress.country}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.zip">Zip</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.zip"
                                    name="billingAddress.zip"
                                    placeholder="Zip Code"
                                    value={order.billingAddress.zip}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Card Detalis inputs */}
                        <CardDetails order={order} handleInputChange={handleInputChange} />

                        <button className="btn btn-primary mt-4" type="submit" disabled={loading}>
                            {loading ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                :
                                'Place Order'
                            }
                        </button>
                    </form>
                </div>
                <div className='col-md-4'>
                    <h1>Cart</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col" className='text-end'>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stateCart.map((product, i) => {
                                const { productName, productPrice, qty } = product;
                                return (
                                    <tr key={i}>
                                        <td>{productName}</td>
                                        <td>{productPrice}</td>
                                        <td className='text-end'>{qty}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan='2' className='text-end'>Total</td>
                                <td className='text-end'>{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};