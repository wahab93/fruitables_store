import { apiHelper } from "../helper/apiHelper";

export const productServices = {
    getProducts: (productsURL) => apiHelper.get(productsURL),
    getCategories: (categoriesURL) => apiHelper.get(categoriesURL),
    getProductById: (ProductByIdURL, productId) => apiHelper.get(`${ProductByIdURL}${productId}`),
    getRemainingStock: (getRemainingStockURL, productId) => apiHelper.get(`${getRemainingStockURL}${productId}`),
}