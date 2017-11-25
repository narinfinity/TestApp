import React from "react";
import { observer, inject } from "mobx-react";
import { Link, NavLink } from "react-router-dom";

import Product from "../model/product.jsx";

@inject("store") @observer
export default class ProductDetail extends React.Component {

    constructor(props) {
        super(props);

        let { productList } = this.props.store;
        let product = productList.find((p, i) => p.id === parseInt(props.match.params.productId));

        if (!product) alert("Details are available when clicking on the product name from shopping-card products");
        this.state = {
            product: product ? new Product(product) : {}
        };
    }
    createHtmlElementForKey(index, item, key) {
        return (
            key === "Image"
                ? <img class="img-thumbnail img-200-px" src={item[key]} alt="Icon" />
                : <span class="form-control text-ellipsis">{key === "#" ? index + 1 : key === "Price" ? ("$ " + item[key]) : item[key]}</span>
        );
    }
    render() {
        
        let { product } = this.state;
        
        let rows = product
            ? Object.keys(product).map((key, i) => (key !== "Id" ?
                <div key={i} class="row">
                    <label for={key} class="col-sm-3 control-label">{key}{": "}</label>
                    <div class="col-sm-6">
                        {
                            this.createHtmlElementForKey(i, product, key)
                        }
                    </div>
                    <div class="col-sm-3"></div>
                </div> : ""))
            : [];

        return (
            <div class="container-fluid">
                <h1>Product Detail</h1>
                <hr />
                <div class="row">
                    <div class="col-sm-12">
                        <Link to="/" class="btn-link">{"<"} Back to products store</Link>
                    </div>
                </div>
                <hr />
                <div class="form-horizontal">
                    {rows}
                </div>
            </div>
        );
    }
}