import React from "react";
import { observer, inject } from "mobx-react";
import { Link, NavLink } from "react-router-dom";

import Address from "../model/address.jsx";
import PaymentInfo from "../model/payment-info.jsx";

@inject("store") @observer
export default class Payment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orderId: props.match.params.orderId,
            paymentInfo: new PaymentInfo(),
            paymentInfoIsValid: false
        };
        this.onChange = this.onChange.bind(this);
    }

    inputFieldRuleErrors(model, field) {
        var errors = [];
        let input = model[field];
        let rules = input.rules;
        if (rules.required) {
            if (!input.value || !input.value.trim())
                errors.push(model[field].name + " is required");


        }

        return errors;
    }
    onChange(e, pi, key) {
        pi[key].value = e.target.value = e.target.value.trim();
        let errors = this.inputFieldRuleErrors(pi, key);
        if (errors.length) pi[key].errors = errors;
        else pi[key].errors = [];
        this.setState({ paymentInfoIsValid: errors.length === 0 });
    }
    onSubmit(model) {
        let errors = [];
        Object.keys(model).forEach((key, i) => errors.push(...(model[key].errors = this.inputFieldRuleErrors(model, key))));

        let { order, savePayment } = this.props.store;
        let orderedProducts = order.OrderedProducts;
        if (orderedProducts.length === 0) alert("You should add a product into shopping card in order to submit this payment");

        if (errors.length > 0 || orderedProducts.length === 0) return this.setState({ paymentInfoIsValid: false });

        if (typeof savePayment === "function") {
            let paymentInfo = {};
            Object.keys(model).forEach((key, i) => paymentInfo[key] = model[key].value);

            order.Address = new Address(paymentInfo);
            order.User = {
                FirstName: paymentInfo.FirstName,
                LastName: paymentInfo.LastName,
                Email: paymentInfo.Email,
                PhoneNumber: paymentInfo.Phone
            };

            let payment = {
                FirstName: order.User.FirstName,
                LastName: order.User.LastName,
                Email: order.User.Email,
                PhoneNumber: order.User.PhoneNumber,

                Street: order.Address.Street,
                City: order.Address.City,
                State: order.Address.State,
                Country: order.Address.Country,
                PostalCode: order.Address.PostalCode,

                OrderedProducts: order.OrderedProducts
            };
            savePayment(payment);
        }
    }

    //helpers
    onInputKeyDown(e) {
        if (e.key === "." || e.key === "-") {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    render() {

        let { paymentInfo } = this.state;

        let rows = paymentInfo
            ? Object.keys(paymentInfo).map((key, i) => (
                <div key={i} class={"form-group" + (paymentInfo[key].rules.required ? " required" : "") + (paymentInfo[key].errors.length ? " has-error" : "")}>
                    <label for={key} class="col-sm-3 control-label">{paymentInfo[key].name}{": "}</label>
                    <div class="col-sm-6">
                        <input id={key} type={paymentInfo[key].type} class="form-control" defaultValue={paymentInfo[key].value}
                            placeholder={paymentInfo[key].name} onChange={e => this.onChange(e, paymentInfo, key)}
                            required={paymentInfo[key].rules.required} />
                        {
                            paymentInfo[key].errors.length
                                ? paymentInfo[key].errors.map((err, i) => (<span key={i} class="help-block">{err}</span>))
                                : ""
                        }
                    </div>
                    <div class="col-sm-3"></div>
                </div>))
            : [];

        return (
            <div class="container-fluid">
                <h1>Payment Info</h1>
                <hr />
                <div class="form-horizontal">
                    {rows}
                    <hr />

                    <div class="form-group">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            {
                                <button type="button" onClick={this.onSubmit.bind(this, paymentInfo)}
                                    class="btn btn-default pull-right" disabled={!this.state.paymentInfoIsValid}>Submit</button>
                            }
                        </div>
                        <div class="col-sm-3"></div>
                    </div>

                </div>
            </div>
        );
    }
}