const {Apartment} = require("./apartment");


// returns an unfiltered apartment "unit"
const finnApartmentRegex = /div class=\"ads__unit__content\">.*?<\/a>/gs;

const secondRegex = /data-search-resultitem>(.*)/s;///data-search-resultitem>[/s/S]*?<\/a>/

function getApartmentDescription(input){
    desc = input.replace("data-search-resultitem>","");
    desc = desc.replace("</a>", "");
    desc = desc.trim();
    return desc;
}


function matchToApartment(input){
    var desc = input.match(secondRegex);
    var toReturn = new Apartment();
    if (desc){
        toReturn.desc = getApartmentDescription(desc[0]);
        return toReturn;
    }
    return toReturn;
}

module.exports= {finnApartmentRegex, secondRegex,getApartmentDescription,matchToApartment};