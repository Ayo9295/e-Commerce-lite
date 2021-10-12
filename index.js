const express = require('express')
const dotenv = require("dotenv");

const userRoutes = require("./Route/userRoutes")
const itemRoutes = require("./Route/itemRoutes")
const uploadRoutes = require("./Route/uploadRoutes")
// const path = require("path");
const cors = require("cors");



const db = require("./config/db");
dotenv.config({ path: './config.env' });

const app = express()
app.use (cors())

app.get('/', (req, res) => {
  res.send('<h2>MOMMYCARE</h2>')
})

db();

app.use(express.json());
// app.use("/api/v1/images",express.static( "mommycare"))

// Staging
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/upload", uploadRoutes);

const port = process.env.PORT;
app.listen(port, () => {
console.log(`server broadcasting on ${port}`)})