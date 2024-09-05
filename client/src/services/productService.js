import { apiHelper } from "../helper/apiHelper";

export const productServices = {
    // Fetch all products
    getProducts: (productsURL) => apiHelper.get(productsURL),

    // Fetch all categories
    getCategories: (categoriesURL) => apiHelper.get(categoriesURL),

    // Fetch a single product by its ID
    getProductById: (ProductByIdURL, productId) => apiHelper.get(`${ProductByIdURL}${productId}`),

    // Fetch remaining stock of a product by its ID
    getRemainingStock: (getRemainingStockURL, productId) => apiHelper.get(`${getRemainingStockURL}${productId}`),

    // Delete a product by its ID
    deleteProduct: (deleteProductURL) => apiHelper.delete(`${deleteProductURL}`),
};