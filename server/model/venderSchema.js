const mongoose = require('mongoose');

// Define the Vender schema
const venderSchema = new mongoose.Schema({
    name: { 
        type: String, 
    required: true 
    },
    contactNumber: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: {
        street: { 
            type: String, 
            required: true 
        },
        city: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        postalCode: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        }
    },
    company: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Create the Vender model
const Vender = mongoose.model('Vender', venderSchema);

module.exports = Vender;