import React from 'react'
import { useSelector } from 'react-redux';
import { CartItems } from './cartItems';
import { EmptyCart } from './emptyCart';

export const Cart = () => {
    const stateCart = useSelector((state) => state.cartHandler.cart || []);
    console.log(stateCart)
    return (
        <div className="container-fluid py-md-5">
            <div className="container py-5 mt-5">
                <div className='row'>
                    <h1>Cart Details</h1>
                </div>
                {stateCart.length === 0 && <EmptyCart />}
                {stateCart.length != 0 && <CartItems stateCart={stateCart} />}
            </div>
        </div>
    )
}
