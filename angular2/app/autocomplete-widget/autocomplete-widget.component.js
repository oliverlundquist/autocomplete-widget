"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var AutocompleteWidgetComponent = (function () {
    function AutocompleteWidgetComponent(elementRef, http) {
        var _this = this;
        this.elementRef = elementRef;
        this.delay = 300;
        this.dropdown = false;
        this.jsonData = [];
        this.products = [];
        this.productCategories = [];
        this.http = http;
        // this.data.push(true);
        // this.data.push(1111);
        // this.data.push(111.1);
        // this.data.push('string');
        // this.stringFunction(this.data[0].toString());
        var eventStream = Rx_1.Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(function () { return _this.query; })
            .debounceTime(this.delay)
            .distinctUntilChanged();
        // eventStream.subscribe(input => this.value.emit(input));
        eventStream.subscribe(function (input) {
            console.log(input);
            if (_this.dropdown === false) {
                _this.toggleDropdown();
            }
        });
    }
    AutocompleteWidgetComponent.prototype.stringFunction = function (argument1) {
        console.log(arguments);
    };
    AutocompleteWidgetComponent.prototype.selectProduct = function (product) {
        this.selectedProduct = product;
        this.dropdown = false;
        this.query = product.product_name;
    };
    AutocompleteWidgetComponent.prototype.addProduct = function () {
        this.productCategories.push(this.selectedProduct);
    };
    AutocompleteWidgetComponent.prototype.removeProduct = function (index) {
        this.productCategories.splice(index, 1);
    };
    AutocompleteWidgetComponent.prototype.toggleDropdown = function () {
        var _this = this;
        this.dropdown = !this.dropdown;
        if (this.products.length === 0) {
            this.http.get('/data/response.json')
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.products = response.data.products;
            });
        }
    };
    AutocompleteWidgetComponent.prototype.ngOnInit = function () {
        // console.log(this.data);
        // console.log(this.queryController);
        // console.log(this.queryController.debounceTime);
        // this.queryController.valueChanges.subscribe(console.log);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutocompleteWidgetComponent.prototype, "name", void 0);
    AutocompleteWidgetComponent = __decorate([
        core_1.Component({
            selector: 'autocomplete-widget',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'app/autocomplete-widget/template/template.html',
            styleUrls: ['app/autocomplete-widget/styles/styles.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, http_1.Http])
    ], AutocompleteWidgetComponent);
    return AutocompleteWidgetComponent;
}());
exports.AutocompleteWidgetComponent = AutocompleteWidgetComponent;
//# sourceMappingURL=autocomplete-widget.component.js.map