const regexHelpers = require('./regexHelpers.js');


fetchApartments = async() =>{
    const response = await fetch(process.env.FINN_OSLO);
    const text = await response.text();
    var matches = text.match(regexHelpers.finnApartmentRegex);

    matches = matches.map(m => regexHelpers.matchToApartment(m));
    return matches;
 }

 module.exports = {fetchApartments}