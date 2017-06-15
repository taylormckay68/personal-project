angular.module('personal-project', ['ui.router', 'angular-stripe', 'AngularGM'])
.config(function($stateProvider, $urlRouterProvider, stripeProvider) {

    
    
    stripeProvider.setPublishableKey('pk_test_3lJ1tey4i8EkKrNeZdIL8REE');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './app/views/home.html',
            controller: 'mapCtrl'
        })
        .state('congrats', {
            url: '/congrats',
            templateUrl: './app/views/congrats.html',
        })
        .state('payments', {
            url: '/payments',
            templateUrl: './app/views/payments.html',
            controller: 'mainCtrl'
        })
        .state('contact', {
            url: '/contactus',
            templateUrl: './app/views/contact.html',
            controller: 'mainCtrl'
        })
        

});