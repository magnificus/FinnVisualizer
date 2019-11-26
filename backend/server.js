
const regexHelpers = require('./regexHelpers.js');
const {Apartment} = require("./apartment");
const express = require('express');
const cors = require('cors');



require("isomorphic-fetch")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


var testString = "askjdhaskdkasjdhk  asdvvvv (NORD) fuck you (NOKD) again";

var testRegex = /<NORD/g;

function fetchApartments(){
    (async () => {
    const response = await fetch(process.env.FINN_OSLO);
    const text = await response.text();
    var matches = text.match(regexHelpers.finnApartmentRegex);

    matches = matches.map(m => regexHelpers.matchToApartment(m));
    //matches = matches.filter(a => a.isValid());
    //var matchesStrings = matches.map(m => m.desc);
    console.log(matches);

  })();
 }


app.listen(port, () => {
    fetchApartments();


    //console.log(`Server is running on port: ${port}`);
});