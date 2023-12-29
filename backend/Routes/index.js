const express = require('express');
const router = express.Router();
const { newOrder, getMyOrderData } = require('../controller/OrderController');
const { authenticated } = require('../middleware/auth');


// Whenever the pattern of route is /users handle it in users file
router.use('/user', require('./user'))
router.use('/restaurent', require('./restaurent'))
router.use('/dishes', require('./dishes'))

// Route: /api/createOrder
router.post('/order', authenticated, newOrder);

// Route: /api/myOrderData
router.post('/myOrderData', getMyOrderData);

module.exports = router;