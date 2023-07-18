const express = require('express');
const bodyParser = require('body-parser')
const serverConfig = require('./configs/server.config')
const dbConfig = require('./configs/db.config')
const mongoose = require("mongoose")


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on("error", () => {
    console.log("Error while connecting to DB")
})
db.once("open", () => {
    console.log("Connected to mongo DB")
})


require('./routes/movie.route')(app);
require('./routes/theatre.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Application started on port ${serverConfig.PORT}`)
})