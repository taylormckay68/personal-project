'use strict';

angular.module('personal-project', ['ui.router', 'angular-stripe', 'AngularGM']).config(function ($stateProvider, $urlRouterProvider, stripeProvider) {

    stripeProvider.setPublishableKey('pk_test_3lJ1tey4i8EkKrNeZdIL8REE');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: './app/views/home.html',
        controller: 'mapCtrl'
    }).state('congrats', {
        url: '/congrats',
        templateUrl: './app/views/congrats.html'
    }).state('payments', {
        url: '/payments',
        templateUrl: './app/views/payments.html',
        controller: 'mainCtrl'
    }).state('contact', {
        url: '/contactus',
        templateUrl: './app/views/contact.html',
        controller: 'mainCtrl'
    });
});
'use strict';

angular.module('personal-project').controller('mainCtrl', function ($scope, stripe, $http, $state, apptService) {
  $scope.test = 'working';

  $scope.payment = {};

  // $scope.options = {
  //   map: {
  //     center: new google.maps.LatLng(48, -121),
  //     zoom: 6,
  //     mapTypeId: google.maps.MapTypeId.TERRAIN
  //   },
  //   volcanoes: {
  //     icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
  //   },
  //   selected: {
  //     icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
  //   }
  // };

  $scope.info = {};

  $scope.hours = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  $scope.submitForm = function (info) {
    apptService.checkWorking(info).then(function (response) {
      console.log(response);
    });
  };
  $scope.submitForm();
  console.log('hello');

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card).then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;

      return $http({
        method: 'POST',
        url: '/api/payment',
        data: {
          amount: $scope.mockPrice,
          payment: payment
        }
      });
    }).then(function (payment) {
      console.log('successfully submitted payment for $', payment);
      $state.go('congrats');
    }).catch(function (err) {
      if (err.type && /^Stripe/.test(err.type)) {
        console.log('Stripe error: ', err.message);
        alert(err.message);
      } else {
        console.log('Other error occurred, possibly with your API', err.message);
        alert(err.message);
      }
    });
  };
});
'use strict';

angular.module('personal-project').controller('mapCtrl', function ($scope) {
    $scope.options = {
        map: {
            center: new google.maps.LatLng(40.5631372, -111.9415556),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    };
    $scope.marker = {
        "id": 0,
        name: 'Southwest Chiropractic',
        "location": {
            lat: 40.5631372,
            lng: -111.9415556
        }
    };

    $scope.blah = "working it";
});
'use strict';

angular.module('personal-project').service('apptService', function ($http) {

    this.checkWorking = function (info) {
        return $http({
            url: '/api/test',
            method: 'POST',
            data: info
        });
    };
});