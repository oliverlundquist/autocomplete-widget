import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Component.extend({
	init() {
		this.set('dropdown', false);
		this.set('products', []);
		this.set('selectedProduct', {});
		this.set('delay', 300);
		this.set('query', '');
		this.set('productCategories', []);

		this._super(...arguments);
	},
	queryChanged: Ember.observer('query', function() {
		if (this.get('selectedProduct').product_name !== this.get('query')) {
			Ember.run.debounce(this, this.queryChangedDebounced, 1000);
		}
	}),
	queryChangedDebounced: function () {
		this.send('toggleDropdown');
	},
	actions: {
		toggleDropdown() {
			this.set('dropdown', !this.get('dropdown'));
			if (this.get('products').length === 0) {
				let that = this;
				$.getJSON('/data/response.json').then(function (response) {
					that.set('products', response.data.products.map(function (product) { return Ember.Object.create(product); }));
				});
			}
		},
		selectProduct(product, index) {
			let that = this;
			this.set('dropdown', false);
			this.set('selectedProduct', product);
			this.set('query', product.product_name);

			// fold all selected flags and raise flag at given index
			this.get('products').forEach(function (_product, _index) { that.get('products')[_index].set('selected', false); });
			this.get('products')[index].set('selected', true);
		},
		addProduct() {
			if (Object.keys(this.get('selectedProduct')).length > 0) {
				this.set('productCategories', this.get('productCategories').concat(this.get('selectedProduct')));
			}
		},
		removeProduct(index) {
			this.set('productCategories', this.get('productCategories').filter(function (product, _index) { return index !== _index; }));
		}
	}

});
