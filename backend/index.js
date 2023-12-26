const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors");
const connectDatabase = require('./db')
connectDatabase();
dotenv.config()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())


app.use('/api/', require('./Routes/index'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

