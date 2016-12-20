/**
 * Created by qingyun on 16/11/30.
 */
//js程序入口
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.news','myApp.live','myApp.topic','myApp.personal','myApp.my','myApp.newCon','ionic-datepicker','myApp.topicOne']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    });
    //意外跳转
    $urlRouterProvider.otherwise('tabs/news');
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.live',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.live',{
        url:'/live',
        views:{
            'tabs-live':{
                templateUrl:'live.html',
                controller:'liveController'
            }
        }
    });
}]).controller('liveController',['$scope','$ionicSlideBoxDelegate','HttpFactory',function ($scope,$ionicSlideBoxDelegate,HttpFactory) {
    // 轮播图
    $scope.news = {
        adsArray1:[]
    };
    var url = "http://data.live.126.net/livechannel/previewlist.json";
    HttpFactory.getData(url).then(function (result) {
        // console.log(result);
        var img_title_Array = [];
        if(result.top.length){
            for(var i =0;i<result.top.length;i++){
                var obj = {
                    titile:result.top[i].roomName,
                    imgsrc:result.top[i].image
                };
                img_title_Array.push(obj);
            }
            $scope.news.adsArray1 = img_title_Array;
        }

        $scope.imas = result.future;
        $scope.itema = result.sublives;

        $scope.imad = result.live_review;

    });


}]);
/**
 * Created by Administrator on 2016/12/6.
 */

angular.module('myApp.my',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.my',{
        url:'/my',
        views:{
            'tabs-personal':{
                templateUrl:'my.html',
                controller:'myController'
            }
        }
    });
}]).controller('myController',['$scope',function ($scope) {
       $scope.duSome = function () {
           console.log("jhhhhjeqwe");
       }
}]);
/**
 * Created by Administrator on 2016/12/7.
 */
