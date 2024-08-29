// EmptyCartMessage.js
import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyCart = () => {
    return (
        <>
            <div className='col-md-12 text-center'>
                <h1 className="display-5 c-secondarycolor">Your Cart is Empty</h1>
                <Link to="/products" className="btn btn-primary text-uppercase" style={{ width: '200px' }}>
                    Return to Shop
                </Link>
            </div>
        </>
    );
};