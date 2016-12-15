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
        // console.log(result.sublives);
        $scope.imad = result.live_review;
        console.log($scope.imad);

    });


}]);