
 app.directive('datepicker',function(){
        return{
                restrict: 'A',
                
                scope:{
                    date:'='
                },
            link:function(scope,element,attrs,ngModelCtrl){
                           $(element).datepicker({
                dateFormat: 'dd MM yy',
               
                onSelect: function (date) {
                    scope.date = Date.parse(date)/1000;
                    scope.$apply();
                }
            });

                }
               }

});