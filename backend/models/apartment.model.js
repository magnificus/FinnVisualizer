const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*class Apartment {
    constructor(){
        this.desc = "No description"; 
        this.address = "No address";
        this.price = 0;
        this.size = 0;
        this.latitude = 0;
        this.longitude = 0;
    }

    isValid(){
        return this.desc.search("{") == -1 && this.desc != "No description";
    }

    toString() {
        return "Address: " + this.address + ", Description: " + this.desc;
    }
} */
function IsValidApartment(apartment){
    return apartment != undefined && apartment.price != undefined;
}

const apartmentSchema = new Schema({
    desc : String,
    address : String,
    price : Number,
    size : Number,
    longitude: Number,
    latitude: Number,
}, {
})

const Apartment = mongoose.model('Apartment', apartmentSchema);


module.exports = {Apartment, IsValidApartment};