import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { useLogout } from '../../../hooks/useLogout';
import $ from 'jquery';

export const Navbar = () => {
    const stateUser = useSelector((state) => state.userHandler.user);
    const stateCart = useSelector((state) => state.cartHandler.cart || []);
    // const stateCartfav = useSelector((state) => state.favHandler);
    // console.log(stateCartfav)

    const logOut = useLogout();

    useEffect(() => {
        // Initialize jQuery click event when the component mounts
        $('.nav-link , .user').on('click', function () {
            // Add your jQuery click event logic here
            $('.navbar-collapse').removeClass('show')
        });
    }, []);


    return (
        <>
            <div className="container-fluid fixed-top p-0">
                <div className="container-fluid topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">123 Street, New York</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">Email@Example.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl mt-2">
                        <Link to='/' className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    Home
                                </NavLink>
                                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    About
                                </NavLink>
                                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    Products
                                </NavLink>
                                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    Contact Us
                                </NavLink>
                                {stateUser &&
                                    <NavLink to="/myorders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                        My Orders
                                    </NavLink>
                                }
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>
                                <Link to="/cart" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag"></i>
                                    {
                                        stateCart.length > 0 &&
                                        <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                            style={{ top: '-10px', left: '15px', height: '20px', minWidth: '20px' }}>
                                            {stateCart.length}
                                        </span>
                                    }
                                </Link>
                                {stateUser ? (
                                    <a href="#" className="my-auto" onClick={logOut}>
                                        <i className="fas fa-sign-out"></i>
                                    </a>
                                ) : (
                                    <Link to="/login" className="my-auto">
                                        <i className="fas fa-user"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
