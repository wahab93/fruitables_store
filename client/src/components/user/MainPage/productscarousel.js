import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { productServices } from '../../../services/productService';
import axios from 'axios';

export const Productscarousel = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const productsURL = '/products';
            try {
                const response = await axios.get(productsURL);
                setData(response.data.reverse());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, []);

    const owlCarouselOptions = {
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-arrow-right"></i>',
            '<i class="fa fa-arrow-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 4
            },
        }
    };



    return (
        <div className="container-fluid vesitable" id='vesitable'>
            <div className="container">
                <h1 className="mb-0">Fresh Organic Vegetables</h1>
                <OwlCarousel className="owl-carousel vegetable-carousel justify-content-center" {...owlCarouselOptions}>
                    {
                        data.map((product, i) => {
                            const { productName, productImage } = product
                            return (
                                <React.Fragment key={i}>
                                    <div className="border border-primary rounded position-relative vesitable-item">
                                        <div className="vesitable-img">
                                            <img src={process.env.REACT_APP_IMAGE_PATH + productImage}
                                                className="w-100"
                                                height={200}
                                                style={{ objectFit: 'cover' }}
                                                alt={productName}
                                            />
                                        </div>
                                        <div className="p-4 rounded-bottom">
                                            <h4 className='text-center'>{productName}</h4>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </OwlCarousel>
                <div className="owl-carousel vegetable-carousel justify-content-center">
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Parsely</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Parsely</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Banana</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Bell Papper</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Potatoes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Parsely</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Potatoes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src="/images/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>Parsely</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
