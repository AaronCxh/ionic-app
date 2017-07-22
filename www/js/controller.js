'use strict';

angular.module('myApp.controller', [])
  .controller('MineCtrl', ['$rootScope', '$scope', 'AuthService', '$state', '$ionicViewSwitcher', 'Storage',
    function ($rootScope, $scope, AuthService, $state, $ionicViewSwitcher, Storage) {
      $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = '';
      })
      $scope.user = AuthService;
      $scope.logout = function () {
        AuthService.logout().then(function () {
          $scope.$emit('alert', '退出成功');
          //Storage.remove("introPage");
          $rootScope.signinmodal.show();
          $rootScope.$broadcast('logout');
          $ionicViewSwitcher.nextDirection("back");
        })
      }
    }])

  .controller('HomeCtrl', ['ngCart', '$rootScope', '$scope', '$ionicSlideBoxDelegate', '$state', 'FetchData', 'Storage',
    'Items', function (ngCart, $rootScope, $scope, $ionicSlideBoxDelegate, $state, FetchData, Storage, Items) {
      $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = '';
        $ionicSlideBoxDelegate.start();
      });
      if (Storage.get('banner')) {
        $scope.banners = Storage.get('banner')
      } else {
        FetchData.get("data/banners.json").then(function (data) {
          $scope.banners = data;
          Storage.set('banners', $scope.banners);
        });
      }

      FetchData.get("data/product.php").then(function (res) {
        $scope.items = res.data;
        //console.log(res)
      });
      $scope.goItem = function (item_id) {
        $state.go('tab.item', {itemId: item_id});
      };
      $scope.loadMore = function () {
        Items.loadMore().then(function (res) {
          console.log(res.data);
          $scope.items = $scope.items.concat(res.data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      };
      $scope.moreDataCanBeLoaded = function () {
        return Items.hasNextNum();
      };
      $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
      }
      $scope.ngCart = ngCart;
    }])
