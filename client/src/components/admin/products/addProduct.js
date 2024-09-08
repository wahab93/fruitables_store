import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { productServices } from '../../../services/productService';
import { Productmodel } from './productmodel';
import { Stockmodel } from './stockmodel';
import DataTable from 'react-data-table-component';


export const AddProduct = () => {
    console.log('rerender hua')
    const [productCat, setProductCat] = useState('');
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [productImage, setProductImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [data, setData] = useState([])
    const [productStock, setProductStock] = useState('');
    const [currentProductId, setCurrentProductId] = useState(null);
    const [productId, setProductId] = useState('');
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
        getProducts();
    }, [])

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
        // Fetch stock data and preserve it for display
        const productStock = product.stocks[product.stocks.length - 1]?.ClosingBalance || '0';
        console.log('productStocks in edit handler:', productStock)
        setProductStock(productStock); // Add a new state to manage stock in the form
        document.getElementById('addProductModalButton').click();
    };

    // stock edit handler
    const handleStockEdit = (product) => setProductId(product._id);

    // Delete handler
    const handleDelete = async (productId) => {
        console.log('productId in handleDelete:', productId)
        const confirmDelete = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (confirmDelete) {
            try {
                const response = await productServices.deleteProduct(`/deleteProduct/${productId}`); // Assuming this is the correct API call
                setData(data.filter((item) => item._id !== productId));
                swal(`${response.message}`, {
                    icon: "success",
                });
            } catch (error) {
                swal("Error deleting product!", {
                    icon: "error",
                });
                console.error('Error deleting product:', error);
            }
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
                    <button className='btn btn-sm' onClick={() => handleEdit(row)}><i className='fa fa-edit'></i></button>
                    <button
                        className="btn btn-sm ms-2"
                        onClick={() => handleDelete(row._id)}
                    >
                        <i className='fa fa-trash text-danger'></i>
                    </button>
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

    // search products by their name 
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
                setData={setData}
                isNew={!currentProductId}
                setIsNew={setIsNew}
                currentProductId={currentProductId}
                setCurrentProductId={setCurrentProductId}
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
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                productStock={productStock}
            />

            {/* add Stock Modal */}
            <Stockmodel setData={setData} productId={productId} setProductId={setProductId} />
        </>
    );
};