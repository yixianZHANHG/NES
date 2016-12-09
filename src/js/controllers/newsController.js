/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html'
            }
        }
    });
<<<<<<< HEAD
}]).controller('newsController',['$scope','$ionicPopup','$state','$ionicViewSwitcher','HttpFactory',"$ionicLoading","$ionicScrollDelegate",function ($scope,$ionicPopup,$state,$ionicViewSwitcher,HttpFactory,$ionicLoading,$ionicScrollDelegate) {
    // 导航
    var url = "http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html";
    HttpFactory.getData(url).then(function (result) {
        $scope.numArry = result;
        // console.log($scope.numArry[0]);
    })

    // 轮播图
    $scope.news = {
        newsArray:'',
        adsArray:[]
    };
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        $scope.news.adsArray = result[0].ads;
    });

    // 上拉加载
    $scope.items = [];
    var indexd = 10;
    $scope.isShowInfinite = true;
    $scope.loadMore = function() {
        indexd += 5;
        var url ='http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset='+indexd+'&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
        console.log(indexd);
        if (indexd <= 40){
            HttpFactory.getData(url).then(function (result) {
                $scope.items = $scope.items.concat(result);
                console.log(2222222);
                // console.log( $scope.items);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }else {
                $scope.isShowInfinite = false;
                console.log("到底啦!!");
        }
    };
    // 下拉刷新
    $scope.items = [];
    $scope.doRefresh = function() {
     var url =  'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&offset=0&size=10';
        HttpFactory.getData(url).then(function (result) {
            $scope.items = result;
            console.log(11111);
            $scope.isShowInfinite = true;
            indexd = 10;
            // console.log( $scope.items);
        }).finally(function() {
            // 停止广播ion-refresher
            $scope.$broadcast('scroll.refreshComplete');
=======
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','$sce','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,$sce,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray:[],
        adsArray:[],
        index:0,
        isFirst:true
    };

    $scope.goToDetailView = function () {
        // $state.go('newsDetail');
    };

    $scope.$on('updateNews0',function (evt,msg) {
        $scope.news.adsArray = [];
        $scope.news.newsArray = [];
        $scope.news.index = 0;
        console.log('view0,' + msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore(UrlArray[msg]);
    });

    $scope.loadMore = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
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
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = $scope.news.newsArray.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if ($scope.news.isFirst){
                for(var i = 3;i < UrlArray.length;i++){
                    HttpFactory.getData(UrlArray[i]);
                }
            }

>>>>>>> 12e160d2a60b78cc5deb7788c7a4cbdb105df7c8
        });

    };
    $scope.scrollMainToTop = function() {
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    };
<<<<<<< HEAD
    $scope.doSome = function (index) {
        var zyx = $scope.items[index].docid;
        console.log(zyx);
        $state.go('newCon',{data:zyx});
        $ionicViewSwitcher.nextDirection('forward');
=======
    $scope.doRefresh = function (str) {
        console.log(11111);
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = result;
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.refreshComplete');

        });
>>>>>>> 12e160d2a60b78cc5deb7788c7a4cbdb105df7c8
    }
}]);