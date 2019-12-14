const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SettingsSchema = new Schema({
    desc : String,
}, {
    timestamps: true,
})

const DBSettings = mongoose.model('Settings', SettingsSchema);


module.exports = DBSettings;