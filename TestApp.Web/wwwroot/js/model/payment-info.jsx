import { computed, observable } from "mobx";

export default class PaymentInfo {
    FirstName = { value: "", type: "text", pattern:"", name: "First Name", errors: [], rules : { required: true } };
    LastName = { value: "", type: "text", pattern: "", name: "First Name", errors: [], rules: { required: true } };
    Email = { value: "", type: "email", pattern: "", name: "Email", errors: [], rules: { required: true } };
    Phone = { value: "", type: "tel", pattern: "", name: "Phone Number", errors: [], rules: {} };
    //Address
    Street = { value: "", type: "text", pattern: "", name: "Street", errors: [], rules: { required: true } };
    City = { value: "", type: "text", pattern: "", name: "City", errors: [], rules: { required: true } };
    State = { value: "", type: "text", pattern: "", name: "State", errors: [], rules: { required: true} };
    Country = { value: "", type: "text", pattern: "", name: "Country", errors: [], rules: { required: true } };

    PostalCode = { value: "", type: "text", pattern: "", name: "Postal Code", errors: [], rules: {} };

    constructor() {

    }
}