/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$state','$ionicViewSwitcher',"$ionicLoading","$ionicScrollDelegate",'HttpFactory',function ($scope,$ionicPopup,$state,$ionicViewSwitcher,$ionicLoading,$ionicScrollDelegate,HttpFactory) {
    // 导航
    var urlb = "http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html";
    HttpFactory.getData(urlb).then(function (result) {
        $scope.numArry = result.tList;
        console.log(result);
    });
    $scope.ddSome = function (index) {
        var yxa = $scope.numArry[index].tid;
        var url = "http://c.m.163.com/dlist/article/dynamic?from="+yxa+"&offset=0&size=10&fn=2&passport=&devId=%2F3MuOc2%2Ftpr3BFTbGpkB3EkbdABijhZKb0YUM%2BIpk4QLD6gVVgPcP%2BV791ye9IA%2FIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=&lon=&version=17.2";
        HttpFactory.getData(url).then(function (result) {
            $scope.items = result[yxa];
            console.log($scope.items);
        });
    };
    // // 轮播图
    $scope.news = {
        newsArray:'',
        adsArray:[]
    };
    var url = "http://c.m.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10&fn=1&prog=LMA1&passport=&devId=eW7qcXmjWleAjCxp25EgTBBywawDoVwZiZ9SMikG4cGiOa69wsn%2FdeHaaNGRMr2hIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=DJEPdRawaRYCJZwF3SQobA%3D%3D&lon=7J7OmyytD8SqP0pSV1cJJA%3D%3D";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        $scope.news.adsArray = result.T1348647909107[0].ads;
    });
//上拉加载
        $scope.items = [];
         var index = 10;
        $scope.loadMore = function () {
            var urla = "http://c.m.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size="+index+"&fn=1&prog=LMA1&passport=&devId=eW7qcXmjWleAjCxp25EgTBBywawDoVwZiZ9SMikG4cGiOa69wsn%2FdeHaaNGRMr2hIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=DJEPdRawaRYCJZwF3SQobA%3D%3D&lon=7J7OmyytD8SqP0pSV1cJJA%3D%3D";
            index += 10;
            // console.log(urla);
            HttpFactory.getData(urla).then(function (result) {
                $scope.name = result.T1348647909107.splice(0,1);
                $scope.items = result.T1348647909107.concat($scope.items);
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        };

    $scope.doSome = function (index) {
        var zyx = $scope.items[index].id;
        $state.go('newCon',{data:zyx});
        $ionicViewSwitcher.nextDirection('forward');

    };


}]);