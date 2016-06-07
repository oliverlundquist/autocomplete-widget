import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this.set('dropdown', false);

		this._super(...arguments);
	},
	actions: {
		toggleDropdown() {
			console.log(this.get('dropdown'));
			this.set('dropdown', !this.get('dropdown'));
		}
	}

});
