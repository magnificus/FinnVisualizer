const regexHelpers = require('./regexHelpers.js');
const Apartment = require('../models/apartment.model');
var NodeGeocoder = require('node-geocoder');

require('dotenv').config();

  geocodeApartment = async(geocoder, apartment) =>{
      var res = await geocoder.geocode({address: apartment.address});
      //apartment.address = res.formattedAddress;
      apartment.latitude = res[0].latitude;
      apartment.longitude = res[0].longitude;
      return apartment;
      
  }

var options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: process.env.GOOGLE_MAPS_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

fetchApartments = async() =>{

    var currPage = 0;
    while (true){
        // continue this until we're out of pages
        const response = await fetch(process.env.FINN_OSLO + "&page="+currPage);
        const text = await response.text();
        var matches = text.match(regexHelpers.finnApartmentRegex);
        //console.log("matches: " + matches.length);

        if (matches.length < 5){
            break;
        }

        matches = matches.map(m => regexHelpers.matchToApartment(m));
        matches = matches.filter(m => Apartment.IsValidApartment(m));
        
        
        var geocoder = NodeGeocoder(options);
        await Promise.all(matches.map((apartment) => geocodeApartment(geocoder, apartment))).then(function(res){matches = res;}).catch(function(err){console.log("geocoder error: " + err);});
        await Promise.all(matches.map(apartment => apartment.save()))
        currPage++;
    }

    console.log("fetching complete");

    return matches;
 }



 module.exports = {fetchApartments}