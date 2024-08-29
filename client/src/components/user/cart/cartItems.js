import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCart, delCart, delProductCart } from '../../../redux/action';
import { productServices } from '../../../services/productService';
import Swal from 'sweetalert2';

export const CartItems = ({ stateCart }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClose = (item) => dispatch(delProductCart(item))
    const handleAddQty = (item) => dispatch(addCart(item))
    const handleDelQty = (item) => dispatch(delCart(item))
    // Access stock data from Redux store
    const origninalStock = useSelector((state) => state.cartHandler.origninalStock);
    console.log('origninalStock when in cartitems details', origninalStock)
    // Calculate total amount using only newPrice
    const totalAmount = stateCart.reduce((total, product) => {
        const price = product.productPrice || 0; // Use newPrice, default to 0 if not available
        const quantity = product.qty || 0;

        return total + price * quantity;
    }, 0);

    let shippingCharges = 1;

    const hanldeProceedCheckout = async () => {
        setLoading(true);
        let stockIsValid = true;
        let getRemainingStockURL = '/getRemainingStock/'
        for (const item of stateCart) {
            let productId = item._id;
            try {
                const response = await productServices.getRemainingStock(getRemainingStockURL, productId);
                console.log(`response.remainingStock in cart item ${item}`, response.remainingStock)
                dispatch({
                    type: 'SET_REMAINING_STOCK',
                    payload: { productId, remainingStock: response.remainingStock }
                });
                if (response.remainingStock < item.qty) {
                    stockIsValid = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'insufficient Stock',
                        text: `The product ${item.productName} only has ${response.remainingStock} left in stock.`,
                    });
                    setLoading(false)
                    dispatch({
                        type: "ADJUST_QTY_ON_STOCK_LIMIT",
                        payload: {
                            productId: item._id,
                            qty: item.qty,
                        },
                    });
                    break;
                }
            } catch (error) {
                setLoading(false)
                console.error('Error fetching remaining stock:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Stock Check Failed',
                    text: `There was an error checking the stock for ${item.productName}. Please try again later.`,
                });
                stockIsValid = false;
                break;

            }
        }
        if (stockIsValid) {
            navigate('/checkout'); // Proceed to checkout if all items have sufficient stock
            setLoading(false)
        }
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Products Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            {/* <th scope="col">stock</th> */}
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateCart.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <th scope="row">
                                        <div className="d-flex align-items-center">
                                            <img src={process.env.REACT_APP_IMAGE_PATH + item.productImage} alt={item.productTitle} className="img-fluid me-5 rounded-circle" width={80} height={80} />
                                        </div>
                                    </th>
                                    <td><p className="mb-0 mt-4">{item.productName}</p></td>
                                    <td><p className="mb-0 mt-4">{item.productPrice}</p></td>
                                    {/* <td><p className="mb-0 mt-4">{origninalStock[item._id] - item.qty}</p></td> */}
                                    <td>
                                        <div className="input-group mt-4" style={{ width: '100px' }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                    onClick={() => handleDelQty(item)}
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </div>
                                            <input type="text" className="form-control form-control-sm text-center border-0" value={item.qty} readOnly />
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                    onClick={() => handleAddQty(item)}
                                                    disabled={item.qty >= origninalStock[item._id]}
                                                >
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td> <p className="mb-0 mt-4">{item.qty * item.productPrice}</p></td>
                                    <td>
                                        <button className="btn btn-md rounded-circle bg-light border mt-4"
                                            onClick={() => handleClose(item)}
                                        >
                                            <i className="fa fa-times text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* <div className="mt-5">
                        <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                    </div> */}
            <div className="row g-4 justify-content-end">
                <div className="col-8"></div>
                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                    <div className="bg-light rounded">
                        <div className="p-4">
                            <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                            <div className="d-flex justify-content-between mb-4">
                                <h5 className="mb-0 me-4">Subtotal:</h5>
                                <p className="mb-0">{totalAmount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-0 me-4">Shipping</h5>
                                <div className="">
                                    <p className="mb-0">{shippingCharges}</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                            <h5 className="mb-0 ps-4 me-4">Total</h5>
                            <p className="mb-0 pe-4">{totalAmount + shippingCharges}</p>
                        </div>
                        <button
                            disabled={loading}
                            onClick={hanldeProceedCheckout}
                            className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                            type="button"
                        >
                            {loading ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                :
                                'Proceed Checkout'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
