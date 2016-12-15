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
    var url = "http://c.m.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10&fn=1&prog=LMA1&passport=&devId=eW7qcXmjWleAjCxp25EgTBBywawDoVwZiZ9SMikG4cGiOa69wsn%2FdeHaaNGRMr2hIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=DJEPdRawaRYCJZwF3SQobA%3D%3D&lon=7J7OmyytD8SqP0pSV1cJJA%3D%3D";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        $scope.news.adsArray = result.T1348647909107[0].ads;
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
                // console.log(result)
                $scope.items = $scope.items.concat(result.tid);
                // console.log($scope.items);
                // console.log(result.tid);
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
            $scope.items = result.tid;
            // console.log(11111);
            // console.log(result.tid);
            $scope.isShowInfinite = true;
            indexd = 10;
            // console.log( $scope.items);
        }).finally(function() {
            // 停止广播ion-refresher
            $scope.$broadcast('scroll.refreshComplete');
        });

    };
    $scope.scrollMainToTop = function() {
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    };
    $scope.doSome = function (index) {
        var zyx = $scope.items[index].docid;
        console.log($scope.items[index]);
        $state.go('newCon',{data:zyx});
        // $ionicViewSwitcher.nextDirection('forward');

    }
}]);