const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors");
const connectDatabase = require('./db')
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload")
const port = process.env.PORT || 5000;
const cloudinary = require('./config/cloudinary');
app.use(bodyParser.urlencoded({ extended: true }))
connectDatabase();
dotenv.config()
app.use(cors());
app.use(express.json())


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))



cloudinary.cloudinaryConnect()


app.use('/api/', require('./Routes/index'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

