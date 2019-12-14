const router = require('express').Router();
const fetcher = require('../finnRequests/finnGetters');
const  {Apartment} = require('../models/apartment.model');





  

router.route('/').get((req, res) => {

    Apartment.find().then(result => res.json(result)).catch(error => console.log("error in getting apartments: " + error));


 
});


module.exports = router;