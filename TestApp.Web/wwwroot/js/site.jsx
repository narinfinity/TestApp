import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, HashRouter, BrowserRouter,Switch } from "react-router-dom";
import { Provider } from "mobx-react";

import Storage from "./service/storage.jsx";
import LayoutPage from "./page/layout.jsx";
import ProductStore from "./page/product-store.jsx";
import ShoppingCard from "./page/shopping-card.jsx";
import Payment from "./page/payment.jsx";
import ProductDetail from "./page/product-detail.jsx";

ReactDom.render(
    <Provider store={Storage}>
        <BrowserRouter basename="/">
            <LayoutPage>
                <Route path="/" exact name="product-sore" component={ProductStore}></Route>
                <Route path="/shopping-card/:productId" exact name="shopping-card" component={ShoppingCard}></Route>
                <Route path="/payment" exact name="productSore" component={Payment}></Route>
                <Route path="/product-detail/:productId" exact name="product-detail" component={ProductDetail}></Route>
            </LayoutPage>	
        </BrowserRouter>
    </Provider>,
document.getElementById("react-app-content"));