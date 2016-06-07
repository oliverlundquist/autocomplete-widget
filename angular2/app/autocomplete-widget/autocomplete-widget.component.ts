import { Component, Input } from '@angular/core';

@Component({
  selector: 'autocomplete-widget',
  templateUrl: 'app/autocomplete-widget/template/template.html',
  styleUrls: ['app/autocomplete-widget/styles/styles.css']
})

export class AutocompleteWidgetComponent {
	@Input() private name: string;
}