//  登录控制器
  .controller('signinCtrl', ['Storage', 'ngCart', 'FetchData', '$rootScope', '$scope', '$ionicModal', 'AuthService',
    function (Storage, ngCart, FetchData, $rootScope, $scope, $ionicModal, AuthService) {
      $scope.vm = {};
      $scope.login = function () {
        $scope.vm.password = parseInt($scope.vm.password);
        AuthService.login($scope.vm.email, $scope.vm.password)
          .then(function () {
            $rootScope.signinmodal.hide();
            $scope.$emit('alert', '登录成功');
          }).then(function () {
            console.log(232312321);
            FetchData.get('data/cart_detail_list.php?uid=' + (Storage.get('user').userId)).then(function (data) {
              console.log(data);
              if (data.code < 0) {
                return;
              }
              ngCart.$loadCart(data)
            })
          }).catch(function () {
            $scope.$emit('alert', '邮箱或密码错误')
          })
      };
      $scope.$on('logout', function () {
        $scope.vm.password = '';
      });

      $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal1 = modal;
        //$scope.modal1.show();
      });
      $scope.openSignUpModal = function () {
        $scope.modal1.show();
      };
      $scope.closeSignUpModal = function () {
        $scope.modal1.hide();
      };
      $scope.$on('signupmodel:hide', function () {
        $scope.modal1.hide();
        //$scope.modal1.remove();
      })
    }])
  //注册控制器
  .controller('signupCtrl', ['$rootScope', '$scope', 'AuthService',
    function ($rootScope, $scope, AuthService) {
      $scope.signupForm = {};
      $scope.use = AuthService;
      $scope.signup = function () {
        AuthService.register($scope.signupForm)
          .then(function () {
            $rootScope.$broadcast('signupmodel:hide');
            $rootScope.signinmodal.hide();
            $scope.$emit('alert', '注册成功');
          }).catch(function (data) {
            $scope.$emit('alert', data.msg);
            console.log(data);
          })
      }
    }])
  //商品详情控制器,加入购物车
  .controller('itemCtrl', ['$scope', '$log', '$rootScope', 'FetchData', '$stateParams', '$ionicModal', '$ionicSlideBoxDelegate',
    function ($scope, $log, $rootScope, FetchData, $stateParams, $ionicModal, $ionicSlideBoxDelegate) {
      $scope.$on('$ionicView.beforeEnter', function (event,view,i,o,p) {
        $rootScope.hideTabs = 'tabs-item-hide';

      });
      $scope.$on('$ionicView.afterLeave',function(){
        var ele1 = angular.element(document.querySelector('ion-view'));
        var ele2 = angular.element(ele1.next());
        var Ele1State = ele1.attr('nav-view');
        var Ele2State = ele2.attr('nav-view');
        //if(ele1.$attr-nav-view === 'cached' && ele1.nextElementSibling.$attr-nav-view === 'active'){
        //  ele1.$attrs
        //}
      });
      FetchData.get('data/product_detail.php?pid=' + $stateParams.itemId).then(function (data) {
        $scope.item = data[0];
        $scope.images = data.images;
        parseInt($scope.item.is_favored);
        $scope.item.is_favored = Boolean(parseInt($scope.item.is_favored));
        $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
        $ionicSlideBoxDelegate.$getByHandle('image-viewer').loop(true);
        //console.log($scope.item);
        //console.log($scope.images);
      })
      $scope.favor = function (itemId) {
        if (!$scope.item.is_favored) {
          FetchData.get("data/is_favored.php?itemId=" + itemId + "&is_favored=" + Number(!$scope.item.is_favored))
            .then(function (data) {
              $scope.item.is_favored = true;
              $scope.$emit('alert', "收藏成功")
            })
        } else {
          FetchData.get("data/is_favored.php?itemId=" + itemId + "&is_favored=" + Number(!$scope.item.is_favored))
            .then(function (data) {
              $scope.item.is_favored = false;
              $scope.$emit('alert', "取消收藏")
            })
        }
      };

      //showSpecModel
      //console.log($ionicModal);

      $ionicModal.fromTemplateUrl('templates/specs-dialog.html', {
        scope: $scope,
        animation: 'slide-in-right'
      }).then(function (modal) {
        $scope.specsDialog = modal;
      });
      $scope.showSpecModal = function () {
        //console.log(1,2)
        $scope.specsDialog.show();
      };
      $scope.closeSpecModal = function () {
        $scope.specsDialog.hide();
      };
      $scope.$on('$stateChangeStart', function (event) {
        $scope.specsDialog.remove();
      })
      $scope.$on('specsModel:hide', function () {
        $scope.specsDialog.hide();
      })

      $scope.quantity = 1;
      $scope.setQuantity = function (quantity, relative) {
        var quantity = parseInt(quantity);
        if (quantity % 1 === 0) {
          if (relative === true) {
            $scope.quantity += quantity
          } else {
            $scope.quantity = quantity
          }
          if ($scope.quantity < 1) {
            $scope.quantity = 1
          }
          if ($scope.quantity > 5) {
            $scope.quantity = 5
          }
        }
      };
      $scope.subTotal = function (price, quantity) {
        return price * quantity
      }
    }])

  .controller('exploreCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', 'Storage',
    function ($scope, $state, $ionicSlideBoxDelegate, Storage) {
      var currentPlatform = ionic.Platform.platform();
      $scope.slideIndex = 0;
      $scope.slideChanged = slideChanged;

      if (currentPlatform && currentPlatform == "android") {
        $scope.device = "android"
      } else {
        $scope.device = "iphone"
      }
      $scope.slides = [{
        top: '一 '
      }, {
        top: '二'
      }
      ];
      function slideChanged(index) {
        $scope.slideIndex = index;
      }

      $scope.goHome = function () {
        $state.go("tab.home");
        Storage.set("introPage", "alertShow")
      }
    }])

  .controller('categoryCtrl', ['$scope', '$rootScope', '$timeout', '$state', 'FetchData',
    'Categories', '$ionicModal', '$ionicScrollDelegate', 'Items',
    function ($scope, $rootScope, $timeout, $state, FetchData, Categories,
              $ionicModal, $ionicScrollDelegate, Items) {
      $scope.Categories = Categories;

      $scope.goItem = function (item_id) {
        console.log(item_id)
        $state.go('tab.item', {itemId: item_id});
      };

      $scope.slideHasChanged = function (index) {
        var nextTab = getCate(index);
        $scope.changeTab(nextTab, index);
      }

      $scope.currentIndex = 0;
      $scope.items = [];
      $scope.currentTab = "";
      //切换Tabs
      $scope.changeTab = function (tab, index) {
        $scope.items = [];
        $scope.currentIndex = index;
        $scope.currentTab = tab;
        Items.setCurrentTab(tab);
        var n = [];
        Items.fetchItems().then(function (data) {
          var temp = data.Categories;
          angular.forEach(temp, function (data) {
            n.push(data['sub_categories']);
          });
          $scope.items = reduceDimension(n);
        });
        if (!index) {
          index = getCateIndex($scope.currentIndex)
        }
        setPosition(index);
      };
      Items.fetchItems().then(function (data) {
        var tmp = data.Categories;
        var n = [];
        angular.forEach(tmp, function (x, i, a) {
          n.push(x['sub_categories']);
        })

        $scope.items = reduceDimension(n);
      });
      //下拉刷新
      //$scope.doRefresh = function(){
      //  Items.fetchItems().then(function(data){
      //    var tmp = data.Categories;
      //    var n = [];
      //    angular.forEach(tmp,function(x,i,a){
      //      n.push(x['sub_categories']);
      //    })
      //    $scope.items = reduceDimension(n).slice(0,6);
      //    console.log($scope.pages);
      //  });
      //  $scope.$broadcast('scroll.refreshComplete');
      //}
      //滚动加载
      //$scope.loadMore = function(){
      //    $scope.pages.pageNum++;
      //    $scope.items = $scope.items.concat(reduceDimension($scope.n).slice($scope.pages.start,$scope.pages.pageSize));
      //    console.log($scope.pages)
      //    console.log($scope.pages.pageNum);
      //}


      function setPosition(index) {
        var iconsDiv = angular.element(document.querySelectorAll('#category-scroll'));
        var icons = iconsDiv.find('a');
        var middle = iconsDiv[0].offsetWidth / 2;
        var curEl = angular.element(icons[index]);
        if (curEl && curEl.length) {
          var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;
          var leftStr = (middle - (curElLeft) - curElWidth / 2 + 5);
          if (leftStr > 0) {
            leftStr = 0;
          }
          $ionicScrollDelegate.$getByHandle('cateScroll').scrollTo(Math.abs(leftStr), 0, true);
        }
      }


      function reduceDimension(arr) {
        return Array.prototype.concat.apply([], arr);
      }

      function getCateIndex(tab) {
        var i = 0, key;
        for (key in Categories) {
          if (tab === key) {
            return i;
          }
          i++;
        }
        return null;
      }

      function getCate(index) {
        var i = 0, key;
        for (key in Categories) {
          if (i === index) {
            return key;
          }
          i++;
        }
        return null;
      }


    }])
  //购物车控制器
  .controller('cartCtrl', ['FetchData', '$rootScope', '$scope', 'ngCart', '$log','$state',
    function (FetchData, $rootScope, $scope, ngCart, $log,$state) {
      $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = "";
        $log.info('进入购物车');
      });
      $scope.$on('$ionicView.beforeLeave',function(event,currView){
        //console.log($state);
      });

      $scope.ngCart = ngCart;
      $scope.editShown = false;
      $scope.toggleEditShown = function () {
        $scope.editShown = !$scope.editShown;
      };
      $scope.setQuantity = function(item,quantity,relative){
        var quantityInt = parseInt(quantity);
        if(quantityInt%1 === 0){
          if(relative === true){
            item.setQuantity(item.getQuantity() + quantityInt)
          }else{
            item.setQuantity(quantityInt);
          }
          if(item.getQuantity() < 1 ){item.setQuantity(1)}
          if(item.getQuantity() > 5 ){item.setQuantity(5)}

        }else{
          item.setQuantity(1);
        }
      }
      $scope.isSelectedAll = false;
      $scope.selectAllEntries = function(){
          if($scope.isSelectedAll === false){
            angular.forEach(ngCart.getCart().items,function(item,key){
              if(!ngCart.getSelectItem(item.getId())){
                ngCart.setSelectItem(item.getId())
              }
            })
          }else{
            ngCart.getCart().selectedItems = [];
          }
          $scope.isSelectedAll = !$scope.isSelectedAll;
      }
      $scope.selectEntry = function(id){
        if(ngCart.getSelectItem(id)){
          ngCart.removeSelectItemById(id)
        }else{
          ngCart.setSelectItem(id)
        }
      }
    }])
