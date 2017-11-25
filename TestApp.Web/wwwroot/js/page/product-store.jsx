import React from "react";
import { observer, inject } from "mobx-react";

import Grid from "../component/grid.jsx";
import Dropdown from "../component/dropdown.jsx";
import Product from "../model/product.jsx";

@observer
export default class ProductStore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productFilter: (p, i) => true
        };

        let { getProductList, getCategoryList } = this.props.store;
        let categoryId = 0;

        getProductList(categoryId);
        getCategoryList(categoryId);
    }

    onSelectedItemChange(category) {
        this.props.store.productFilter = (p, i) => {
            return p.category.id === category.Id;
        };
        //this.setState({
        //    productFilter: (p, i) => {
        //        return p.category.id === category.Id;
        //    }
        //});
    }
    createHtmlElementForKey(index, item, key) {
        return (
            key === "Image"
                ? <img class="img-responsive center-block img-40-px" src={item[key]} alt="Icon" />
                : <span class="form-control text-ellipsis">{key === "#" ? index + 1 : key === "Price" ? ("$ " + item[key]) : item[key]}</span>
        );
    }
    render() {
        let { filteredProducts, categoryList } = this.props.store;
        //let products = productList.filter(this.state.productFilter).map((p, i) => new Product(p));
        return (
            <div class="container-fluid">
                <h1>Products</h1>
                <hr />
                <div class="row">
                    <div class="col-xs-2"><label class="control-label pull-right">Category</label></div>
                    <div class="col-xs-2"><Dropdown defaultText={"Select a category"} bindList={categoryList} onSelect={this.onSelectedItemChange.bind(this)} /></div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-xs-12">
                        <Grid bindList={filteredProducts}
                            createHtmlElementForKey={this.createHtmlElementForKey.bind(this)}
                            actionCols={{ AddToCard: { LinkText: "Add to card", LinkTo: "/shopping-card/" } }} />
                    </div>
                </div>
            </div>
        );
    }
}