angular.module('myApp.newCon',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('newCon',{
        url:'/newCon',
        templateUrl:'newCon.html',
        controller:'newConController',
        params:{'data':null}
    });
}]).controller('newConController',['$scope','$stateParams','$sce','HttpFactory',function ($scope,$stateParams,$sce,HttpFactory) {
   $scope.newCon = {
       detail:'',
       body:''
   };
   var docid = $stateParams.data;
    // console.log($stateParams.data);

    var url = 'http://c.m.163.com/nc/article/'+ docid +'/full.html';
    // console.log(url);
    HttpFactory.getData(url).then(function (result) {
        $scope.newCon.detail  = result[docid];
        // console.log($scope.newCon.detail);

        var newsObj = $scope.newCon.detail;
        if (newsObj.img && newsObj.img.length){
            for (var i = 0;i< newsObj.img.length;i++){
                var imgWidth = newsObj.img[i].pixel.split('*')[0];
                if (imgWidth > document.body.offsetWidth){
                    imgWidth = document.body.offsetWidth;
                }
                var imgStyle = 'width:' + imgWidth + 'px';
                var imgStr = "<img" + " style='" + imgStyle + "'" + " src=" + newsObj.img[i].src + ">";
                newsObj.body = newsObj.body.replace(newsObj.img[i].ref,imgStr);
                // console.log(newsObj.body);
            }
        };

    });

}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$state','$ionicViewSwitcher',"$ionicLoading","$ionicScrollDelegate",'HttpFactory',function ($scope,$ionicPopup,$state,$ionicViewSwitcher,$ionicLoading,$ionicScrollDelegate,HttpFactory) {
    // 导航
    var url = "http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html";
    HttpFactory.getData(url).then(function (result) {
        $scope.numArry = result.tList;
        // console.log(result);
    })

    // 轮播图
    $scope.news = {
        newsArray:'',
        adsArray:[]
    };

    var index = 10;
    var url = "http://c.m.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size="+index+"&fn=1&prog=LMA1&passport=&devId=eW7qcXmjWleAjCxp25EgTBBywawDoVwZiZ9SMikG4cGiOa69wsn%2FdeHaaNGRMr2hIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=DJEPdRawaRYCJZwF3SQobA%3D%3D&lon=7J7OmyytD8SqP0pSV1cJJA%3D%3D";


    HttpFactory.getData(url).then(function (result) {
        // console.log(index);
        $scope.news.newsArray = result;
        $scope.news.adsArray = result.T1348647909107[0].ads;
    });
//上拉加载


        $scope.items = [];
        $scope.loadMore = function () {
            index += 10;
            // var url = "http://c.m.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset="+index+"&size=10&fn=1&prog=LMA1&passport=&devId=eW7qcXmjWleAjCxp25EgTBBywawDoVwZiZ9SMikG4cGiOa69wsn%2FdeHaaNGRMr2hIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=DJEPdRawaRYCJZwF3SQobA%3D%3D&lon=7J7OmyytD8SqP0pSV1cJJA%3D%3D";
            HttpFactory.getData(url).then(function (result) {
                $scope.name = result.T1348647909107.splice(0,1);

                $scope.items = result.T1348647909107.concat($scope.items);
                console.log(index);
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        };

    $scope.doSome = function (index) {
        var zyx = $scope.items[index].id;
        console.log(zyx);
        if(zyx = C8JJR2PV000189FH){
            $state.go('newsDetail',{data:zyx});
        }else {

        }
        $state.go('newCon',{data:zyx});
        $ionicViewSwitcher.nextDirection('forward');

    }


}]);
/**
 * Created by qingyun on 16/12/7.
 */

angular.module('cftApp.news2',[]).controller('newsController2',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray2:[],
        adsArray2:[],
        index:0
    };
    $scope.$on('updateNews2',function (evt,msg) {
        $scope.news.adsArray2 = [];
        $scope.news.newsArray2 = [];
        $scope.news.index = 0;
        console.log('view2,'+ msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore2(UrlArray[msg]);
    });
    $scope.loadMore2 = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getChanListNews?channel=T1456112189138&size=10&offset="+ $scope.news.index +"&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640855&sign=n%2BRpzwR4DEI0MaavyBhQlpZaxlFxQdWjn0Ty7qOYWaB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D";
        }
        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray2.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray2 = result[0].ads;
                }
            }
            $scope.news.newsArray2 = $scope.news.newsArray2.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray2.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.personal',['ionic-datepicker']).config(['$stateProvider','ionicDatePickerProvider',function ($stateProvider,ionicDatePickerProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'personal.html',
                controller:'personalController'
            }
        }
    });
    var datePickerObj = {
        inputDate: new Date(),
        titleLabel: 'Select a Date',
        setLabel: 'Set',
        todayLabel: 'Today',
        closeLabel: 'Close',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
}]).controller('personalController',['$scope','ionicDatePicker','$ionicBackdrop','$timeout',function ($scope,ionicDatePicker,$ionicBackdrop, $timeout) {
    var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        },
        disabledDates: [            //Optional
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ]
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
    };

    var a =1 ;
    // (a%2==0)?$ionicBackdrop.retain(): $ionicBackdrop.release();
    $scope.changColor = function () {
        a++;
        if(a%2==0){
            $ionicBackdrop.retain();
        }else {
            $ionicBackdrop.release();
        }
    }
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.tabs',[]).controller('tabsController',['$scope',function ($scope) {

}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.topic',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.topic',{
        url:'/topic',
        views:{
            'tabs-topic':{
                templateUrl:'topic.html',
                controller:'topicController'
            }
        }
    });
}]).controller('topicController',['$scope','$ionicLoading','$state','$ionicViewSwitcher','HttpFactory',function ($scope,$ionicLoading,$state,$ionicViewSwitcher,HttpFactory) {

    // 标题
    var urla = 'http://c.m.163.com/newstopic/list/classification.html';
    $scope.item= '';
    HttpFactory.getData(urla).then(function (result) {
        console.log(result);
        $scope.item =result.data;
    });
    // 预告
    var index =0;
    $scope.items = [];
        // 上拉加载
    $scope.loadMore = function() {

            var url = 'http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/'+index+'-10.html';
          HttpFactory.getData(url).then(function (result) {
              index +=10;
              $scope.items =$scope.items.concat(result.data.expertList);
              $scope.$broadcast('scroll.infiniteScrollComplete');
          });

    };

    // 下拉刷新
    $scope.doRefresh = function () {
        var url = 'http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-10.html';
        HttpFactory.getData(url).then(function (result) {
            $scope.items =$scope.items.concat(result.data.expertList);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });

    };
    // 详情页面跳转
    $scope.doSome = function (index) {
        var zyx = $scope.items[index].expertId;
        $state.go('topicOne',{data:zyx});
    }
$scope.changHight = function () {
    var car = document.querySelector('.topicCarda')
    // console.log(car);
    if(car.style.height == '67px'){
        car.style.height = '210px';
    }else {
        car.style.height = '67px';
    }
}

}]);
/**
 * Created by Administrator on 2016/12/14.
 */
