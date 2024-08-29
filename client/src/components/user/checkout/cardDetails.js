import React from 'react'

export const CardDetails = ({order,handleInputChange}) => {
    return (
        <>
            <h4 className="mb-3">Payment</h4>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="payment.nameOnCard">Name on Card</label>
                    <input type="text"
                        className="form-control"
                        id="payment.nameOnCard"
                        name="payment.nameOnCard"
                        placeholder="Name on Card"
                        value={order.payment.nameOnCard}
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="payment.cardNumber">Card number</label>
                    <input type="text"
                        className="form-control"
                        id="payment.cardNumber"
                        name="payment.cardNumber"
                        placeholder="Card Number"
                        value={order.payment.cardNumber}
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="payment.expiration">Expiration</label>
                    <input type="text"
                        className="form-control"
                        id="payment.expiration"
                        name="payment.expiration"
                        placeholder="Expiry Date"
                        value={order.payment.expiration}
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="payment.cvv">CVV</label>
                    <input type="text"
                        className="form-control"
                        id="payment.cvv"
                        name="payment.cvv"
                        placeholder="CVV"
                        value={order.payment.cvv}
                        required
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </>
    )
}
