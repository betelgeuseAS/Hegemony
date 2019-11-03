const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
// const proxy = require('http-proxy-middleware');

const Users = require("./routes/Users");
const Records = require("./routes/Records");

const app = express();

// CORS
app.use(cors());

// TODO Write own proxy
// Proxy server
// let proxyOptions = {
//   target: 'http://localhost:8080',
//   // changeOrigin: true,
//   onProxyRes: function (proxyRes, req, res) {
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// };
// app.use('/api', proxy('/api', proxyOptions));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", Users);
app.use("/records", Records);
app.use("/weather", Weather);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));