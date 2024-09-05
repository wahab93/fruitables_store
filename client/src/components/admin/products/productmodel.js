import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const Productmodel = ({
    setData,
    isNew,
    setIsNew,
    setProductCat,
    productCat,
    setProductName,
    productName,
    productTitle,
    setProductTitle,
    productDescription,
    setProductDescription,
    productPrice,
    setProductPrice,
    productImage,
    setProductImage,
    imagePreview,
    setImagePreview,
    currentProductId,
    setCurrentProductId,
    productStock
}) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If in edit mode and productImage URL is provided, update image preview
        if (!isNew && productImage) {
            setImagePreview(productImage);
        }
    }, [productImage, isNew]);

    // add product
    const postData = async (e) => {
        e.preventDefault();
        if (!productCat || !productName || !productPrice || !productTitle || !productDescription || !productImage) {
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
                formData.append('productStock', productStock);
            }
    
            // Log FormData for debugging
            for (let pair of formData.entries()) {
                console.log(`printed formData ${pair[0]}: ${pair[1]}`);
            }

            const response = await fetch('/addEditProduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                console.log('updatedProduct', updatedProduct)
                setData((prevData) => {
                    console.log('prevData when setting setData', prevData)
                    if (isNew) {
                        console.log('isnew true/ false', isNew)
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
                console.log(response.message)
                swal("Error", "Failed to add or update product", "error");
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addProductModalLabel">{isNew ? "Add Product" : "Edit Product"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={postData}>
                            <div className="row g-3">
                                {/* Product Category Filed */}
                                <div className="col-md-6">
                                    <label htmlFor="productCategory" className="form-label">Product Category</label>
                                    <select className="form-select"
                                        aria-label="Default select example"
                                        id='productCategory'
                                        name='productCategory'
                                        onChange={(e) => setProductCat(e.target.value)}
                                        value={productCat}
                                    >
                                        <option>Category</option>
                                        <option value="fruite">Fruite</option>
                                        <option value="vegetables">Vegetables</option>
                                        <option value="men's clothing">men's clothing</option>
                                        <option value='jewelery'>jewelery</option>
                                        <option value='electronics'>electronics</option>
                                        <option value="women's clothing">women's clothing</option>
                                    </select>
                                </div>
                                {/* Product Name Filed */}
                                <div className="col-md-6">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input type="text" className='form-control' placeholder='Product Name' id='productName'
                                        onChange={(e) => setProductName(e.target.value)}
                                        value={productName}
                                    />
                                </div>
                                {/* Product Title Filed */}
                                <div className="col-md-6">
                                    <label htmlFor="productTitle" className="form-label">Product Title</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Product Title'
                                        onChange={(e) => setProductTitle(e.target.value)}
                                        value={productTitle}
                                    />
                                </div>
                                {/* Product Description Filed */}
                                <div className="col-md-6">
                                    <label htmlFor="productDescription" className="form-label">Product Description</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Product Description'
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        value={productDescription}
                                    />
                                </div>
                                {/* Product Price Filed */}
                                <div className="col-md-6">
                                    <label htmlFor="productPrice" className='form-label'>Product Price</label>
                                    <input type="number"
                                        className='form-control'
                                        placeholder='Product Price'
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </div>
                                {/* Product Image Filed */}
                                <div className="col-md-12">
                                    <label htmlFor="productImage" className='form-label d-block'>
                                        {isNew ? 'Product Image' : 'Selected Image'}
                                    </label>
                                    {imagePreview && (
                                        <img
                                            src={isNew ? imagePreview : process.env.REACT_APP_IMAGE_PATH + imagePreview}
                                            alt="Product Preview"
                                            width={100}
                                            className="d-block img-fluid mb-2"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="upload_input"
                                        className='d-none'
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setProductImage(file);
                                            setImagePreview(URL.createObjectURL(file));
                                        }}
                                    // required={isNew}
                                    />
                                    <a className="imgholdingdiv border p-2 rounded cursor-pointer" onClick={() => document.getElementById('upload_input').click()}>Upload Image</a>
                                </div>
                            </div>
                            <div className='row justify-content-end'>
                                <div className='col-md-3 text-end'>
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal" id="closeModalButton">Close</button>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            :
                                            (isNew ? "Add Product" : "Update Product")
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
