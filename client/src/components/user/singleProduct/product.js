import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, delCart } from '../../../redux/action';
import { useAddToCart } from '../../../hooks/cartUtils';
import { LeaveReplay } from './leaveReplay';
import { ReviewndDescription } from './reviewndDescription';
import Swal from 'sweetalert2';
import { FeaturedProducts } from './featuredProducts';
import { ProductCategories } from './productCategories';
import axios from 'axios';


export const Product = () => {
    const cart = useSelector((state) => state.cartHandler.cart || []);
    const [product, setProduct] = useState(null);
    const [originalStock, setOriginalStock] = useState(null);
    const { productId } = useParams();
    const dispatch = useDispatch()
    console.log('single product:', product)
    // custom hook
    const { addToCart, isProductInCart, stateUser } = useAddToCart();
    console.log('stateUser when in product component fetched from custom hook useAddToCart', stateUser.user)

    const cartItem = cart.find((item) => item._id === productId);
    // Ensure qty is a number and handle the case where cart might be empty
    const quantity = cartItem ? cartItem.qty : 0;
    console.log('originalStock when componet loads', originalStock)

    useEffect(() => {
        const fetchProductById = async () => {
            const ProductByIdURL = `/products/${productId}`;
            try {
                const response = await axios.get(ProductByIdURL);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchOriginalStock = async () => {
            const getRemainingStockURL = `/getRemainingStock/${productId}`;
            try {
                const response = await axios.get(getRemainingStockURL);
                setOriginalStock(response.data.remainingStock);
                console.log('response.data.remainingStock:', response.data.remainingStock)
            } catch (error) {
                console.error('Error fetching remaining stock:', error);
            }
        };

        fetchProductById();
        fetchOriginalStock();
    }, [productId]);

    // handle add product quantity
    const handleAddQty = (product) => {
        if ((quantity + 1) <= originalStock) {
            dispatch(addCart(product));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Maximum Quantity Reached',
                text: 'only add items which are available!',
            });
        }
    };

    // handle delete product quantity
    const handleDelQty = (product) => dispatch(delCart(product));

    // handle add cart onclick add to cart
    const handleAddToCartBtn = () => {
        if ((quantity + 1) <= originalStock) {
            addToCart(product);
            if (stateUser.user) {
                dispatch({
                    type: 'SET_REMAINING_STOCK',
                    payload: { productId, remainingStock: originalStock }
                });
            }
        }
    };


    return (
        <div className="container-fluid py-md-5 mt-5">
            <div className="container py-5 mt-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                            {
                                product &&
                                <>
                                    <div className="col-lg-6">
                                        <div className="border rounded">
                                            <img
                                                src={process.env.REACT_APP_IMAGE_PATH + product.productImage} alt={product.productTitle}
                                                className="img-fluid rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <h4 className="fw-bold mb-3 text-capitalize">{product.productName}</h4>
                                        <p className="mb-3">Category: {product.productCategory}</p>
                                        <h5 className="fw-bold mb-3">Rs: {product.productPrice}</h5>
                                        <div className="d-flex mb-4">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <p className="mb-4">{product.productDescription}</p>
                                        <p className='blinking-text'>
                                            Hurry Up only <strong>{originalStock}</strong> Left
                                        </p>
                                        {cart.length > 0 && cart.map((cartItem) => {
                                            if (cartItem._id === product._id) {
                                                return (
                                                    <div key={cartItem._id} className="input-group quantity mb-5" style={{ width: '100px' }}>
                                                        <div className="input-group-btn">
                                                            <button
                                                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                                onClick={() => handleDelQty(product)}
                                                            >
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm text-center border-0"
                                                            value={cartItem.qty}
                                                            readOnly
                                                        />
                                                        <div className="input-group-btn">
                                                            <button
                                                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                                onClick={() => handleAddQty(product)}
                                                            >
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null; // Return null for items that don't match
                                            }
                                        })}
                                        {product?.stocks?.length > 0 && product?.stocks[product?.stocks.length - 1]?.ClosingBalance > 0 ?
                                            isProductInCart(product._id) ?
                                                <Link to='/cart' className='btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary'>Go to Cart</Link>
                                                :
                                                <button className='btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary' onClick={handleAddToCartBtn}>Add to Cart</button>
                                            :
                                            <button className='btn btn-secondary px-3 rounded-pill d-block' disabled><i className="fa fa-shopping-bag me-2 text-white"></i>Out of Stock</button>
                                        }
                                    </div>
                                </>
                            }
                            <ReviewndDescription />
                            <LeaveReplay />
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <ProductCategories />
                            <FeaturedProducts />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}