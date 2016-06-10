"use strict";
var DemoComponent = (function () {
    function DemoComponent() {
        // 1. wrong property type
        // this.demoString = 111;
        this.onlyStringArray = [];
        this.stringOrNumberArray = [];
        // 2. wrong argument type
        this.demoStringFunction(222);
        // 4. wrong array type
        this.stringOrNumberArray.push('abc');
        this.stringOrNumberArray.push(123);
        this.stringOrNumberArray.push(true);
    }
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.js.map