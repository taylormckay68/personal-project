'use strict';

angular.module('personal-project', ['ui.router', 'angular-stripe', 'ui.grid', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, stripeProvider, $uiViewScrollProvider) {

    $uiViewScrollProvider.useAnchorScroll();

    stripeProvider.setPublishableKey('pk_test_3lJ1tey4i8EkKrNeZdIL8REE');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: './app/views/home.html',
        controller: 'mainCtrl'
    }).state('congrats', {
        url: '/congrats',
        templateUrl: './app/views/congrats.html'
    }).state('payments', {
        url: '/payments',
        templateUrl: './app/views/payments.html',
        controller: 'mainCtrl'
    }).state('appointment', {
        url: '/appointment',
        templateUrl: './app/views/appointment.html',
        controller: 'mainCtrl'
    }).state('services', {
        url: '/services',
        templateUrl: './app/views/services.html',
        controller: 'mainCtrl'
    }).state('contact', {
        url: '/contactus',
        templateUrl: './app/views/contact.html',
        controller: 'mainCtrl'
    }).state('admin', {
        url: '/admin',
        templateUrl: './app/views/admin.html',
        controller: 'gridCtrl',
        resolve: {
            authenticate: function authenticate() {} //event.preventDefault. $state.go: ''

        }
    }).state('addPatient', {
        url: '/admin/addpatient',
        templateUrl: './app/views/add-patient.html',
        controller: 'gridCtrl'
    }).state('neck-shoulder', {
        url: '/services/neck-shoulder',
        templateUrl: './app/views/neck-shoulder.html',
        controller: 'mainCtrl'
    }).state('pregnancy-care', {
        url: '/services/pregnancy',
        templateUrl: './app/views/pregnancy.html',
        controller: 'mainCtrl'
    }).state('massage-therapy', {
        url: '/services/massage',
        templateUrl: './app/views/massage-therapy.html',
        controller: 'mainCtrl'
    }).state('back-pain', {
        url: '/services/back-pain',
        templateUrl: './app/views/back-pain.html',
        controller: 'mainCtrl'
    }).state('sciatica-management', {
        url: '/services/sciatica-management',
        templateUrl: './app/views/sciatica-management.html',
        controller: 'mainCtrl'
    }).state('scoliosis', {
        url: '/services/scoliosis',
        templateUrl: './app/views/scoliosis.html',
        controller: 'mainCtrl'
    }).state('tmj', {
        url: '/services/tmj',
        templateUrl: './app/views/tmj.html',
        controller: 'mainCtrl'
    }).state('headaches', {
        url: '/services/headaches',
        templateUrl: './app/views/headaches.html',
        controller: 'mainCtrl'
    });
});
'use strict';

angular.module('personal-project').controller('gridCtrl', function ($scope, adminService, $state) {

    // function getUser() {
    //     userService.getUser().then(function (user) {
    //         if (user) $scope.user = user.username;
    //         else $scope.user = 'NOT LOGGED IN';
    //     })
    // }

    // getUser();

    // $scope.loginLocal = function (username, password) {
    //     console.log('Logging in with', username, password);
    //     userService.loginLocal({
    //             username: username,
    //             password: password
    //         })
    //         .then(function (res) {
    //             getUser();
    //         })
    // }

    // $scope.logout = userService.logout;


    $scope.gridOptionsPatients = {
        enableFiltering: true
    };
    $scope.gridOptionsPayments = {
        enableFiltering: true
    };
    $scope.gridOptionsTotals = {
        enableFiltering: true
    };

    $scope.receivePatients = function () {
        adminService.getPatients().then(function (response) {
            $scope.gridOptionsPatients.data = response.data;
        });
    };
    $scope.receivePatients();

    $scope.receivePayments = function () {
        adminService.getPayments().then(function (response) {
            $scope.gridOptionsPayments.data = response.data;
        });
    };
    $scope.receivePayments();

    $scope.receiveTotals = function () {
        adminService.getTotal().then(function (response) {
            $scope.gridOptionsTotals.data = response.data;
        });
    };
    $scope.receiveTotals();

    $scope.submitPatient = function (patient) {
        adminService.addPatient(patient).then(function (response) {
            !response ? alert('not working') : $state.go('admin');
        });
    };
});
'use strict';

