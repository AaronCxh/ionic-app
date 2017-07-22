// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myApp', ['ionic', 'myApp.controller', 'myApp.directive', 'myApp.services', 'myApp.constants', 'ionic-native-transitions', 'ngCordova',
  'ionicLazyLoad'])

  .run(function (FetchData,ngCart,$ionicPlatform, $rootScope, $state, $ionicModal, AuthService, $cordovaToast, $ionicLoading, Storage) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      if (Storage.get('introPage') !== "alertShow") {
        $state.go('explore');
      }
    });
    console.log($ionicLoading);
    //console.log(angular);
    if(angular.isObject(Storage.get('cart'))){
      console.log('if $restore');
      ngCart.$restore(Storage.get('cart'))
    }else{
      console.log('else $loadCart');
      ngCart.init();//false
      FetchData.get('data/cart_detail_list.php').then(function(data){
        if(data.code < 0){
          return;
        }
        ngCart.$loadCart(data)
      })
    }
    $rootScope.$on('ngCart:change',function(event,msg){
      //ngCart.$save();
      if (window.cordova) {
        $cordovaToast.show(msg, 'short', 'center');
      } else {
        $ionicLoading.show({
          template:msg,
          duration:1000
        });
      }
    });
    //提示信息
    $rootScope.$on('alert', function (event, msg, options) {
      if (window.cordova) {
        $cordovaToast.show(msg, 'short', 'center');
        //console.log("if");
      } else {
        //console.log("else");
        var o = options || {}
        angular.extend(o, {
          template: msg || '<ion-spinner icon="spiral"></ion-spinner>',
          duration: 1000
        })
        $ionicLoading.show(o);
      }
    });

    $ionicModal.fromTemplateUrl('templates/signin.html', {
      scope: $rootScope,
      animation: 'slide-in-left'
    }).then(function (modal) {
      $rootScope.signinmodal = modal;
    });

    $rootScope.openSignInModal = function () {
      $rootScope.signinmodal.show();
    };

    $rootScope.closeSignInModal = function () {
      $rootScope.signinmodal.hide();
    };

    $rootScope.$on('$destroy', function () {
      $rootScope.signinmodal.remove();
    });

    $rootScope.$on('$stateChangeStart', function (event, next,EmptyObj,prev) {
      if (AuthService.isLoggedIn() === false) {
          var token = Storage.get('user');
        if(token){
            return;
        }else if(next.loginRequired){
          $rootScope.signinmodal.show();
          $rootScope.$emit('alert', "请先登录");
        }
      }
    })


  })

  .config(['$stateProvider', '$urlRouterProvider', '$ionicNativeTransitionsProvider', '$ionicConfigProvider', '$httpProvider', 'ACCESS_LEVELS',
    function ($stateProvider, $urlRouterProvider, $ionicNativeTransitionsProvider, $ionicConfigProvider, $httpProvider, ACCESS_LEVELS) {
      $ionicConfigProvider.views.maxCache(5);
      /*$ionicNativeTransitionsProvider.setDefaultOptions({
        duration: 400, // in milliseconds (ms), default 400,
        slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
        iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        androiddelay: -1, // same as above but for Android, default -1
        winphonedelay: -1, // same as above but for Windows Phone, default -1,
        fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
      });
      $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left'
      });
      $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'slide',
        direction: 'right'
      });*/

      $stateProvider
        .state('tab', {
          url: '',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })

        .state('explore', {
          url: '/explore',
          templateUrl: 'templates/explore.html',
          controller: 'exploreCtrl'
        })

        .state('tab.mine', {
          url: '/mine',
          views: {
            'tab-mine': {
              templateUrl: 'templates/mine.html',
              controller: 'MineCtrl'
            }
          }
        })
        .state('tab.home', {
          url: '/home',
          views: {
            'tab-home@tab': {
              templateUrl: 'templates/home.html',
              controller: 'HomeCtrl'
            }
          }
        })

        .state('tab.notification', {
          url: '/notification',
          views: {
            'tab-notification': {
              templateUrl: 'templates/notification.html'
            }
          },
          loginRequired: true
        })
        .state('tab.shoppingCart', {
          url: '/shoppingCart',
          views: {
            'tab-shoppingCart': {
              templateUrl: 'templates/shoppingCart/shoppingCart.html',
              controller: 'cartCtrl'
            }
          },
          loginRequired: true
        })

        .state('tab.item', {
          url: '/item/:itemId',
          views: {
            'tab-home': {
              templateUrl: 'templates/item.html',
              controller: 'itemCtrl'
            }
          }
        })
        .state('tab.categories', {
          url: '/categories',
          views: {
            'tab-home': {
              templateUrl: 'templates/categories.html',
              controller: 'categoryCtrl'
            }
          }
        })
        /*.state('tab.favors', {
          url: '/favors',
          views: {
            'tab-favors': {
              templateUrl: 'favors.html',
              controller: 'favorCtrl'
            }
          }
        })*/

      $urlRouterProvider.otherwise('/home');
      $httpProvider.defaults.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
        return str.join("&")
      }
      $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }])

