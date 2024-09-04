import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { productServices } from '../../../services/productService';
import { Productmodel } from './productmodel';
import { Stockmodel } from './stockmodel';
import DataTable from 'react-data-table-component';


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

    const [imagePreview, setImagePreview] = useState('');
    const [filterText, setFilterText] = useState('');


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
        try {
            setLoading(true)
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
                setImagePreview('')
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
        setImagePreview(product.imagePreview);
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

    // Columns configuration for DataTable
    const columns = [
        {
            name: 'Image',
            selector: row => (
                <img
                    src={`${process.env.REACT_APP_IMAGE_PATH}${row.productImage}`}
                    alt={row.productName}
                    className='rounded-circle'
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                />
            ),
            maxWidth: '100px'
        },
        {
            name: 'Name',
            selector: row => row.productName,
            maxWidth: '150px'
        },
        {
            name: 'Category',
            selector: row => row.productCategory,
            maxWidth: '150px'
        },
        {
            name: 'Title',
            selector: row => row.productTitle,
            maxWidth: '150px'
        },
        {
            name: 'Price',
            selector: row => row.productPrice,
            maxWidth: '100px'
        },
        {
            name: 'Stock Value',
            selector: row => row.stocks[row.stocks.length - 1]?.ClosingBalance || '0',
            maxWidth: '10px'
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button className='btn btn-sm btn-secondary' onClick={() => handleEdit(row)}>Edit</button>
                    <button type="button"
                        className="btn btn-sm btn-secondary ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addStockModal"
                        onClick={() => handleStockEdit(row)}
                    >
                        Manage Stock
                    </button>
                </>
            ),
        }
    ];

    const filteredData = data.filter(product =>
        product.productName.toLowerCase().includes(filterText.toLowerCase())
    );


    return (
        <>
            <div className='row mt-4'>
                <div className='col-md-10'>
                    <h3>Add Product</h3>
                </div>
                <div className='col-md-2 text-end'>
                    <button type="button" className="btn btn-sm btn-primary text-white" data-bs-toggle="modal" data-bs-target="#addProductModal" id="addProductModalButton">
                        Add Product
                    </button>
                </div>
            </div>
            <div className='row mb-3 justify-content-end'>
                <div className='col-md-6'>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search Products by Name"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
            </div>
            {/* DataTable for displaying products */}
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
            />

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
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
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