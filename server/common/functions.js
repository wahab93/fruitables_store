const Stock = require("../model/stockSchema");
const Product = require('../model/productSchema');

const getClosingBalance = async (productId) => {
    const lastStock = await Stock.findOne({ productId }).sort({ createdAt: -1 });
    return lastStock ? lastStock.ClosingBalance : 0;
};

const manageStock = async (productId, quantity, type, narration,customerId) => {
    try {
        const OpeningBalance = await getClosingBalance(productId);
        let closingBalance = 0;

        if (type === 1) {
            closingBalance = OpeningBalance + quantity;
        } else if (type === 2) {
            if(quantity > OpeningBalance){
                throw new Error(`\nYou seleced more products than our Stocks: \nAvailable Stock ${OpeningBalance}`);
            }
            closingBalance = OpeningBalance - quantity;
        }

        const newStock = new Stock({
            productId,
            venderId: null, // Or any default value or fetched vendor ID
            userId: customerId, // Or any default value or fetched user ID
            OpeningBalance,
            ClosingBalance: closingBalance,
            Quantity: quantity,
            Price: 0, // Not relevant for stock reduction on order
            type,
            narration
        });

        await newStock.save();

        await Product.findByIdAndUpdate(
            productId,
            { $push: { stocks: newStock._id } },
            { new: true, useFindAndModify: false }
        );
    } catch (error) {
        console.error('Error managing stocks:', error.message);
        throw error;
    }
};



// Create a new order
const generateOrderCode = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${randomString}`;
};

module.exports = { manageStock, getClosingBalance, generateOrderCode };