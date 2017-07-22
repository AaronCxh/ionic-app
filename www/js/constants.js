"use strict";

angular.module('myApp.constants', [])

.constant("$ionicLoadingConfig", {
    "template": "请求中..."
})
.constant("Categories", {
    '':"全部",
    'food':"食品",
    'home':"家居",
    'clothes':"服饰",
    'accessories': "配饰",
    'electronics': "数码",
    'office and school supplies': "办公文具",
    'sports': "休闲健身"
})
.constant("ApiEndpoint", {
    "DEBUG": false,
    "URL": "http://127.0.0.1/www/"
})
  .constant('ACCESS_LEVELS',{
      pub:1,
      user:2
  })


