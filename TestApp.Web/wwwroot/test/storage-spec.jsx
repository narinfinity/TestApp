import Storage from "../js/service/storage.jsx"
import asyncTest from "jasmine-async-test";
import Promise from "bluebird";

describe('Storage test', () => {
    var storage;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    beforeEach(() => {
        storage = Storage;;
    });
    afterEach(() => {
        storage = null;
    });

    it('should get a list of categories', asyncTest(() => {

        let categoryId = 0;
        let promise  = storage.getCategoryList(categoryId);
        return promise.then(function (res) {
            expect(res.data.length).not.toBe(0);
        });

        //return new Promise((resolve, reject) => {
        //    expect(2 + 2).toEqual(4);
        //    setTimeout(resolve(thisPromiseResultPass), 1000);
        //})
        //.then(function (thisPromiseResultReceive) {
            
        //});

    }));

    it('should get a list of products', asyncTest(() => {

        let categoryId = 0;
        let promise = storage.getProductList(categoryId);
        return promise.then(function (res) {
            expect(res.data.length).not.toBe(0);
        });


        
    }));

    //it('works with async/await', asyncTest(async function () {
    //    const data = await fetchSomeData();
    //    expect(data).toBe(42);
    //}));

});