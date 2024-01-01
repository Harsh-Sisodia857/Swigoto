const express = require('express');
const router = express.Router();
const { authenticated } = require('../middleware/auth');


// Whenever the pattern of route is /users handle it in users file
router.use('/user', require('./user'))
router.use('/restaurent', require('./restaurent'))
router.use('/dishes', require('./dishes'))
router.use('/order', require('./order.js'))


module.exports = router;