angular.module('personal-project').controller('mainCtrl', function ($scope, stripe, $http, $state, mailService, adminService, $modal, $log) {

  $scope.payment = {};

  $scope.hours = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"];

  // $scope.submitForm = function (info) {
  //   apptService.checkWorking(info).then(response => {
  //     !response ? alert('not working') : $state.go('home');
  //   })
  // }
  $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.openHours = ['8:30 am - 6:00 pm', '8:30 am - 12:00 pm', '8:30 am - 6:00 pm', '8:30 am - 6:00 pm', '8:30 am - 12:00 pm', 'Closed', 'Closed'];

  $scope.showSubServices = false;

  $scope.showServices = function () {
    $scope.showSubServices = !$scope.showSubServices;
  };
  $scope.showHideServices = function () {
    if ($scope.showSubServices) {
      $scope.showSubServices = !$scope.showSubServices;
    } else {
      $scope.showSubServices = false;
    }
  };

  $scope.showSuccessfulPayment = function ($modalInstance) {
    var modalInstanceThree = $modal.open({
      templateUrl: '../app/views/congrats.html'
    });
  };
  $scope.goToHome = function () {
    $state.go('home');
  };

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
    }).then(function () {
      return $http({
        method: 'POST',
        url: '/api/addPayment',
        data: {
          firstname: $scope.firstname,
          lastname: $scope.lastname,
          patientid: $scope.patientid,
          payment: $scope.mockPrice
        }
      });
    }).then(function (payment) {
      console.log('successfully submitted payment for $', payment);
      $scope.showSuccessfulPayment();
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

  $scope.showForm = function () {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    var modalInstance = $modal.open({
      templateUrl: '../app/views/appointment-request.html',
      controller: ModalInstanceCtrl,
      scope: $scope,
      resolve: {
        userForm: function userForm() {
          return $scope.userForm;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log('selected item', selectedItem);

      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  var ModalInstanceCtrl = function ModalInstanceCtrl($modalInstance, userForm) {
    $scope.form = {};
    $scope.submitForm = function (info) {
      if ($scope.form.userForm.$valid) {
        mailService.checkWorking(info).then(function (response) {
          $scope.info = {};
        });
        console.log('user form is in scope');
        $modalInstance.close('closed');
      } else {
        console.log('userform is not in scope');
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  $scope.showSuccess = function ($modalInstance) {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    var modalInstanceTwo = $modal.open({
      templateUrl: '../app/views/appointment-response.html'
    });

    $scope.close = function ($modalInstance) {
      $modalInstance.dismiss('cancel');
    };
  };
  $scope.submitContactUs = function (contactMessage) {
    mailService.submitMessage(contactMessage).then(function (response) {
      $scope.contactMessage = {};
    });
  };
});
'use strict';

angular.module('personal-project').service('adminService', function ($http) {

    this.getPatients = function () {
        return $http({
            url: '/api/getPatients',
            method: 'GET'
        });
    };
    this.getPayments = function () {
        return $http({
            url: '/api/getPayments',
            method: 'GET'
        });
    };
    this.getTotal = function () {
        return $http({
            url: '/api/getTotal',
            method: 'GET'
        });
    };
    this.addPatient = function (patient) {
        return $http({
            url: '/api/addPatient',
            method: 'POST',
            data: patient
        });
    };
    // this.addPayment = () => {
    //     return $http({
    //         url: '/api/addPayment',
    //         method: 'POST',
    //         data: {
    //             firstname: $scope.firstname,
    //             lastname: $scope.lastname,
    //             patientid: $scope.patientid,
    //             payment: $scope.mockPrice
    //         }
    //     })
    // }
});
'use strict';

angular.module('personal-project').service('mailService', function ($http) {

    this.checkWorking = function (info) {
        return $http({
            url: '/api/sendrequest',
            method: 'POST',
            data: info
        });
    };
    this.submitMessage = function (contactMessage) {
        return $http({
            url: '/api/sendMessage',
            method: 'POST',
            data: contactMessage
        });
    };
});
'use strict';

angular.module('personal-project').service('userService', function ($http) {

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});