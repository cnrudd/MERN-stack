require('dotenv').config();
const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

require('./auth/jwt')();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist";
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
