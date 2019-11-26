class Apartment {
    constructor(){
        this.desc = "No description"; 
        this.address = "No address";
    }

    isValid(){
        return this.desc.search("{") == -1 && this.desc != "No description";
    }

    toString() {
        return "Address: " + this.address + ", Description: " + this.desc;
    }
}

module.exports = {Apartment};