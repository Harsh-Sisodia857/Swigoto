const express = require('express');
const router = express.Router();
const { authenticated, authorizedRoles } = require('../middleware/auth');
const { newOrder, getMyOrderData, updateOrderStatus } = require('../controller/OrderController');

// Route: /api/createOrder
router.post('/', authenticated, newOrder);
router.get('/orderData', authenticated, getMyOrderData);
router.post('/update', authenticated, updateOrderStatus);

module.exports = router;