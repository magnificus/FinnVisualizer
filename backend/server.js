
const express = require('express');
const cors = require('cors');



require("isomorphic-fetch")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: process.env.GOOGLE_MAPS_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };



 const mapRouter = require('./routes/map')
 app.use("/map", mapRouter);

app.listen(port, () => {


    fetchApartments().then(function(res){
        var geocoder = NodeGeocoder(options);
        console.log("length: " + res.length);


    }).catch(function(err){

    }
    );

    //console.log()

    console.log(`Server is running on port: ${port}`);
});