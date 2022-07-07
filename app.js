const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
const config = require("./config/config").get(process.env.NODE_ENV);
const DB = require("./db/db");
const port = process.env.PORT || 3000;
const host = process.env.HOST;

// requiring routes 

const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth');
const auth = require("./routes/auth");

// Access-Control-Allow-Origin
app.use(cors({ origin: "*" }));

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.log("Error @ app ", err);
  next(err);
});

//defining routes
app.use('/', express.static('public'));
app.use(adminRoute)
app.use(auth)
/* const 
 */




// Creating MongoDB Connections
DB();

app.listen(port, () => {
  console.log("Server is listening on the port " + port);
});
