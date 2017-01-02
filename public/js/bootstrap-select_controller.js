(function () {

      console.log("Inside select Controller")

        app.controller('SimpleUsageCtrl', function ($scope, $timeout) {
    $scope.model = '';
  });



    angular.module('angular-bootstrap-select', [])
  .directive('selectpicker', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        element.selectpicker($parse(attrs.selectpicker)());
        element.selectpicker('refresh');
        
        scope.$watch(attrs.ngModel, function (newVal, oldVal) {
          scope.$parent[attrs.ngModel] = newVal;
          scope.$evalAsync(function () {
            if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
            element.selectpicker('refresh');
          });
        });
        
        scope.$on('$destroy', function () {
          scope.$evalAsync(function () {
            element.selectpicker('destroy');
          });
        });
      }
    };
  }]);
} ) ();

