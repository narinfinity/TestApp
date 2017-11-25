import { computed, observable } from "mobx";

export default class Category {
    Id;
    Name;

    constructor(category) {
        this.Id = category.id;
        this.Name = category.name;
    }
}