const Order = require('../models/Orders');

exports.newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            FoodItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;
        const order = await Order.create({
            shippingInfo,
            FoodItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user.id,
        });
        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error in newOrder:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get user's order data
module.exports.getMyOrderData = async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: eId });
    } catch (error) {
        res.send("Error", error.message);
    }
};