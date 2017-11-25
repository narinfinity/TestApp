import { computed, observable } from "mobx";
import Axios from "axios";
import PaymentInfo from "../model/payment-info.jsx";
import Order from "../model/order.jsx";
import Category from "../model/category.jsx";
import Product from "../model/product.jsx";


export class Storage {
    devServer = 'http://localhost:65155';
    @observable categoryList;
    @observable productList;
    @observable orderList;
    @observable order;
    @observable paymentInfo;
    productFilter = (p, i) => true;

    constructor() {
        this.categoryList = [];
        this.productList = [];
        this.orderList = [];
        this.order = new Order();
        this.paymentInfo = new PaymentInfo();
        
        this.getProductList(0);

        this.getCategoryList = this.getCategoryList.bind(this);
        this.getProductList = this.getProductList.bind(this);
        this.getOrderList = this.getOrderList.bind(this);
        this.savePayment = this.savePayment.bind(this);
    }

    @computed get filteredProducts() {
        return this.productList.filter(this.productFilter).map((p, i) => new Product(p));
    }

    savePayment(payment) {

        let baseUrl = this.devServer;
        return Axios({
            method: 'post',
            url: baseUrl + '/api/order',
            responseType: 'json',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payment)
        })
            .then((res) => {
                if (res.data.errors && res.data.errors.length) alert(res.data.errors.map(m => m + "\n"));
                else {
                    this.order = new Order();
                    this.paymentInfo = new PaymentInfo();
                    alert("Payment is successfully saved!");
                }
            })
            .catch((err) => {
                alert(err);
            });

    }
    getProductList(categoryId) {
        let baseUrl = this.devServer;

        return Axios.get(baseUrl + '/api/product', { params: { categoryId: categoryId } })
            .then((res) => {
                if (res && res.data.length) {
                    let products = res.data.map(e => {
                        const p = {};
                        p.id = e.id;
                        p.name = e.name;
                        p.description = e.description;
                        p.url = e.url;
                        p.price = e.price;
                        p.category = e.category;
                        return p;
                    });
                    this.productList.length = 0;
                    this.productList.push(...products);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    getCategoryList(categoryId) {
        let baseUrl = this.devServer;
        return Axios.get(baseUrl + '/api/category', { params: { id: categoryId } })
            .then((res) => {
                if (res && res.data.length) {
                    let catList = res.data.map(e => new Category(e));
                    this.categoryList.length = 0;
                    this.categoryList.push(...catList);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    getOrderList(orderId) {
        let baseUrl = this.devServer;

        return Axios.get(baseUrl + '/api/order', { params: { id: orderId } })
            .then((res) => {
                if (res && res.data.length) {
                    let orderList = res.data.map(e => {
                        const p = {};
                        p.Id = e.id;
                        p.OrderedDate = new Date(e.orderedDate);
                        p.Total = e.total;
                        p.OrderedProducts = e.orderedProducts;
                        p.User = e.user;
                        p.Address = e.address;

                        return p;
                    });
                    this.orderList.length = 0;
                    this.orderList.push(...orderList);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }


}

export default new Storage;