import { computed, observable } from "mobx";

export default class Order {
    Id = 0;
    OrderedDate;
    Total;
    OrderedProducts = [];
    User;
    Address;

    constructor() {
        
    }
}