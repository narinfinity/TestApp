import { computed, observable } from "mobx";

export default class Product {
    Id;
    Image;
    Name;
    Description;
    Price;
    Category;

    constructor(p) {
        this.Id = p.id;
        this.Image = p.url;
        this.Name = p.name;
        this.Description = p.description;
        this.Price = p.price.toFixed(2);
        this.Category = p.category.name;
    }
}