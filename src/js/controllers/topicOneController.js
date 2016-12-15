/**
 * Created by Administrator on 2016/12/14.
 */
angular.module('myApp.topicOne',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('topicOne',{
                url:'/topicOne',
                templateUrl:'topicOne.html',
                controller:'topicOneController',
                 params:{'data':null}

    });

}]).controller('topicOneController',['$scope','$stateParams','$sce','HttpFactory',function ($scope,$stateParams,$sce,HttpFactory) {

      // console.log($stateParams);
     var ull = $stateParams.data;
     var url = "http://c.m.163.com/newstopic/qa/"+ull+".html";
    var items = [];
    var imada = [];
  HttpFactory.getData(url).then(function (result) {
      $scope.item = result.data;
      $scope.items =  $scope.item.expert;
      // console.log($scope.item.expert);
      $scope.imada = $scope.items.relatedNews;
      console.log($scope.items.relatedNews);

  });
    $scope.changHight = function () {
        var car = document.querySelector('.topickKard')
        // console.log(car);
        if(car.style.height == '275px'){
            car.style.height = '100px';
        }else {
            car.style.height = '275px';
        }
    }

}]);