/**
 * Created by qingyun on 16/11/30.
 */
//js程序入口
<<<<<<< HEAD
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.news','myApp.live','myApp.topic','myApp.personal','myApp.my','myApp.newCon','myApp.lunb']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
=======
angular.module('cftApp',['ionic','cftApp.urls','cftApp.httpFactory','cftApp.slideBox','cftApp.tabs','cftApp.news','cftApp.live','cftApp.topic','cftApp.personal','cftApp.news1','cftApp.news2']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
>>>>>>> 12e160d2a60b78cc5deb7788c7a4cbdb105df7c8
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    });
    $stateProvider.state("newsDetail",{
        url:"/newsDetail",
        templateUrl:"newsDetail.html"
    });
    // $stateProvider.state("tabs.newsDetail",{
    //     url:"/newsDetail",
    //     views:{
    //         'tabs-news':{
    //             templateUrl:"newsDetail.html"
    //         }
    //     }
    // });
    //意外跳转
    $urlRouterProvider.otherwise('tabs/news');
}]);