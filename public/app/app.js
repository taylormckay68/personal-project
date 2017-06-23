angular.module('personal-project', ['ui.router', 'angular-stripe', 'ui.grid', 'ui.bootstrap'])
.config(function($stateProvider, $urlRouterProvider, stripeProvider) {

    
    
    stripeProvider.setPublishableKey('pk_test_3lJ1tey4i8EkKrNeZdIL8REE');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './app/views/home.html',
            controller: 'mainCtrl'
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
        .state('appointment', {
            url: '/appointment',
            templateUrl: './app/views/appointment.html',
            controller: 'mainCtrl'
        })
        .state('services', {
            url: '/services',
            templateUrl: './app/views/services.html',
            controller: 'mainCtrl'
        })
        .state('contact', {
            url: '/contactus',
            templateUrl: './app/views/contact.html',
            controller: 'mainCtrl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: './app/views/admin.html',
            controller: 'gridCtrl',
            resolve: {
                authenticate: function() {}//event.preventDefault. $state.go: ''
                
            }
        })
        .state('addPatient', {
            url: '/admin/addpatient',
            templateUrl: './app/views/add-patient.html',
            controller: 'gridCtrl'
        })
        
        

});