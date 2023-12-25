const express = require('express');
const router = express.Router();
const { newOrder, getMyOrderData } = require('../controller/OrderController');
const fetchUser = require('../middleware/fetchdetails');


// Whenever the pattern of route is /users handle it in users file
router.use('/user', require('./user'))
router.use('/restaurent', require('./restaurent'))
router.use('/dishes', require('./dishes'))

// Route: /api/createOrder
router.post('/order', fetchUser, newOrder);

// Route: /api/myOrderData
router.post('/myOrderData', getMyOrderData);

module.exports = router;