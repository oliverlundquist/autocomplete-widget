export class DemoComponent {
	private demoString: string;
	private onlyStringArray: Array<string> = [];
	private stringOrNumberArray: Array<string|number> = [];

	constructor() {
		// 1. wrong property type
		// this.demoString = 111;

		// 2. wrong argument type
		// this.demoStringFunction(222);

		// 4. wrong array type
		// this.stringOrNumberArray.push('abc');
		// this.stringOrNumberArray.push(123);
		// this.stringOrNumberArray.push(true);
	}

	demoStringFunction(demoArgument1: string): void {
		console.log(demoArgument1);
	}

	// 3. wrong return type
	// demoStringFunctionWithReturn(demoArgument1: string): string {
	// 	console.log(demoArgument1);
	// 	return 111;
	// }

}
