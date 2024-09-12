import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

export const Productscarousel = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            let productsURL = `${process.env.REACT_APP_BASE_URL}/products`
            try {
                const response = await axios.get(productsURL);
                const data = response.data.reverse();
                setData(data)
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
                {data.length > 0 ? (
                    <OwlCarousel className="owl-carousel vegetable-carousel justify-content-center" {...owlCarouselOptions}>
                        {
                            data.map((product, i) => {
                                const { productName, productImage } = product
                                return (
                                    <div key={i} className="border border-primary rounded position-relative vesitable-item">
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
                                )
                            })
                        }
                    </OwlCarousel>
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
}
