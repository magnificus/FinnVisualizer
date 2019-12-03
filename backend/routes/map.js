const router = require('express').Router();
const fetcher = require('../finnRequests/finnGetters');
var NodeGeocoder = require('node-geocoder');


var options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: process.env.GOOGLE_MAPS_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  geocodeApartment = async(geocoder, apartment) =>{
      var res = await geocoder.geocode({address: apartment.address});
      //apartment.address = res.formattedAddress;
      apartment.latitude = res[0].latitude;
      apartment.longitude = res[0].longitude;
      return apartment;
      
  }
  

router.route('/').get((req, res) => {

    fetcher.fetchApartments().then(function(apartmentRes){
        var geocoder = NodeGeocoder(options);
        Promise.all(apartmentRes.map((apartment) => geocodeApartment(geocoder, apartment))).then(result => res.json(result));

        //console.log("length: " + res.length);


    }).catch(function(err){
        res.json("fetchaparments failed: " + err);

    }
    );
});


module.exports = router;