/**
 * Created by Administrator on 2016/12/7.
 */
angular.module('myApp.newCon',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('newCon',{
        url:'/newCon',
        templateUrl:'newCon.html',
        controller:'newConController',
        params:{'data':null}
    });
}]).controller('newConController',['$scope','$stateParams','$sce','HttpFactory',function ($scope,$stateParams,$sce,HttpFactory) {
   $scope.newCon = {
       detail:'',
       body:''
   };
   var docid = $stateParams.data;
    console.log($stateParams.data);
    var url = 'http://c.m.163.com/nc/article/'+ docid +'/full.html';
    // console.log(url);
    HttpFactory.getData(url).then(function (result) {
        $scope.newCon.detail  = result[docid];
        // console.log($scope.newCon.detail);

        var newsObj = $scope.newCon.detail;
        if (newsObj.img && newsObj.img.length){
            for (var i = 0;i< newsObj.img.length;i++){
                var imgWidth = newsObj.img[i].pixel.split('*')[0];
                if (imgWidth > document.body.offsetWidth){
                    imgWidth = document.body.offsetWidth;
                }
                var imgStyle = 'width:' + imgWidth + 'px';
                var imgStr = "<img" + " style='" + imgStyle + "'" + " src=" + newsObj.img[i].src + ">";
                newsObj.body = newsObj.body.replace(newsObj.img[i].ref,imgStr);
                // console.log(newsObj.body);
            }
        };

    });

}]);