import { Component, Input, ElementRef } from '@angular/core';
import { Control } from '@angular/common';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'autocomplete-widget',
	viewProviders: [HTTP_PROVIDERS],
	templateUrl: 'app/autocomplete-widget/template/template.html',
	styleUrls: ['app/autocomplete-widget/styles/styles.css']
})

export class AutocompleteWidgetComponent {
	@Input() private name: string;
	public query: string;
	private delay: number = 300;
	private dropdown: boolean = false;
	private data: Array<number|string>;
	private jsonData: Array<string> = [];
	private http: Http;
	private products: Array<string> = [];
	private selectedProduct: string;
	private productCategories: Array<string> = [];

	stringFunction(argument1: string): void {
		console.log(arguments);
	}

	constructor(private elementRef: ElementRef, http: Http) {
		this.http = http;
		
		// this.data.push(true);
		// this.data.push(1111);
		// this.data.push(111.1);
		// this.data.push('string');
		// this.stringFunction(this.data[0].toString());

		const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
			.map(() => this.query)
			.debounceTime(this.delay)
			.distinctUntilChanged();

			// eventStream.subscribe(input => this.value.emit(input));
			eventStream.subscribe(input => {
				console.log(input);
				if (this.dropdown === false) {
					this.toggleDropdown();
				}
			});
	}

	selectProduct(product) {
		this.selectedProduct = product;
		this.dropdown = false;
		this.query = product.product_name;
	}

	addProduct() {
		this.productCategories.push(this.selectedProduct);
	}

	removeProduct(index) {
		this.productCategories.splice(index, 1);
	}

	toggleDropdown() {
		this.dropdown = !this.dropdown;
		if (this.products.length === 0) {
			this.http.get('/data/response.json')
		      .map(res => res.json())
		      .subscribe(response => {
				  this.products = response.data.products;
			  });
		}
	}

	ngOnInit() {
		// console.log(this.data);
		// console.log(this.queryController);
		// console.log(this.queryController.debounceTime);
		// this.queryController.valueChanges.subscribe(console.log);
	}
}
