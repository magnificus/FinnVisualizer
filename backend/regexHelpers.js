const {Apartment} = require("./apartment");


// returns an unfiltered apartment "unit"
//const finnApartmentRegex = /div class=\"ads__unit__content\">.*?<\/a>/s;
const finnApartmentRegex = /<article.*?<\/article>/gs;

const descRegex = /data-search-resultitem>(.*)<\/a>/s;
const addressRegex = /<span class=\"ads__unit__content__details\">(.*?)<\/span>/s;

    //<span class="ads__unit__content__details">
    //            <span>Lørenveien 62A, Oslo</span>
    //</span>

function getApartmentDescription(input){
    var desc = input.match(descRegex);
    if (desc){
        desc = desc[0].replace("data-search-resultitem>","");
        desc = desc.replace("</a>", "");
        desc = desc.trim();
        return desc;
    }

    return "No Description";
}



function getApartmentAddress(input) {
    var address = input.match(/<span>.*?<\/span>/s);
    if (address){
        address = address[0];
        address = address.replace("<span>", "");
        address = address.replace("</span>", "");
        address = address.trim();
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