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
        let eId = await Order.find({ 'user': req.user._id });
        if (!eId) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({
            success: true,
            orderData: eId
        });
    } catch (error) {
        res.json({
            success: false,
            message : "Failed To Fetch Order",
            error: error.message
        });
    }
};

// Function to update the status of an order
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.orderId; 
        const newStatus = req.body.status; 

        const validStatusValues = ['Processing', 'Shipped', 'Delivered'];
        if (!validStatusValues.includes(newStatus)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: newStatus }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            success: true,
            updatedOrder,
        });
    } catch (error) {
        console.error('Error in updateOrderStatus:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
