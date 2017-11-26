import React from "react";
import { observer, inject } from "mobx-react";

import Grid from "../component/grid.jsx";
import Dropdown from "../component/dropdown.jsx";
import Product from "../model/product.jsx";

@inject("store") @observer
export default class ProductStore extends React.Component {

    constructor(props) {
        super(props);
        //init state
        //bind event handlers to the class instance
        //this.setState((prevState, props) => {return {sProp: prevState.sProp + props.prop };}, callback?); 
        //callback function will be executed once setState is completed and the component is re-rendered
        this.state = {
            productFilter: (p, i) => true
        };

    }
    
    componentWillMount() {
        //called before render
    }
    componentDidMount() {
        //side-effects or subscriptions
        //initialization that requires DOM nodes
        //load data from a remote endpoint
        //setState() will trigger an extra rendering, render() will be called twice, only when need to measure a DOM node before rendering
        //component.forceUpdate(callback) will render(), skipping shouldComponentUpdate(), but will trigger lifecycle methods for children, also shouldComponentUpdate()


        let { getCategoryList, getProductList } = this.props.store;
        let categoryId = 0;
            
        getCategoryList(categoryId).then((res) => {            
            getProductList(categoryId).then((res) => {
                this.setState({ productFilter: (p, i) => true });
            }); 
        }); 
    }
    componentWillReceiveProps(nextProps) { //not called with initial props during mounting
        //before a mounted component receives new props
        //state to be up-to-date with any props update
        //must compare this.props and nextProps and then this.setState(), setState() doesn’t trigger this method
        //called even if the props have not changed, only if some of component’s props may update
        
        
    }
    
    shouldComponentUpdate(nextProps, nextState) { //not called for the initial render or after forceUpdate()
        //before rendering when new props or state are being received
        //by default will re-render on every state change        
        //return false (componentWillUpdate(), render(), componentDidUpdate() will not be invoked) does not prevent child components from re-rendering
        //in the future return false may result in a re-rendering
        //compare (no deep equality checks or using JSON.stringify()) this.props with nextProps and this.state with nextState and return false to skip update
        return true;
    }
    componentWillUpdate(nextProps, nextState) {//not called for the initial render
        //just before rendering when new props or state are being received
        //preparation before an update        
        //no this.setState(), no dispatch a Redux action (will trigger an update before this returns)
    }
    
    onSelectedItemChange(category) {
        
        this.setState({  
            productFilter: (p, i) => {
                return p.category.id === category.Id;
            }
        });
    }
    createHtmlElementForKey(index, item, key) {
        return (
            key === "Image"
                ? <img class="img-responsive center-block img-40-px" src={item[key]} alt="Icon" />
                : <span class="form-control text-ellipsis">{key === "#" ? index + 1 : key === "Price" ? ("$ " + item[key]) : item[key]}</span>
        );
    }
    render() {
        let { productList, categoryList } = this.props.store;
        let products = productList.filter(this.state.productFilter).map((p, i) => new Product(p));
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
                        <Grid bindList={products}
                            createHtmlElementForKey={this.createHtmlElementForKey.bind(this)}
                            actionCols={{ AddToCard: { LinkText: "Add to card", LinkTo: "/shopping-card/" } }} />
                    </div>
                </div>
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState) { //after updating, not called for the initial render        
        //to operate on the DOM when the component has been updated
        //do network requests (not necessary if the props have not changed)
    }
    componentWillUnmount() {
        //before a component is unmounted and destroyed
        //unsubscribe all subscriptions in componentDidMount()
    }

    //componentDidCatch(error, info) {
        //catch JavaScript errors anywhere (during rendering, in lifecycle methods, and in constructors of the whole tree below them) in their child component tree, log those errors, and display in UI
        //can’t catch an error within this component
        //component becomes an error boundary if it defines this lifecycle method
        //only for recovering from unexpected exceptions, not for control flow
    //}
}