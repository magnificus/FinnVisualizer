const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const settingsSchema = new Schema({
    desc : String,
}, {
    timestamps: true,
})

const Apartment = mongoose.model('Apartment', apartmentSchema);


module.exports = {Apartment, IsValidApartment};