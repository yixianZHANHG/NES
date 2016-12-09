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
        newsArray1:'',
        adsArray1:[]
    };
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray1 = result;
        $scope.news.adsArray1 = result.T1348647909107[0].ads;
    });

    // 预告
   var url ='http://data.live.126.net/livechannel/previewlist.json';
    HttpFactory.getData(url).then(function (result) {
        console.log(result)
        $scope.imas = result.future;
        $scope.itema = result.sublives;
        $scope.imad = result.live_review;
        $scope.imada = result.live_review[0].sourceinfo;
        console.log($scope.imada.timg);
        console.log($scope.imada.tname);



    });
}]);