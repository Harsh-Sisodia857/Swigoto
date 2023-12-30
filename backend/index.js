const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors");
const connectDatabase = require('./db')
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
// step 2 
const cloudinary = require('./config/cloudinary');
const fileUpload = require("express-fileupload")


app.use(bodyParser.urlencoded({ extended: true }))
connectDatabase();
dotenv.config()
app.use(cors());
app.use(express.json())

// step 3
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
cloudinary.cloudinaryConnect()


app.use('/api/', require('./Routes/index'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

