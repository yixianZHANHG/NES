/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.tabs',[]).controller('tabsController',['$scope','$ionicSlideBoxDelegate',function ($scope,$ionicSlideBoxDelegate) {
$scope.items = ["热门",'分类','订阅'];
    $scope.dd =function (event,index) {
        // 先要取到所以得span标签
        var allSpan = angular.element(event.currentTarget).parent().children();
        console.log(allSpan);
        var item = angular.element(event.target);
        console.log(item);
        allSpan.removeClass('active');
        item.addClass('active');
        $ionicSlideBoxDelegate.slide(index);
    };
    $scope.item = ["问吧",'话题','关注'];
}]);