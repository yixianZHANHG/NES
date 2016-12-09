/**
 * Created by Administrator on 2016/12/9.
 */
angular.module('myApp.lunb', []).service('LuboService',[ function ($http) {
    this.getClassify = function () {
        return [
            { name: '热门'},
            { name: '分类'},
            { name: '订阅'}
        ]
    };
}])