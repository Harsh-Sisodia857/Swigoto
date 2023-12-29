const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;

// Function to handle user creation
const createUser = async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
};

// Function to handle user login
const loginUser = async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
};

// Function to get user details
const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({
            success : true,
            user
        });
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
};

// Function to get location
const getLocation = async (req, res) => {
    try {
        let lat = req.body.lat;
        let long = req.body.long;
        console.log(lat, long);
        
        let location = await axios
            .get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`)
            .then(async response => {
                let res = response.data.results[0].components;
                const sanitizeValue = value => value ?? "";
                let { suburb : address, country, city, state, postcode : pincode } = res;

                let locationObject = {
                    address: sanitizeValue(address),
                    country: sanitizeValue(country),
                    city: sanitizeValue(city),
                    state: sanitizeValue(state),
                    pincode: sanitizeValue(pincode)
                };

                return locationObject;
            })
            .catch(error => {
                console.error(error);
            });
        res.json({
            success : true,
            location
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error });
}
};

// Function to get food data
const getFoodData = async (req, res) => {
    try {
        res.send([global.foodData, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
};



module.exports = {
    createUser,
    loginUser,
    getUser,
    getLocation,
    getFoodData
};
