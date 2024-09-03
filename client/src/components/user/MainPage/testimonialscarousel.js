import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';


export const Testimonialscarousel = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const productsURL = '/products'
            try {
                const response = await axios.get(productsURL);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])

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
                items: 2
            },
            1200: {
                items: 2
            }
        }
    };

    return (
        <div className="container-fluid testimonial">
            <div className="container">
                <div className="testimonial-header text-center">
                    <h4 className="text-primary">Our Testimonial</h4>
                    <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
                </div>
                {data.length > 0 && (
                    <OwlCarousel className="owl-carousel testimonial-carousel" {...owlCarouselOptions}>
                        {
                            data.map((product, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                                            <div className="position-relative">
                                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute end-0" style={{ bottom: '30px' }}></i>
                                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center flex-nowrap">
                                                    <div className="bg-secondary rounded">
                                                        <img src="images/testimonial-1.jpg" className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="" />
                                                    </div>
                                                    <div className="ms-4 d-block">
                                                        <h4 className="text-dark">Client Name</h4>
                                                        <p className="m-0 pb-3">Profession</p>
                                                        <div className="d-flex pe-5">
                                                            <i className="fas fa-star text-primary"></i>
                                                            <i className="fas fa-star text-primary"></i>
                                                            <i className="fas fa-star text-primary"></i>
                                                            <i className="fas fa-star text-primary"></i>
                                                            <i className="fas fa-star"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </OwlCarousel>
                )}
            </div>
        </div>
    )
}
