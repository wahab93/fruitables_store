const express = require('express')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')
const path = require('path');
const bcrypt = require('bcrypt')
const authenticate = require('../middleware/authenticate')
const Product = require('../model/productSchema')
const multer = require('multer');
const orderSchema = require('../model/orderSchema');
const Category = require('../model/categorySchema');
const Stock = require('../model/stockSchema');
const Vender = require('../model/venderSchema');
const { getClosingBalance, manageStock, generateOrderCode } = require('../common/functions');


const storage = multer.diskStorage({
    // if you store images in client si de public folder
    destination: '../client/public/images/productImages',
    // if you store images in server side public folder
    // destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});


// Add or Edit New Product
router.post('/addEditProduct', upload.single('productImage'), async (req, res) => {
    try {
        const { productCategory, productName, productTitle, productDescription, productPrice, isNew, _id } = req.body;
        const productImage = req.file ? req.file.filename : null;

        let product;
        if (isNew === 'false' && _id) {
            // Editing an existing product
            product = await Product.findById(_id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            product.productCategory = productCategory;
            product.productName = productName;
            product.productTitle = productTitle;
            product.productDescription = productDescription;
            product.productPrice = productPrice;
            if (productImage) {
                product.productImage = productImage;
            }
        } else {
            // Adding a new product
            product = new Product({
                productCategory,
                productName,
                productTitle,
                productDescription,
                productPrice,
                productImage,
            });
        }
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});



// get All Products
router.get('/products', async (req, res) => {
    try {
        // const products = await Product.find();
        // Find all products and populate the stock information
        const products = await Product.find({}).populate('stocks')

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        // Extract the product ID from the request parameters
        const productId = req.params.id;

        // Fetch the product from the database using the ID
        const product = await Product.findById(productId).populate('stocks');

        // If the product is not found, return a 404 error
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the product if found
        res.json(product);
    } catch (error) {
        console.error('Error fetching product on Server:', error);

        // Return a 500 error if something goes wrong
        res.status(500).json({ error: 'Failed to fetch product on Server' });
    }
});

// Delete product and its stock
router.delete('/deleteProduct/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        // console.log('productId in delete Request:', productId)

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete all associated stock entries
        await Stock.deleteMany({ product: productId });

        // Delete the product itself
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product and associated stock deleted successfully' });
    } catch (error) {
        console.error('Error deleting product and stock:', error.message);
        res.status(500).json({ error: 'Failed to delete product and stock' });
    }
});

// Add or Edit New Product
router.post('/addEditCategory', async (req, res) => {
    try {
        const { categoryName, categoryTitle, isNew, _id } = req.body;

        let category;
        if (isNew === 'false' && _id) {
            // Editing an existing category
            category = await Category.findById(_id);
            if (!category) {
                return res.status(404).json({ error: 'category not found' });
            }
            category.categoryName = categoryName;
            category.categoryTitle = categoryTitle;
        } else {
            // Adding a new category
            category = new Category({ categoryName, categoryTitle });
        }

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Get All categories
router.get('/categories', async (req, res) => {
    try {
        // Fetch distinct categories from the database
        const categories = await Product.distinct('productCategory');

        // Respond with the fetched categories
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Define the GET API to fetch all vendors
router.get('/venders', async (req, res) => {
    try {
        const venders = await Vender.find();
        res.status(200).json(venders);
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// manage stockes
router.post('/manageStocks', async (req, res) => {
    try {
        const { productId, venderId, userId, narration } = req.body;
        // const Quantity = parseInt(req.body.Quantity, 10);
        const Quantity = parseInt(req.body.Quantity);
        const Price = parseFloat(req.body.Price);
        const type = parseFloat(req.body.type);


        // Get the opening balance before creating the new stock entry
        const OpeningBalance = await getClosingBalance(productId);

        var closingBalance = 0;
        if (type === 1) {
            closingBalance = OpeningBalance + Quantity
        } else if (type === 2) {
            closingBalance = OpeningBalance - Quantity
        }

        // Create a new stock entry
        const newStock = new Stock({
            productId,
            venderId,
            userId,
            OpeningBalance,
            ClosingBalance: closingBalance,
            Quantity,
            Price,
            type,
            narration
        });

        // Save the stock entry to the database
        await newStock.save();

        // Update the product with the new stock reference
        await Product.findByIdAndUpdate(
            productId,
            { $push: { stocks: newStock._id } },
            { new: true, useFindAndModify: false }
        );

        // Respond with the created stock entry
        res.status(200).json(newStock);
    } catch (error) {
        console.error('Error managing stocks:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get remaining stock for a product
router.get('/getRemainingStock/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        // Get the closing balance for the product
        const ClosingBalance = await getClosingBalance(productId);

        res.status(200).json({ remainingStock: ClosingBalance });
    } catch (error) {
        console.error('Error fetching remaining stock:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to add a new vendor
router.post('/addVender', async (req, res) => {
    try {
        const venderDetails = req.body;
        const vender = new Vender(venderDetails);
        const savedVender = await vender.save();
        res.status(200).json(savedVender);
    } catch (error) {
        console.error('Error inserting vendor:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// store Contact form message data to server
router.post('/contactMessage', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: 'please fill contact form' })
        }
        const userContactForm = await User.findOne({ _id: req.userID })
        if (userContactForm) {
            const userMessage = await userContactForm.addMessage(name, email, phone, message);
            await userContactForm.save()
            res.status(200).json({ message: "Succssefully send contact message" })
        }
    } catch (error) {
        console.log(error);
    }
})

// Fetch all orders for admin
router.get('/getOrders', async (req, res) => {
    try {
        const orders = await orderSchema.find().populate('customerId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', details: error });
    }
});

// Create or update an order
router.post('/addEditOrder', async (req, res) => {
    try {
        const { orderId, billingAddress, payment, cart, totalAmount, customerId, orderStatus } = req.body;

        if (orderId) {
            // Update existing order
            const order = await orderSchema.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Update order details
            // order.billingAddress = billingAddress || order.billingAddress;
            // order.payment = payment || order.payment;
            // order.cart = cart || order.cart;
            // order.totalAmount = totalAmount || order.totalAmount;
            // order.customerId = customerId || order.customerId;
            order.orderStatus = orderStatus || order.orderStatus;

            await order.save();
            console.log('Updated order in addEditOrder API', order)
            return res.status(200).json(order);
        } else {
            // Generate order code
            const orderCode = generateOrderCode();

            // Create a new order instance
            const newOrder = new orderSchema({
                orderCode,
                orderStatus,
                customerId,
                billingAddress,
                payment,
                cart,
                totalAmount,
            });
            // Update stock for each product in the cart
            for (const item of cart) {
                const { _id, quantity } = item;
                await manageStock(_id, quantity, 2, `Order created with Order Code: ${orderCode}`, customerId);
            }

            // Save the order to the database
            await newOrder.save();
            console.log('new order in addeditOrder APi', newOrder)
            // Emit a Socket.IO event for the new order
            req.io.emit('newOrder', newOrder);
            return res.status(200).json(newOrder);
        }
    } catch (error) {
        console.log('error in api', error)
        res.status(500).json({ error: error.message });
    }
});

// Fetch orders along with user details
router.get('/getOrders/:userId', async (req, res) => {

    const { userId } = req.params;
    try {
        // const orders = await orderSchema.find({customerId : '664efe1d7e4c9c129743da89'}).populate('customerId');
        const orders = await orderSchema.find({ customerId: userId }).populate('customerId');
        // console.log('order', orders)
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch product on Server' });
    }
});

// Register User
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, confirmpassword, role } = req.body;
    if (!name || !email || !phone || !work || !password || !confirmpassword) {
        return res.status(422).json({ error: "please fill all Fields" })
    }

    try {
        const userexist = await User.findOne({ email: email })
        if (userexist) {
            return res.status(422).json({ error: "Email Already Exist" })
        } else if (password !== confirmpassword) {
            return res.status(422).json({ error: 'Password and confirm password are not matched' })
        } else {
            const user = new User({ name, email, phone, work, password, confirmpassword, role })
            await user.save();
            res.status(200).json({ message: "user Registeration succesfull" })
        }
    } catch (error) {
        console.log(error);
    }
})

// user Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'please fill login' })
        }
        const userLogin = await User.findOne({ email: email })
        // check email and pass with Database
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            // for generate Token JWT
            const token = await userLogin.generateAuthToken();
            res.cookie('jsonwebtoken', token, {
                expires: new Date(Date.now() + 25892000000), // Cookie expiration time (30 days)
                httpOnly: true // Cookie accessible only via HTTP(S) protocol
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" })
            } else {
                res.status(200).json({ message: "login Successfully", user: userLogin })
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
    }
})

// logout Route
router.post('/logout', authenticate, async (req, res) => {
    try {
        // Call removeToken method to remove the token associated with the user
        await req.rootUser.removeToken(req.token);
        res.clearCookie('jsonwebtoken'); // Clear the token from cookies
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// getUSerData for Contact Page and Home Page
// router.get('/getData', authenticate, (req, res) => {
//     res.send(req.rootUser);
// })


// delete All Stockes
// router.delete('/deleteAllStocks', async (req, res) => {
//     try {
//         // Delete all stock records
//         await Stock.deleteMany({});
//         await Product.deleteMany({});

//         res.status(200).json({ message: 'All stock records deleted successfully products' });
//     } catch (error) {
//         console.error('Error deleting all stock records:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



module.exports = router;
