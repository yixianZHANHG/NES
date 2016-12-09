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