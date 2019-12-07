const {Apartment} = require("../apartment");


// returns an unfiltered apartment "unit"
const finnApartmentRegex = /<article.*?<\/article>/gs;

const descRegex = /data-search-resultitem>(.*)<\/a>/s;
const addressRegex = /<div class=\"ads__unit__content__details(.*?)<\/div>/s;
const m2AndPriceRegex = /<div class=\"ads__unit__content__keys(.*?)<\/div>(.*?)<\/div>/s;
const m2Regex = /<div>(.*?)m²<\/div>/;
const priceRegex = /<div>(.*?)kr<\/div>/;



function removeTags(input, tag){
        input = input.replace("<" + tag + ">", "");
        input = input.replace("</" + tag + ">", "")
        return input;
}

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



function getApartmentPrice(input) {
    //console.log("input add: " + input);
    var price = input.match(m2AndPriceRegex);
    if (price){
        price = price[0];
        price = price.match(priceRegex);
        if (price){
            price = price[0];
            price = price.replace("kr", "");
            price = removeTags(price, "div");
            price = price.trim();
            return price;
        }
        
    } 
    console.log("Unable to get price");
    return 1;
}

function getApartmentSize(input) {
    //console.log("input add: " + input);
    var size = input.match(m2AndPriceRegex);
    if (size){
        size = size[0];
        size = size.match(m2Regex);
        if (size){
            size = size[0];
            size = size.replace("m²", "");
            size = removeTags(size, "div");
            size = size.trim();
            return size;
        }
        
    } 
    console.log("Unable to get size");
    return 1;
}




function getApartmentAddress(input) {
    //console.log("input add: " + input);
    var address = input.match(addressRegex);
    if (address){
        address = address[0];
        address = address.replace("<div class=\"ads__unit__content__details\">", "");
        address = removeTags(address, "div");
        //address = address.replace("<div>", "");
        //address = address.replace("</div>", "");
        address = address.trim();
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
    toReturn.price = getApartmentPrice(input);
    toReturn.size = getApartmentSize(input);

    return toReturn;
}

module.exports= {finnApartmentRegex,matchToApartment};