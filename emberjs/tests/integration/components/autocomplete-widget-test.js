import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocomplete-widget', 'Integration | Component | autocomplete widget', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{autocomplete-widget}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#autocomplete-widget}}
      template block text
    {{/autocomplete-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
