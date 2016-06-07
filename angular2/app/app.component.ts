import { Component, Inject } from '@angular/core';
import { AutocompleteWidgetComponent } from './autocomplete-widget/autocomplete-widget.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>Dashboard</h1>
    <autocomplete-widget name="{{name}}"></autocomplete-widget>
  `,
  directives: [AutocompleteWidgetComponent]
})

export class AppComponent {
	public name: String = 's';
}
