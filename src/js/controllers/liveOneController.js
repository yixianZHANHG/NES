/**
 * Created by Administrator on 2016/12/22.
 */
angular.module('myApp.liveOne',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('liveOne',{
        url:'/liveOne',
        templateUrl:'liveOne.html',
        controller:'liveOneController',
        params:{'data':null}

    });

}]).controller('liveOneController',['$scope','$stateParams','$sce','HttpFactory',function ($scope,$stateParams,$sce,HttpFactory) {
    var urla = $stateParams.data;
    console.log(urla);
    var url ='http://c.m.163.com/nc/subscribe/list/'+urla+'/live/0-20.html';
    console.log(url);
    HttpFactory.getData(url).then(function (result) {
        // console.log(result);
        $scope.items = result.subscribe_info;
        console.log(result.subscribe_info);
    })

}]);