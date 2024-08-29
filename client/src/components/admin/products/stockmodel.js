import React from 'react'

export const Stockmodel = ({
    postStockData, 
    productId, 
    setProductId,
    Quantity,
    setQuantity,
    Price,
    setPrice,
    venderId,
    setVenderId,
    venders,
    type,
    setType,
    narration,
    setNarration,
    loading

}) => {
    return (
        <div className="modal fade" id="addStockModal" tabIndex="-1" aria-labelledby="addStockModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addStockModalLabel">Manage Stock</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={postStockData}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="productId" className="form-label">Product ID</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Product ID'
                                        id='productId'
                                        name='productId'
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="Quantity" className="form-label">Quantity</label>
                                    <input type="number"
                                        className='form-control'
                                        placeholder='Quantity'
                                        name='Quantity'
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={Quantity}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="Price" className="form-label">Price</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Stock Price'
                                        id='Price'
                                        name='Price'
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={Price}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="venderId" className="form-label">Vender</label>
                                    <select
                                        className='form-select'
                                        name='venderId'
                                        id='venderId'
                                        onChange={(e) => setVenderId(e.target.value)}
                                        value={venderId}>
                                        <option value="">Select a vendor</option>
                                        {venders.map((vendor) => (
                                            <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select
                                        className='form-select'
                                        name='type'
                                        onChange={(e) => setType(e.target.value)}
                                        value={type}>
                                        <option value="">Select Type IN/OUT</option>
                                        <option value="1">Stock IN</option>
                                        <option value="2">Stock Out</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="narration" className="form-label">Narration</label>
                                    <textarea
                                        className='form-control'
                                        placeholder='Narration'
                                        name='narration'
                                        onChange={(e) => setNarration(e.target.value)}
                                        value={narration}
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeStockModalButton">Close</button>
                        <button type="button" className="btn btn-primary" onClick={postStockData} disabled={loading}>
                            {loading ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                :
                                "Manage Stock"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}