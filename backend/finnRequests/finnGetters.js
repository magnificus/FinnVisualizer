const regexHelpers = require('./regexHelpers.js');
const Apartment = require('../models/apartment.model');


fetchApartments = async() =>{
    const response = await fetch(process.env.FINN_OSLO);
    const text = await response.text();
    var matches = text.match(regexHelpers.finnApartmentRegex);

    matches = matches.map(m => regexHelpers.matchToApartment(m));
    matches = matches.filter(m => Apartment.IsValidApartment(m));
    return matches;
 }

 module.exports = {fetchApartments}