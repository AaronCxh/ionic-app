"use strict";
angular.module('myApp.services', [])

  .factory('Storage', function () {
    return {
      set: function (key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function (key) {
        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function (key) {
        return window.localStorage.removeItem(key);
      }
    };
  })

  .factory("AuthService", function (ngCart,$http, Storage, $state, $q) {
    var isAuthenticated = false;
    var user = Storage.get('user') || {};
    return {
      isLoggedIn: function () {
        if (isAuthenticated) {
          return true;
        } else {
          return false;
        }
      },
      login: function (email, password) {
        var deferred = $q.defer();
        $http.post("data/user_login.php", {
          email: email,
          password: password
        }).success(function (data, status) {
          if (status === 200 && data.code == 1) {
            isAuthenticated = true;
            user = data;
            Storage.set("user", data);
            deferred.resolve();
          } else {
            isAuthenticated = false;
            deferred.reject();
          }
        }).error(function (data) {
          isAuthenticated = false;
          deferred.reject();
        });
        return deferred.promise;
      },
      logout: function () {
        var deferred = $q.defer();
        $http.get('data/logout.php').success(function (data) {
          isAuthenticated = false;
          user = {};
          Storage.remove('user');
          Storage.remove('cart');
          ngCart.init();
          deferred.resolve();
        }).error(function (data) {
          isAuthenticated = false;
          deferred.reject();
        })
        return deferred.promise;
      },
      register: function (form) {
        var deferred = $q.defer();
        $http.post('data/register.php', {
          email: form.email,
          password: form.password,
          name: form.name
        }).success(function (data, state) {
          if (state === 200 && data.code == 1) {
            isAuthenticated = true;
            user = data;
            Storage.set('user', data);
            deferred.resolve();
          } else {
            isAuthenticated = false;
            deferred.reject(data);
          }
        }).error(function (data) {
          isAuthenticated = false;
          deferred.reject();
        })
        return deferred.promise;
      },
      getUser: function () {
        return user;
      }

    }
  })

  .factory('FetchData', function ($http, $q, $ionicLoading) {
    return {
      get: function (url) {
        var d = $q.defer()
        $http.get(url).success(function (data) {
          d.resolve(data);
        }).error(function (data) {
          d.reject();
        })
        return d.promise;
      }
    }
  })
  .service('ngCart', function ($rootScope, $http, Storage,ngCartItem,$ionicLoading,$ionicPopup) {
    this.attrMap = {'size': '尺寸', 'color': '颜色', 'style': '样式'};
    this.init = function () {
      this.$cart = {
        shipping: null,
        taxRate: null,
        tax: null,
        items: [],
        selectedItems: []
      };
      this.$addr = {
        id: undefined,
        date: {}
      }
      console.log(this.$cart);
    };
    this.setAddress = function (addr) {
      this.$addr.id = addr.id;
      this.$addr.date = addr;
    };
    this.getAddress = function () {
      var _self = this;
      if (this.$addr.id === undefined) {
        //$http.get()
      }
    };
    this.addItem = function(id,name,price,quantity,data){
      var _self = this;
      console.log(id,name,price,quantity,data);
      $http.post('data/cart_detail_add.php',{ //接受三个参数,uid,pid,quantity
        'uid':Storage.get('user')?Storage.get('user').userId:'',
        'pid': id,
        'quantity':quantity
      }).success(function(res){
        console.log(res);
        if(res.code < 0){
          $rootScope.signinmodal.show();
          $rootScope.$broadcast('specsModel:hide');
          $rootScope.$broadcast('ngCart:change','请先登录')
        }else{
          _self.$loadCart(res);
          console.log(res);
          $rootScope.$broadcast('ngCart:change','商品已添加到购物车')
        }
      }).error(function(data){
        console.log(data);
      });
    };
    this.$loadCart = function(cart){
      console.log('$loadCart');
      var _self = this;
      _self.init();
      if(!cart){return false;}
      angular.forEach(cart,function(item){
        if(angular.isObject(item)){
          _self.$cart.items.push(new ngCartItem(item.pid,item.pname,item.origprice,item.count,item))
        }
      });
      this.$save();
    };
    this.setCart = function(cart){
      this.$cart = cart;
      return this.getCart();
    }
    //保存商品信息到localStorage
    this.$save = function(){
      return Storage.set('cart',this.getCart())
    };
    this.getCart = function(){
      return this.$cart;
    };
    this.getItem = function(){
      return this.getCart().items;
    };
    this.getItemById = function(itemId){
      console.log(itemId);
      var items = this.getCart().items;
      var build = false;
      angular.forEach(items,function(item){
        if(item.getId() === itemId){
          build = item;
        }
      });
      return build;
    };
    this.removeItemCartById = function(id){
      var cart = this.getCart();
      angular.forEach(cart.selectdItems,function(item,index){
        if(item.getId() === id){
          cart.selcetedItems.splice(index,1)
        }
      })
      this.setCart(cart)
    };
    this.removeItemById = function(id){
      var _self = this;
      var cart = this.getCart();
      angular.forEach(cart.items,function(item,key){
        if(angular.isObject(item)){
          if(item.getId() === id){
            cart.items.splice(key,1)
          }
        }
      })
      $http.post('data/cart_detail_delete.php',{
        'pid' : id,
        'uid' : Storage.get('user')?Storage.get('user').userId:''
      }).success(function(res){
        console.log(res);
        _self.$loadCart(res)
      })
    }
    this.$restore = function(storeCart){
      console.log(storeCart);
      var _self = this;
      _self.init();
      angular.forEach(storeCart.items,function(item){
        if(angular.isObject(item)){
          _self.$cart.items.push(new ngCartItem(item._id,item._name,item._price,item._quantity,item._data))
        }
      })
    }
    this.getTotalItems = function(){
      var count = 0;
      var items = this.getItem();
      angular.forEach(items,function(value,key){
        count += value.getQuantity();
      })
      return count;
    };
    this.getSubTotal = function(){
      var total = 0;
      var selectedItems = this.getCart().selectedItems;
      angular.forEach(selectedItems,function(item,key,obj){
        total += item.getQuantity()*item.getPrice();
      })

      return total;
    };
    this.totalCost = function(){
      return parseInt(this.getSubTotal()).toFixed(2)
    };
    this.getTotalSelectedItems = function(){
      var total = 0;
      var selectedItems = this.getCart().selectedItems;
      angular.forEach(selectedItems,function(item,key){
        total += item.getQuantity();
      });
      return parseInt(total)
    };
    this.setSelectItem = function(id){
      var cart = this.getItemById(id);
      if(angular.isObject(cart)){
        this.getCart().selectedItems.push(cart)
      }
    };
    this.getSelectItem = function(id){
      var cart = this.getCart();
      var items = cart.selectedItems;
      var build;
      angular.forEach(items,function(item,key){
        if(item.getId() === id){
          build = item
        }
      })
      return build;
    }
    this.removeSelectItemById = function(id){
      var cart = this.getCart();
      var selectedItems = cart.selectedItems;
      angular.forEach(selectedItems,function(item,key){
        if(item.getId() === id){
          selectedItems.splice(key,1)
        }
      })
      this.setCart(cart)
    }
  })

  .factory('Items', function ($http, $q, $rootScope, Storage) {
    var items = [],
      currentTab = "",
      hasNextPage = true,
      nextPage = 0,
      perPage = 12,
      isEmpty = false,
      pageNum = 2,
      hasNextNum = true;
    return {
      fetchItems: function () {
        var deferred = $q.defer();
        hasNextPage = true;
        isEmpty = false;
        $http.get('data/categories.php', {
          params: {
            main_category: currentTab
          }
        }).success(function (data, status) {
          if (status === 200 && data.code === 1) {
            if (data.length < perPage) {
              hasNextPage = false;
            }
            nextPage = 1;
            deferred.resolve(data);
            if (data.length === 0) {
              isEmpty = true;
            }
          } else {
            deferred.reject();
          }
        }).error(function (data) {
          deferred.reject(data)
        });
        return deferred.promise;
      },
      setCurrentTab: function (tab) {
        currentTab = tab;
      },
      isEmpty: function () {
        return isEmpty;
      },
      getCurrentTab: function () {
        return currentTab;
      },
      hasNextPage:function(){
        return hasNextPage;
      },
      loadMore:function(){
        var deferred = $q.defer();
        $http.get('data/product.php',{
          params:{
            pageNum:pageNum
          }
        }).success(function(res,status){
          if(status === 200 && res.code > 0){
            if(res.data.length < 6){
              hasNextNum = false;
            }else{
              pageNum++;
              deferred.resolve(res);
            }
          }
        }).error(function(data){
          deferred.reject(data);
        });
        return deferred.promise;
      },
      hasNextNum:function(){
        return hasNextNum;
      }
    }
  })

  .service('ngCartItem', ['$rootScope','$log',function ($rootScope, $log) {
      var item = function(id,name,price,quantity,data){
        this.setId(id);
        this.setName(name);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setData(data)
      };
      item.prototype.setId = function(id){
        if(id)return this._id = id;
        else{
          $log.error('ID必须提供')
        }
      };
    item.prototype.getId = function(){
      return this._id
    }
    item.prototype.setName = function(name){
      if(name)return this._name = name;
      else{
        $log.error('名字必须提供')
      }
    };
    item.prototype.getName = function(){
      return this._name;
    };
    item.prototype.setPrice = function(price){
      var priceFloat = parseFloat(price);
      if(priceFloat){
        if(priceFloat<=0){
          $log.error('价格必须大于等于0')
        }else{
          this._price = (priceFloat)
        }
      }else{
        $log.error('价格必须提供')
      }
    };
    item.prototype.getPrice = function(){
      return this._price;
    }
    item.prototype.setQuantity = function(quantity,relative){
      var quantityInt = parseInt(quantity);
      if(quantityInt %1 === 0){
          if(relative === true){
            this._quantity += quantityInt;
          }else{
            this._quantity = quantityInt;
          }
          if(this._quantity < 1){this._quantity = 1}
          if(this._quantity >= 5){this._quantity = 5}
      }else{
        this._quantity = 1;
        $log.info('Quantity mush be an inter and was defaulted to 1')
      }
    };
    item.prototype.getQuantity = function(){
      return this._quantity;
    }
    item.prototype.setData = function(data){
      if(data){this._data = data}
    }
    item.prototype.getData = function(){
      if(this._data)return this._data;
      else{$log.error(this._data + 'This data has no data')};
    }
    item.prototype.getTotal = function(){
      return +parseFloat(this.getPrice() * this.getQuantity()).toFixed(2);
    }
    item.prototype.toObject = function(){
      return {
        id:this.getId(),
        name: this.getName(),
        price: this.getPrice(),
        quantity: this.getQuantity(),
        data: this.getData(),
        total: this.getTotal()
      }
    }
    return item;
  }])





