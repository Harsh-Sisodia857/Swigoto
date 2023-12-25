const express = require('express')
const app = express()
const dotenv = require("dotenv")
const connectDatabase = require('./db')
connectDatabase();
dotenv.config()
const port = process.env.PORT || 5000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())


app.use('/api/', require('./Routes/index'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

