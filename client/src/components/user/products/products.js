import React, { useEffect, useState } from 'react'
import { productServices } from '../../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../../redux/action';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../../../hooks/cartUtils';
import { FeatureProducts } from './featureProducts';

export const Products = ({ showsidebar = true }) => {
    const [data, setData] = useState([])
    const [productCategories, setProductCategories] = useState([])
    const [productData, setProductData] = useState([])
    const favproduct = useSelector((state) => state.favHandler);
    const dispatch = useDispatch();
    // custom hook
    const { addToCart, isProductInCart } = useAddToCart();

    useEffect(() => {
        const getProducts = async () => {
            let productsURL = '/products'
            try {
                // Getting the data from the API
                const data = await productServices.getProducts(productsURL);

                // Find the unique categories and add 'ALL'
                const uniqueList = [...new Set(data.map(e => e.productCategory)), 'ALL'];
                setProductCategories(uniqueList);

                // If the filtered products array is empty, set the full data to productData
                if (productData.length === 0) {
                    setProductData(data);
                }
                setData(data.reverse());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])

    // Filter Products
    const filterProducts = (cat) => {
        if (cat === 'ALL') {
            return setProductData(data)
        }
        const updateList = data.filter((e) => {
            return e.productCategory === cat
        })
        setProductData(updateList)
    }

    // check bloean if already product is favorite or not
    const isFavProductInCart = (productId) => favproduct.some((e) => e._id === productId);

    // add or remove Favorite product is in Cart
    const addOrRemoveFavProduct = (product) => {
        if (isFavProductInCart(product._id)) {
            dispatch(removeFav(product));
        } else {
            dispatch(addFav(product));
        }
    };
console.log('products:', productData)
    return (
        <>
            <div className={`container-fluid fruite py-md-5 ${showsidebar ? 'mt-5' : ''}`}>
                <div className={`container ${showsidebar ? 'py-5' : ''}`}>
                    <h1 className="mb-4">Our Products</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    {
                                        showsidebar && (
                                            <div className="input-group w-100 mx-auto d-flex">
                                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                            </div>
                                        )}
                                </div>
                                <div className="col-xl-9 text-end">
                                    <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                        {
                                            productCategories.map((e, i) => {
                                                return (
                                                    <li className="nav-item" key={i}>
                                                        <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => filterProducts(e)}>
                                                            <span className="text-dark text-capitalize" style={{ width: '100px' }}>{e}</span>
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="row g-4">
                                {
                                    showsidebar && (
                                        <div className="col-lg-3">
                                            <div className="row g-4">
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <h4>Categories</h4>
                                                        <ul className="list-unstyled fruite-categorie">
                                                            {
                                                                productCategories.map((e, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <div className="d-flex justify-content-between fruite-name">
                                                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>{e}</a>
                                                                                <span>(3)</span>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <FeatureProducts />
                                            </div>
                                        </div>
                                    )
                                }
                                <div className={showsidebar ? "col-lg-9" : "col-lg-12"}>
                                    <div className="row g-4 justify-content-center">
                                        {
                                            productData.map((product, i) => {
                                                const { _id, productName, productTitle, productPrice, productImage, stocks } = product
                                                const lastStock = stocks[stocks.length - 1]?.ClosingBalance || 0;
                                                console.log(`lastStock of each product ${productName}:`, lastStock)
                                                return (
                                                    <div className={showsidebar ? "col-md-6 col-xl-4" : "col-md-6 col-xl-3"} key={i}>
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <Link to={`/products/${product._id}`}>
                                                                    <img className="w-100 rounded-top"
                                                                        style={{ objectFit: 'cover' }}
                                                                        height={200}
                                                                        src={process.env.REACT_APP_IMAGE_PATH + productImage} alt={productTitle} />
                                                                </Link>
                                                            </div>
                                                            <div className="px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px', backgroundColor: '#e9ecef' }}>{productName}</div>
                                                            <div className="px-4 py-3 border border-secondary border-top-0 rounded-bottom">
                                                                <h4 className='text-capitalize'>{productName}</h4>
                                                                <p className='m-0'>{productTitle}</p>
                                                                {/* <p>{lastStock}</p> */}
                                                                <p className="text-dark fs-5 fw-bold">Rs. {productPrice}</p>
                                                                {lastStock > 0 ?
                                                                    isProductInCart(_id) ? (
                                                                        <Link to='/cart' className='btn border border-secondary rounded-pill px-3 text-primary'>
                                                                            <i className="fa fa-shopping-bag me-2 text-primary"></i>Go to Cart
                                                                        </Link>
                                                                    ) : (
                                                                        <button href="#" className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => addToCart(product)}>
                                                                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                                                        </button>
                                                                    )
                                                                    :
                                                                    <button className='btn btn-secondary px-3 rounded-pill d-block' disabled><i className="fa fa-shopping-bag me-2 text-white"></i>Out of Stock</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            showsidebar && productData.length > 9 && (
                                                <div className="col-12">
                                                    <div className="pagination d-flex justify-content-center mt-5">
                                                        <a href="#" className="rounded">&laquo;</a>
                                                        <a href="#" className="active rounded">1</a>
                                                        <a href="#" className="rounded">2</a>
                                                        <a href="#" className="rounded">3</a>
                                                        <a href="#" className="rounded">4</a>
                                                        <a href="#" className="rounded">5</a>
                                                        <a href="#" className="rounded">6</a>
                                                        <a href="#" className="rounded">&raquo;</a>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
