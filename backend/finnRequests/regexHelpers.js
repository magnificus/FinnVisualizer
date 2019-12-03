const {Apartment} = require("../apartment");


// returns an unfiltered apartment "unit"
const finnApartmentRegex = /<article.*?<\/article>/gs;

const descRegex = /data-search-resultitem>(.*)<\/a>/s;
const addressRegex = /<div class=\"ads__unit__content__details(.*?)<\/div>/s;

function getApartmentDescription(input){
    var desc = input.match(descRegex);
    //console.log("input desc:" + input);
    if (desc){
        desc = desc[0].replace("data-search-resultitem>","");
        desc = desc.replace("</a>", "");
        desc = desc.trim();
        return desc;
    } else{
        console.log("Unable to get desc");
    }

    return "No Description";
}



function getApartmentAddress(input) {
    //console.log("input add: " + input);
    var address = input.match(addressRegex);
    if (address){
        address = address[0];
        address = address.replace("<div class=\"ads__unit__content__details\">", "");
        address = address.replace("<div>", "");
        address = address.replace("</div>", "");
        address = address.trim();
        //console.log("COOL ADDRESS BRO, AND ITS: " + address);
        return address;
    } else{
        console.log("Unable to get address");
        return "No address;"
    }
    return address;
}



function matchToApartment(input){
    var toReturn = new Apartment();
    toReturn.desc = getApartmentDescription(input);
    toReturn.address = getApartmentAddress(input);

    return toReturn;
}

module.exports= {finnApartmentRegex,matchToApartment};