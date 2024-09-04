import React, { useEffect, useState } from 'react'

export const Productmodel = ({
    isNew,
    postData,
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
    loading,
    imagePreview,
    setImagePreview
}) => {

    useEffect(() => {
        // If in edit mode and productImage URL is provided, update image preview
        if (!isNew && productImage) {
            setImagePreview(productImage);
        }
    }, [productImage, isNew]);


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
                                        required={isNew}
                                    />
                                    <a className="imgholdingdiv border p-2 rounded" onClick={() => document.getElementById('upload_input').click()}>Upload Image</a>
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
