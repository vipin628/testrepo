angular.module('pagination', []).directive('pagination', function ($compile) {
    return {
        restrict: 'E',
//        transclude: 'element',
        scope: {
            option: '=',
        },
        controller: function ($scope, $element) {
            var option = {
                limit: 10
            };
            if (typeof $scope.option == 'undefined') {
//                $element.attr('option', 'paginationoption');
//                $compile($element);
                $scope.option = {};
            }
            $scope.option.current_page = 1;
            if (typeof $scope.option != 'undefined') {
                if (typeof $scope.option.limit == 'undefined') {
                    $scope.option.limit = option.limit;
                }
            }
            $scope.option.set = function (data) {
                $scope.option.num_page = data.num_page;
                $scope.option.num_record = data.num_record;
                $scope.option.start_record = data.start_record;
                $scope.option.end_record = data.end_record;
            };
            $scope.increase_page = function () {
                if ($scope.option.current_page < $scope.option.num_page) {
                    $scope.option.current_page++;
                }
            };
            $scope.decrease_page = function () {
                if ($scope.option.current_page > 1) {
                    $scope.option.current_page--;
                }
            };
        },
        template: function (e) {
            return '<div class="pagination">' +
                    '<div class="pagination_limit">' +
                    '' +
                    '</div>' +
                    '<ul>' +
                    '<li title="Page Limit">Limit : <input type="text" ng-model="option.limit" style="width:50px;height: 30px!important;margin-right:25px;" class="form-control"></li>' +
                    '<li title="First Page"><a class="btn btn-default btn-xs" ng-click="option.current_page=1">&#x2770;&#x2770;</a></li>' +
                    '<li title="Previous Page"><a class="btn btn-default btn-xs" ng-click="decrease_page()">&#x2770;</a></li>' +
                    '<li><input type="text" style="width:50px;height: 30px!important;" ng-model="option.current_page" class="form-control"></li>' +
                    '<li title="Next Page"><a class="btn btn-default btn-xs" ng-click="increase_page()">&#x2771;</a></li>' +
                    '<li title="Last Page"><a class="btn btn-default btn-xs" ng-click="option.current_page=option.num_page">&#x2771;&#x2771;</a></li>' +
                    '</ul>' +
                    '<div class="pagination_counting btn btn-success">{{option.start_record}} to {{option.end_record}} out of total {{option.num_record}} records</div>'
            '</div>';
        }
    }
})
        .filter('pagination', function () {
            return function (data, option) {
                if (typeof data == 'undefined') {
                    return [];
                }
                if (!option) {
                    option = {};
                }
                var i = 0;
                var j = (option.current_page - 1) * option.limit;
                var start_record = j + 1;
                var k = data.length % option.limit;
                var l = parseInt(data.length / option.limit) + 1;
                k = option.current_page == l ? k : option.limit;
                var result = [];
                while (i < k) {
                    result.push(data[j]);
                    i++;
                    j++;
                }
                option.num_page = l;
                option.num_record = data.length;
                option.start_record = start_record;
                option.end_record = start_record + k - 1;
                if (typeof option.set != 'undefined') {
                    option.set({
                        num_page: l,
                        num_record: data.length,
                        start_record: start_record,
                        end_record: parseInt(start_record) + parseInt(k) - 1
                    });
                }

                return result;
            };
        });