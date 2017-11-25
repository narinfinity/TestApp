import React from "react";
import { observer, inject } from "mobx-react";
import { Link, NavLink } from "react-router-dom";

import Grid from "../component/grid.jsx";
import Card from "../model/shopping-card.jsx";
import OrderedProduct from "../model/ordered-product.jsx";

@inject("store") @observer
export default class ShoppingCard extends React.Component {

    constructor(props) {
        super(props);

        let { order, productList } = this.props.store;
        let selected = productList.find((p, i) => p.id === parseInt(props.match.params.productId));
        let cards = this.createOrderCardWithSelectedProduct(selected);

        this.state = {
            cards: cards,
            totalPrice: this.calculateTotal(order.OrderedProducts),
            checkoutIsVisible: cards.length > 0
        };

        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
    }

    onRemoveAction(card) {
        
        let { order } = this.props.store;
        let selected = order.OrderedProducts.filter((op, i) => op.Product.id !== card.Id);
        order.OrderedProducts.length = 0;
        order.OrderedProducts.push(...selected);
        let cards = this.mapToCardModel(selected);
        
        this.setState({
            cards: cards,
            checkoutIsVisible: cards.length > 0,
            totalPrice: this.calculateTotal(selected)
        });
    }
    createOrderCardWithSelectedProduct(productToAdd) {
        let { order } = this.props.store;
        if (!productToAdd) return this.mapToCardModel(order.OrderedProducts);
        let existing = order.OrderedProducts.find((op, i) => op.Product.id === productToAdd.id);
        if (!existing) {
            
            let orderedProduct = new OrderedProduct();
            orderedProduct.Product = productToAdd;
            orderedProduct.Count = 1;
            order.OrderedProducts.push(orderedProduct);
        }
        return this.mapToCardModel(order.OrderedProducts);
    }

    mapToCardModel(arr) {
        return arr.map((op, i) => {
            let card = new Card();
            card.Id = op.Product.id;
            card.Name = op.Product.name;
            card.Price = op.Product.price.toFixed(2);
            card.Quantity = op.Count;
            return card;
        });

    }

    //helpers
     calculateTotal(arr) {
        let total = 0.0;
        arr.forEach(op => total += op.Product.price * op.Count);
        return total.toFixed(2);
    }
   createHtmlElementForKey(index, item, key) {
        return (
            key === "Quantity"
                ? <input type="number" class="form-control" onKeyDown={this.onInputKeyDown} onChange={e => this.onQuantityChange(e, item)} defaultValue={item[key]} min="1" step="1" pattern="[0-9]" />
                : key === "Name"
                    ? <Link to={"/product-detail/" + item.Id} class="btn-link">{item[key]}</Link>
                    : key === "Image"
                        ? <img class="img-responsive center-block img-40-px" src={item[key]} alt="Icon" />
                        : <span class="form-control text-ellipsis">{key === "#" ? index + 1 : key === "Price" ? ("$ " + item[key]) : item[key]}</span>
        );
    }
    onInputKeyDown(e) {
        if (e.key === "." || e.key === "-") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
    onQuantityChange(e, card) {
        card.Quantity = e.target.value > 0 ? e.target.value : 1;

        let { order } = this.props.store;
        let orderedProduct = order.OrderedProducts.find((op, i) => op.Product.id === card.Id);
        if (orderedProduct) orderedProduct.Count = card.Quantity;
        this.setState({
            totalPrice: this.calculateTotal(order.OrderedProducts)
        });
    }
    render() {
        
        //let { order } = this.props.store;
        
        return (
            <div class="container-fluid">
                <h1>Selected Products</h1>
                <hr />

                <div class="row">
                    <div class="col-xs-12">
                        <Grid bindList={this.state.cards}
                            createHtmlElementForKey={this.createHtmlElementForKey.bind(this)}
                            actionCols={{ Remove: this.onRemoveAction.bind(this) }} />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-10">
                        {
                            this.state.checkoutIsVisible
                                ? <label class="control-label pull-right">Total: $ {this.state.totalPrice}</label>
                                : ""
                        }
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        {
                            this.state.checkoutIsVisible
                                ? <Link to={"/payment"} class="btn-link pull-right">Checkout</Link>
                                : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}