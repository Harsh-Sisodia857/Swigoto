const dotenv = require("dotenv").config()
var jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET
const fetchUser = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Auth Token is Invalid"})
    }
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user
        next();
        
    } catch (error) {
        res.status(401).send({error:"Invalid Auth Token"})
    }

}
module.exports = fetchUser