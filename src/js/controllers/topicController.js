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
}]).controller('topicController',['$scope','HttpFactory',function ($scope,HttpFactory) {
    // 预告
    var url ='http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-10.html';
    HttpFactory.getData(url).then(function (result) {
        // console.log(result);
        $scope.items = result.data.expertList;
        console.log($scope.items);
        // console.log( $scope.items[0].alias);
    });

}]);