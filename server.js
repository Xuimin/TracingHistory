require('dotenv').config();

// npm install express mongoose cors dotenv --save
const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: process.env.ORIGIN // http://localhost:3000
}

app.use(cors(corsOption));
app.use(express.json()); // content-type - application/json
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded

// connect to mongodb atlas
const db = require("./app/models") 
db.mongoose.connect(
  process.env.MONGODB_URI, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then(() => {
    console.log("Database successfully connected")
  }).catch(err => {
    console.log("Cannot connect to database", err)
    process.exit()
  })

// simple route --localhost:3000/
app.get("/", (req, res) => {
  res.json({message: "Welcome to the application!"});
})

require("./app/routes/app.routes.js")(app);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})