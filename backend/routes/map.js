const router = require('express').Router();
let fetchRequest = require('../finnRequests/finnGetters');
router.route('/').get((req, res) => {
    res.json("WAAAAA");

        fetchApartments().then(function(res){
        var geocoder = NodeGeocoder(options);
        console.log("length: " + res.length);


    }).catch(function(err){

    }
    );
});


module.exports = router;