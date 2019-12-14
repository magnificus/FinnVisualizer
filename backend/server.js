
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const fetcher = require('./finnRequests/finnGetters');
const DBSettings = require('./models/settings.model')
require("isomorphic-fetch")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;

function createNewSettingDocument(){
        const newSettings = DBSettings();
        newSettings.save()
        /*.then(res => console.log("saved settings with response: " + res))
        .catch(err => console.log("failed to save settings with response: " + res))*/;
}


function PotentiallyUpdateDatabase(){

    // consider dropping the database
        DBSettings.find().then(function(result){
        if (result == undefined || result == ""){
            createNewSettingDocument();
            fetcher.fetchApartments();

        }

        //console.log("result of query: " + result);
        //console.log("previous database created at: " + result[0].createdAt);
        var prevDate = new Date(result[0].createdAt);
        var currDate = new Date();
        var diffHours = (currDate - prevDate) / (1000 * 60 * 60); 
        console.log("diff hours: " + diffHours);

        if (diffHours > 1){
            connection.db.dropDatabase().then(function(res){
                console.log("successfully dropped database, response:" + res);
                createNewSettingDocument();
                fetcher.fetchApartments();
            })
                .catch(function(error){
                    console.log("error dropping database:" + error);});

        }


    }).catch(function(err){ console.log("error when getting DB settings: " + err);
    });
}

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");





})
 const mapRouter = require('./routes/map')
 app.use("/map", mapRouter);

app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);
    PotentiallyUpdateDatabase();
});