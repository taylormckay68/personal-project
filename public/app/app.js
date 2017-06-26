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
        .state('neck-shoulder', {
            url: '/services/neck-shoulder',
            templateUrl: './app/views/neck-shoulder.html',
            controller: 'mainCtrl'
        })
        .state('pregnancy-care', {
            url: '/services/pregnancy',
            templateUrl: './app/views/pregnancy.html',
            controller: 'mainCtrl'
        })
        .state('massage-therapy', {
            url: '/services/massage',
            templateUrl: './app/views/massage-therapy.html',
            controller: 'mainCtrl'
        })
        .state('back-pain', {
            url: '/services/back-pain',
            templateUrl: './app/views/back-pain.html',
            controller: 'mainCtrl'
        })
        .state('sciatica-management', {
            url: '/services/sciatica-management',
            templateUrl: './app/views/sciatica-management.html',
            controller: 'mainCtrl'
        })
        .state('scoliosis', {
            url: '/services/scoliosis',
            templateUrl: './app/views/scoliosis.html',
            controller: 'mainCtrl'
        })
        .state('tmj', {
            url: '/services/tmj',
            templateUrl: './app/views/tmj.html',
            controller: 'mainCtrl'
        })
        .state('headaches', {
            url: '/services/headaches',
            templateUrl: './app/views/headaches.html',
            controller: 'mainCtrl'
        })
        

});