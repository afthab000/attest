var app = angular.module('mainApp', ['ui.router', 'ngMessages','ngAnimate', 'ngSanitize', 'ui.bootstrap','angular-bootstrap-select']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: "pages/login.html",
        controller: 'loginCtrl'
     })
        .state('userHome', {
        url: '/user-home',
        templateUrl: "pages/user_home.html",
        controller: 'userHomeCtrl'
     })
        .state('adminHome', {
        url: '/admin-home',
        templateUrl: "pages/admin_home.html",
        controller: 'adminHomeCtrl'
     })
        .state('addBatch', {
        url: '/add-batch',
        templateUrl: "pages/add_batch.html",
        controller: 'addBatchCtrl'
     })
     .state('batchDetail', {
        url: '/batch-detail',
        templateUrl: "pages/batch_detail.html",
        controller: 'batchDetailCtrl'
     })
     .state('signup', {
        url: '/signup',
        templateUrl: "pages/signup.html",
        controller: 'signupCtrl'
     })
    console.log("Inside app Controller")
}]);

