"use strict";
angular.module('myApp.directive',[])

  .directive('myfocus', function($timeout, $parse) {
    return {
      link: function(scope, element, attrs) {
        var model = $parse(attrs.myfocus);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }else if(value === false){
            $timeout(function() {
              element[0].blur();
            });
          }
        });
      }
    };
  })

  .directive('ngcartAddtocart',function(ngCart){
    return {
      restrict:'E',
      scope:{
        id:'@',
        name:'@',
        quantity:'@',
        quantityMax:'@',
        price:'@',
        data:'='
      },
      transclude:true,
      templateUrl:function(element,attrs){
        if(typeof attrs.templateUrl === 'undefined'){
          return 'templates/ngCart/addtocart.html'
        }else{
          return attrs.templateUrl
        }
      },
      link:function(scope,element,attrs){
        scope.ngCart = ngCart;
        scope.attrs = attrs;
        scope.inCart = function(){
          return ngCart.getItemById(attrs.id)
        };
        if(scope.inCart()){
          scope.q = ngCart.getItemById(attrs.id).getQuantity()
        }else{
          scope.q = parseInt(scope.quantity)
        }

        scope.qtyOpt = [];
        for(var i = 0;i<=scope.quantityMax;i++){
          scope.qtyOpt.push(i)
        }

        scope.alertWarning = function(){
          scope.$emit('alert','请选择有效商品')
        }
      }
    }
  })
