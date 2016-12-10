/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp.personal',['ionic-datepicker']).config(['$stateProvider','ionicDatePickerProvider',function ($stateProvider,ionicDatePickerProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'personal.html',
                controller:'personalController'
            }
        }
    });
    var datePickerObj = {
        inputDate: new Date(),
        titleLabel: 'Select a Date',
        setLabel: 'Set',
        todayLabel: 'Today',
        closeLabel: 'Close',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
}]).controller('personalController',['$scope','ionicDatePicker','$ionicBackdrop','$timeout',function ($scope,ionicDatePicker,$ionicBackdrop, $timeout) {
    var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        },
        disabledDates: [            //Optional
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ]
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
    };

    // var a =1 ;
    $scope.changColor = function (event) {
        //
        // $ionicBackdrop.retain();
        // $timeout(function() {
        //     $ionicBackdrop.release();
        // }, 1000);
        var a = document.querySelectorAll('html');
        console.log(a);
        a[0].style.backgroundColor = 'gray'


        // a++;
        // console.log(event.path);
        // console.log(event.path[13].style);
        // 4 通过样式表
        // console.log(a);
        // var coloe = document.getElementById("aa");
        // if(a%2==0){
        //     coloe.style.backgroundColor = 'gray';
        //     console.log(33333333333333);
        //
        // }else {
        //     coloe.style.backgroundColor = "antiquewhite";
        //     console.log(4444444444444);
        // }
    }
}]);