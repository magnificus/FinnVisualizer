class Apartment {
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
}

module.exports = {Apartment};