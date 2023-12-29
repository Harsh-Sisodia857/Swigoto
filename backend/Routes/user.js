const express = require('express');
const { body } = require('express-validator');
const { authenticated } = require('../middleware/auth');
const { loginUser, createUser, getUser, getLocation, getFoodData, orderData, getMyOrderData } = require('../controller/userController');

const router = express.Router();

// Route: /api/createuser
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], createUser);

// Route: /api/login
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], loginUser);

// Route: /api/getuser
router.get('/getuser', authenticated, getUser);

// Route: /api/getlocation
router.post('/getlocation', getLocation);

// Route: /api/foodData
router.get('/foodData', getFoodData);

router.post('/logout', (req, res) => {
    // Clear the token from the client (assuming it's in the 'auth-token' header)
    res.setHeader('auth-token', '');

    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;