angular.module('myApp.topicOne',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('topicOne',{
                url:'/topicOne',
                templateUrl:'topicOne.html',
                controller:'topicOneController',
                 params:{'data':null}

    });

}]).controller('topicOneController',['$scope','$stateParams','$sce','HttpFactory',function ($scope,$stateParams,$sce,HttpFactory) {

      // console.log($stateParams);
     var ull = $stateParams.data;
     var url = "http://c.m.163.com/newstopic/qa/"+ull+".html";
    var items = [];
    var itemsa = [];
  HttpFactory.getData(url).then(function (result) {
      $scope.item = result.data;
      $scope.items =  $scope.item.expert;
      // console.log($scope.item.expert);







      if($scope.items.relatedNews){
          $scope.imada = $scope.items.relatedNews;
          $scope.sy=true;
      }else {
          $scope.sy =false;

      }

  });
    $scope.changHight = function () {
        var car = document.querySelector('.topickKard')
        // console.log(car);
        if(car.style.height == '275px'){
            car.style.height = '100px';
        }else {
            car.style.height = '275px';
        }
    }

}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://192.168.0.100:3000/?myUrl=" + encodeURIComponent(url);
                url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    reslut =reslut.data;
                    // reslut = reslut[Object.keys(reslut)[0]];
                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" auto-play="true" slide-interval="1000" show-pager="true" does-continue="true" ng-if="isShowSlideBox" on-drag="drag($event)"> <ion-slide ng-repeat="ads in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{ads.imgsrc}}" class="topCarouselImg"></ion-slide> </ion-slide-box><div class="slideBottomDiv"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate',function ($scope,$element,$ionicSlideBoxDelegate) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastElementChild;

            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    /*
                    * 两种方案解决轮播不能立刻显示或者显示错位的bug 改bug由于ng-repeat和slideBox的特性造成
                    * 完美的解决方案是使用添加ng-if 另一种是用update 和 loop
                    * */
                    $scope.isShowSlideBox = true;
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            $scope.slideHasChanged = function (index) {
                // lastSpan.innerText = $scope.sourceArray[index].title;
            };
            //页面刚加载出来的时候禁止滑动
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);
/**
 * Created by qingyun on 16/12/7.
 */
angular.module('cftApp.urls',[]).constant('UrlArray',["http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=@&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore","http://c.m.163.com/dlist/article/dynamic?from=T1348648517839&offset=@&size=10&fn=7&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639275&sign=ENAtFozNgGugOq3e1UL6hWbkeBqF24b8ECZ%2FOg2OGlZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getChanListNews?channel=T1456112189138&size=10&offset=@&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640855&sign=n%2BRpzwR4DEI0MaavyBhQlpZaxlFxQdWjn0Ty7qOYWaB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/dynamic?from=T1348649079062&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639446&sign=cZqFpGcYxIM23Mk0zlBq8ziD1sRlb1GqZlwcRLb38aZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getSubDocPic?from=netease_h&size=10&offset=@&fn=4&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639599&sign=JIfO0JDD%2Bn9%2BAUDPwiCVNSwML5QPD%2BO1KSZcsmDfw2948ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/local/dynamic?from=6YOR5bee&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639679&sign=fibH0nYFS5ZqfhTkz%2Fctkn1b%2B%2B7UaCWuMhwPOm2XAxN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=10&offset=@&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639724&sign=uklrBnfDnFoSS86%2B44xw0tzktOhz8ek4D2b6Uh0bXk148ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/dynamic?from=T1348648756099&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639780&sign=PqlXEtC2KZaOX7vOO17uHuo4duhmWIxQqoQ4rBKRsQh48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D",'http://c.m.163.com/dlist/article/dynamic?from=T1348649580692&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639824&sign=BENvYqDl9cYKiJh2irUV5%2Biue8PV%2FKHdFs3tQWGzBqd48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348650593803&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639994&sign=L2rYDnEjMRXqgyoBwjDOU9%2FuAlHKEvkGbCcbOw0egKp48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/recommend/getChanListNews?channel=T1419316284722&size=10&offset=@&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640349&sign=kuB1wmMK3BIofo29zp1u%2FCelBxwQVclBPY2jLDS6PfV48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1473054348939&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640251&sign=TxI1npNtFDs5QSgpQr%2FOTwXPVB%2FvuqHD5Vj7E5Ul5t948ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348648141035&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640432&sign=LeTem6ZlcSys0TMWqSD%2FkavFP%2BW7CKnHNX3zs%2B6m3l548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348654151579&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640614&sign=Ey6%2F0Qyd7pxjaaWUoZLQYriGwqX0xzmATqe6CpZ0C2x48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1414389941036&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640649&sign=DXY4efOR3JOAgU6ePvFftxYD41PHsjGxZdWGM5quV0x48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348649145984&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480641094&sign=m32ovzEGXTpUeq0kQ%2BXNMNXg9B6bGu2D0vfF3xrFwjF48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D']);