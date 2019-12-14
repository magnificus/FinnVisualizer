const regexHelpers = require('./regexHelpers.js');
const Apartment = require('../models/apartment.model');
var NodeGeocoder = require('node-geocoder');







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
    const response = await fetch(process.env.FINN_OSLO);
    const text = await response.text();
    var matches = text.match(regexHelpers.finnApartmentRegex);

    matches = matches.map(m => regexHelpers.matchToApartment(m));
    console.log("bazingsa");
    
    matches = matches.filter(m => Apartment.IsValidApartment(m));
    
    
    var geocoder = NodeGeocoder(options);
    var toReturn;
    await Promise.all(matches.map((apartment) => geocodeApartment(geocoder, apartment))).then(function(res){matches = res;}).catch(function(err){console.log("error: " + err);});

   // console.log(matches);

    return matches;
 }



 module.exports = {fetchApartments}