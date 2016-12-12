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
}]).controller('topicController',['$scope','$ionicLoading','HttpFactory',function ($scope,$ionicLoading,HttpFactory) {
    // 预告
    var index =0;
    var url ='http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-'+index+'.html';

        // 上拉加载
    $scope.items = [];
    $scope.loadMore = function() {
        // $scope.isShowInfinite = true;
      if(index<=20){

          index +=10;
          var url = 'http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-'+index+'.html';
          HttpFactory.getData(url).then(function (result) {

              console.log(result.data);
              //一共就20个  没了  不用concat 恩
              $scope.items = result.data.expertList;
              $scope.$broadcast('scroll.infiniteScrollComplete');
          });
      }else {
         index=0;
          console.log("到底啦!!");
      }

    };

    // 下拉刷新
    $scope.doRefresh = function () {
        $scope.isShowInfinite = true;
        HttpFactory.getData(url).then(function (result) {
            $scope.items = result.data.expertList;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

}]);