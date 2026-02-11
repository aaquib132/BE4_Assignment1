const mongoose = require('mongoose')
require("dotenv").config()
const mongoUri = process.env.MONGODB

const initilizedDatbase = async () => {
    await mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Connected to Database")
    })
    .catch((error) => {
        console.log("Error in connecting to database", error)
    })
}

module.exports = { initilizedDatbase }