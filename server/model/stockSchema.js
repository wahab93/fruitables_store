const mongoose = require('mongoose');

// Define the Stock schema
const stockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    venderId: { type: String },
    userId: { type: String },
    OpeningBalance: { type: Number, required: true },
    ClosingBalance: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, required: true },
    narration: { type: String, required: true }
});

// Create the Stock model
const Stock = mongoose.model('stocks', stockSchema);

module.exports = Stock;