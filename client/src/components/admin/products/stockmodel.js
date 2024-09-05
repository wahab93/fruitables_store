import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const Stockmodel = ({ setData, productId, setProductId }) => {
    const [venders, setVenders] = useState([])
    const [loading, setLoading] = useState(false);
    const [Quantity, setQuantity] = useState('');
    const [Price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [narration, setNarration] = useState('');
    const [venderId, setVenderId] = useState('');

    useEffect(() => {
        const getVenders = async () => {
            try {
                const response = await fetch('/venders');
                const data = await response.json()
                setVenders(data)
                console.log('vender in stockmodel API:', data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getVenders();
    }, [])

    // add stock data
    const postStockData = async (e) => {
        e.preventDefault();
        if (!productId || !Quantity || !type || !narration || !Price || !venderId) {
            alert('Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            const stockData = {
                productId: productId,
                venderId: venderId,
                userId: '',
                Quantity: Quantity,
                Price: Price,
                type: type,
                narration: narration,
                createdAt: new Date().toISOString()
            };

            const response = await fetch('/manageStocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stockData)
            });
            console.log('stockdata when inserting intoAPI in stockModalComponent:', stockData)

            if (response.ok) {
                const newStock = await response.json();
                console.log('newStock after response in StockModal Component:', newStock)
                setData(prevData =>
                    prevData.map(product =>
                        product._id === newStock.productId
                            ? { ...product, stocks: [...product.stocks, newStock] }
                            : product
                    )
                );
                swal("Success", "Stock Added Successfully!", "success");
                setLoading(false);
                setProductId('');
                setVenderId('')
                setQuantity('')
                setPrice('')
                setType('')
                setNarration('')
                document.getElementById('closeStockModalButton').click();
            } else {
                swal("Error", "Failed to add stock", "error");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            swal("Error", "An error occurred while adding stock", "error");
        }
    };
    return (
        <div className="modal fade" id="addStockModal" tabIndex="-1" aria-labelledby="addStockModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addStockModalLabel">Manage Stock</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="productId" className="form-label">Product ID</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Product ID'
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
                                        value={Quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="Price" className="form-label">Price</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Stock Price'
                                        name='Price'
                                        value={Price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="venderId" className="form-label">Vender</label>
                                    <select
                                        className='form-select'
                                        name='venderId'
                                        onChange={(e) => setVenderId(e.target.value)}
                                        value={venderId}>
                                        <option value="">Select a vendor</option>
                                        {venders && venders.length > 0 ? (
                                            venders.map((vendor) => (
                                                <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
                                            ))
                                        ) : (
                                            <option value="">No Vendors Available</option>
                                        )}
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