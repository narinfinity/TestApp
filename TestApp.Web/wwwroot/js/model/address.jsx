import { computed, observable } from "mobx";

export default class Address {
    Id;
    Street;
    City;
    State;
    Country;
    PostalCode;

    constructor(payment) {
        this.Street = payment.Street;
        this.City = payment.City;
        this.State = payment.State;
        this.Country = payment.Country;
        this.PostalCode = payment.PostalCode;
    }
}