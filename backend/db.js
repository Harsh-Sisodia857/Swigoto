const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const connectDatabase = () => {
     mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host} ${process.env.PORT}`);
        }).catch((err) => {
            console.log(err);
        });
};
module.exports = connectDatabase;