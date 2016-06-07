(function () {
    'use strict';

    angular
        .module('kurashicom.lookup')
        .directive('lookup', lookup);

    lookup.$inject = ['$injector'];

    function lookup($injector) {
        var directive = {
            link: link,
            scope: { lookupModel: '=', lookupAllFunction: '@', lookupSearchFunction: '@', lookupSortProperty: '@', lookupDirectionProperty: '@', lookupResponseProperty: '@', lookupDisplayProperty: '@', lookupSelectionModel: '=', lookupSelectionCallback: '&', hideAddButton: '=' },
            transclude: true,
            template:
                '<div class="lookup">' +
                '    <div class="input-group">' +
                '        <input type="text" name="lookup" ng-model="query" ng-model-options="{ updateOn: \'default blur\', debounce: 300 }" ng-change="resetGet()" class="form-control" autocomplete="off" />' +
                '        <div class="input-group-btn">' +
                '            <button type="button" ng-click="toggleDropdown()" class="btn btn-default"><span class="glyphicon glyphicon-chevron-down"></span></button>' +
                '            <button type="button" ng-click="add()" ng-if="!hideAddButton" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>' +
                '        </div>' +
                '    </div>' +
                '    <div class="search-results dropdown" ng-class="{ open: dropdown }">' +
                // '        <div class="loader" ng-class="{ active: loading }"><img src="images/loader.gif" /></div>' +
                '        <ng-transclude></ng-transclude>' +
                '        <div class="pagination btn-center">' +
                '            <button class="btn btn-default" ng-click="getFirstPage()" ng-disabled="!canGetPrevPage()"><span class="glyphicon glyphicon-chevron-left"></span><span class="glyphicon glyphicon-chevron-left"></span></button>' +
                '            <button class="btn btn-default" ng-click="getPrevPage()" ng-disabled="!canGetPrevPage()"><span class="glyphicon glyphicon-chevron-left"></span></button>' +
                '            <span class="box">{{ getCurrentPageIndex() }} / {{ getLastPageIndex() }}</span>' +
                '            <button class="btn btn-default" ng-click="getNextPage()" ng-disabled="!canGetNextPage()"><span class="glyphicon glyphicon-chevron-right"></span></button>' +
                '            <button class="btn btn-default" ng-click="getLastPage()" ng-disabled="!canGetNextPage()"><span class="glyphicon glyphicon-chevron-right"></span><span class="glyphicon glyphicon-chevron-right"></span></button>' +
                '        </div>' +
                '    </div>' +
                '</div>',
            restrict: 'A'
        };
        return directive;

        ////////////

        function link(scope, element, attrs) {
            var requestor      = $injector.get(attrs.lookup);
            var callback       = scope.lookupSelectionCallback;
            var allFn          = scope.lookupAllFunction || 'all';
            var searchFn       = scope.lookupSearchFunction || 'search';
            var sortProp       = scope.lookupSortProperty || scope.lookupDisplayProperty;
            var directionProp  = scope.lookupDirectionProperty || 'asc';
            var respProp       = scope.lookupResponseProperty || attrs.lookup;
            var meta           = defaults();
            var total          = 0;

            // init scope
            scope.query               = '';
            scope.loading             = false;
            scope.dropdown            = false;
            scope.resetGet            = resetGet;
            scope.get                 = get;
            scope.toggleDropdown      = toggleDropdown;
            scope.add                 = add;
            scope.canGetPrevPage      = canGetPrevPage;
            scope.canGetNextPage      = canGetNextPage;
            scope.getPrevPage         = getPrevPage;
            scope.getNextPage         = getNextPage;
            scope.getCurrentPageIndex = getCurrentPageIndex;
            scope.getLastPageIndex    = getLastPageIndex;
            scope.getFirstPage        = getFirstPage;
            scope.getLastPage         = getLastPage;

            // setup watcher
            scope.$watch('lookupSelectionModel', select);

            ////////////

            function resetGet() {
                meta = defaults();
                scope.lookupSelectionModel = {};
                get();
            }

            function get() {
                scope.loading = true;
                scope.dropdown = true;
                scope.query === '' ? all() : search();
            }

            function toggleDropdown() {
                scope.dropdown = !scope.dropdown;
                if (scope.lookupModel.length === 0) { get(); }
            }

            function add() {
                if (isset(scope.lookupSelectionModel)) { callback(); }
            }

            function canGetPrevPage() {
                if (meta.offset > 0) { return true; }
            }

            function canGetNextPage() {
                if ((total - (meta.offset + meta.limit)) > 0) { return true; }
            }

            function getPrevPage() {
                meta.offset = meta.offset - meta.limit;
                get();
            }

            function getNextPage() {
                meta.offset = meta.offset + meta.limit;
                get();
            }

            function getFirstPage() {
                meta.offset = 0;
                get();
            }

            function getLastPage() {
                meta.offset = (getLastPageIndex() - 1) * meta.limit;
                get();
            }

            function getCurrentPageIndex() {
                return ((meta.offset / meta.limit) + 1);
            }

            function getLastPageIndex() {
                return Math.ceil(total / meta.limit);
            }

            function all() {
                requestor[allFn](meta).then(setResponseToScope);
            }

            function search() {
                requestor[searchFn](scope.query, meta).then(setResponseToScope);
            }

            function setResponseToScope(response) {
                scope.lookupModel = response.data.data[respProp];
                meta.offset       = response.data.data.meta.offset;
                meta.limit        = response.data.data.meta.limit;
                total             = response.data.data.meta.total;
                scope.loading     = false; // hide loader
            }

            function defaults() {
                return { offset: 0, limit: 5, sort: sortProp, direction: directionProp };
            }

            function select(newValue, oldValue) {
                if (newValue !== oldValue && isset(newValue)) {
                    scope.query = newValue[scope.lookupDisplayProperty];
                    scope.dropdown = false;
                }
            }

            function isset(object) {
                return Object.keys(object).length > 0;
            }

        }
    }

})();
