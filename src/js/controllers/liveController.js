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
}]).controller('liveController',['$scope','$ionicSlideBoxDelegate','$state','HttpFactory',function ($scope,$ionicSlideBoxDelegate,$state,HttpFactory) {
    // 轮播图
    $scope.news = {
        adsArray1:[]
    };
    $scope.pop = function (index) {


    };

    var url = "http://data.live.126.net/livechannel/classifylist.json";
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



        // 标题详情页面跳转
        $scope.GOSome = function (index) {
            var wh = $scope.itema[index].tid;
            $state.go('liveOne',{data:wh});
        }
    });

}]);