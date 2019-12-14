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


  

router.route('/').get((req, res) => {

    fetcher.fetchApartments().then(function(result){
        res.json(result);

    }).catch(function(err){
        res.json("fetchaparments failed: " + err);

    }
    );
});


module.exports = router;