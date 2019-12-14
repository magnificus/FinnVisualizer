
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require("isomorphic-fetch")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
    connection.db.dropDatabase().then(function(res){
        console.log("successfully dropped database, response:" + res)})
        .catch(function(error){
            console.log("error dropping database:" + error)});
})
 const mapRouter = require('./routes/map')
 app.use("/map", mapRouter);

app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);
});