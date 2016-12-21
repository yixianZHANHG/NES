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
    if(car.style.height == '67px'){
        car.style.height = '210px';
    }else {
        car.style.height = '67px';
    }
}

}]);