import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { productServices } from '../../../services/productService';
import { Productmodel } from './productmodel';
import { Stockmodel } from './stockmodel';

export const AddProduct = () => {
    const [productCat, setProductCat] = useState('');
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [productImage, setProductImage] = useState(null);
    const [data, setData] = useState([])
    const [venders, setVenders] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [productId, setProductId] = useState('');
    const [venderId, setVenderId] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [narration, setNarration] = useState('');


    useEffect(() => {
        const getProducts = async () => {
            try {
                let productsURL = '/products'
                // Getting the data from the API
                const res = await productServices.getProducts(productsURL);
                const data = res.reverse()
                setData(data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const getVenders = async () => {
            try {
                let vendersURL = '/venders'
                // Getting the data from the API
                const res = await fetch(vendersURL);
                const venders = await res.json();
                setVenders(venders)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getVenders();
        getProducts();

    }, [])

    // add product
    const postData = async (e) => {
        e.preventDefault();
        if (!productCat || !productName || !productPrice || !productTitle || !productDescription || (!productImage && isNew)) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('productImage', productImage);
            formData.append('productCategory', productCat);
            formData.append('productName', productName);
            formData.append('productTitle', productTitle);
            formData.append('productDescription', productDescription);
            formData.append('productPrice', productPrice);
            formData.append('isNew', isNew);
            if (!isNew) {
                formData.append('_id', currentProductId);
            }

            const response = await fetch('/addEditProduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                console.log('updatedProduct', updatedProduct)
                setData((prevData) => {
                    if (isNew) {
                        return [updatedProduct, ...prevData];
                    } else {
                        return prevData.map((product) =>
                            product._id === updatedProduct._id ? updatedProduct : product
                        );
                    }
                });
                // Clear form fields after successful submission
                setProductCat('');
                setProductName('');
                setProductTitle('');
                setProductDescription('');
                setProductPrice('');
                setIsNew(true);
                setProductImage(null);
                setCurrentProductId(null);
                setLoading(false)
                swal("Success", isNew ? "Product Added Successfully!" : "Product Updated Successfully!", "success");
                document.getElementById('closeModalButton').click();
            } else {
                console.log(response)
                swal("Error", "Failed to add or update product", "error");
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    };

    // edit handler
    const handleEdit = (product) => {
        console.log('click on handleEdit in product:', product)
        setProductCat(product.productCategory);
        setProductName(product.productName);
        setProductTitle(product.productTitle);
        setProductDescription(product.productDescription);
        setProductPrice(product.productPrice);
        setProductImage(product.productImage);
        setIsNew(false);
        setCurrentProductId(product._id);
        document.getElementById('addProductModalButton').click();
    };

    // stock edit handler
    const handleStockEdit = (product) => {
        setProductId(product._id);
    }

    // add stock data
    const postStockData = async (e) => {
        e.preventDefault();
        if (!productId || !Quantity || !type || !narration || !Price) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true);
        try {
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

            if (response.ok) {
                const newStock = await response.json();
                setData(prevData =>
                    prevData.map(product =>
                        product._id === newStock.productId
                            ? { ...product, stocks: [...product.stocks, newStock] }
                            : product
                    )
                );
                swal("Success", "Stock Added Successfully!", "success");
                setLoading(false);
                setProductId(null);
                setVenderId(null)
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
        <>
            <div className='row my-4'>
                <div className='col-md-10'>
                    <h2>Add Product</h2>
                </div>
                <div className='col-md-2 text-end'>
                    <button type="button" className="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#addProductModal" id="addProductModalButton">
                        Add Product
                    </button>
                </div>
            </div>
            {/* show product listing */}
            <div className='row'>
                <div className='col-md-12'>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Stock Value</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((product) => {
                                    const lastStock = product.stocks[product.stocks.length - 1] || { ClosingBalance: '0' };
                                    return (
                                        <tr key={product._id}>
                                            <td>{product.productName}</td>
                                            <td>{product.productCategory}</td>
                                            <td>{product.productTitle}</td>
                                            <td>{product.productPrice}</td>
                                            <td>{lastStock.ClosingBalance}</td>
                                            <td>
                                                <button className='btn btn-secondary' onClick={() => handleEdit(product)}>Edit</button>
                                                <button type="button"
                                                    className="btn btn-secondary ms-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#addStockModal"
                                                    id="addStockModalButton"
                                                    onClick={() => handleStockEdit(product)}
                                                >
                                                    Manage Stock
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add product Modal */}
            <Productmodel
                isNew={!currentProductId}
                postData={postData}
                setProductCat={setProductCat}
                productCat={productCat}
                productName={productName}
                setProductName={setProductName}
                productTitle={productTitle}
                setProductTitle={setProductTitle}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
                productPrice={productPrice}
                setProductPrice={setProductPrice}
                productImage={productImage}
                setProductImage={setProductImage}
                loading={loading}
            />

            {/* add Stock Modal */}
            <Stockmodel
                postStockData={postStockData}
                productId={productId}
                setProductId={setProductId}
                Quantity={Quantity}
                setQuantity={setQuantity}
                Price={Price}
                setPrice={setPrice}
                venderId={venderId}
                setVenderId={venderId}
                venders={venders}
                type={type}
                setType={setType}
                narration={narration}
                setNarration={setNarration}
                loading={loading}
            />
        </>
    );
};