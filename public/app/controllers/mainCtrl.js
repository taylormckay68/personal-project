angular.module('personal-project').controller('mainCtrl', function ($scope, stripe, $http, $state, mailService, adminService, $modal, $log) {


  $scope.payment = {};

  $scope.hours = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"]

  // $scope.submitForm = function (info) {
  //   apptService.checkWorking(info).then(response => {
  //     !response ? alert('not working') : $state.go('home');
  //   })
  // }
  $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.openHours = ['8:30 am - 6:00 pm', '8:30 am - 12:00 pm', '8:30 am - 6:00 pm', '8:30 am - 6:00 pm', '8:30 am - 12:00 pm', 'Closed', 'Closed'];

  $scope.showSubServices = false;

  $scope.showServices = () => {
    $scope.showSubServices = !$scope.showSubServices;
  }
  $scope.showHideServices = () => {
    if ($scope.showSubServices) {
      $scope.showSubServices = !$scope.showSubServices;
    } else {
      $scope.showSubServices = false;
    }
  }


  $scope.showSuccessfulPayment = function ($modalInstance) {
    var modalInstanceThree = $modal.open({
      templateUrl: '../app/views/congrats.html',
    });
  }
  $scope.goToHome = function() {
    $state.go('home')
  }

  $scope.charge = function () {

    return stripe.card.createToken($scope.payment.card)
      .then(function (response) {
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
        })
      })
      .then(() => {
        return $http({
          method: 'POST',
          url: '/api/addPayment',
          data: {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            patientid: $scope.patientid,
            payment: $scope.mockPrice
          }
        })
      })
      .then(function (payment) {
        console.log('successfully submitted payment for $', payment);
        $scope.showSuccessfulPayment();
      })
      .catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
          alert(err.message)
        } else {
          console.log('Other error occurred, possibly with your API', err.message);
          alert(err.message)
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
        userForm: function () {
          return $scope.userForm;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log('selected item', selectedItem)

      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  var ModalInstanceCtrl = function ($modalInstance, userForm) {
    $scope.form = {}
    $scope.submitForm = function (info) {
      if ($scope.form.userForm.$valid) {
        mailService.checkWorking(info).then((response) => {
          $scope.info = {};
        })
        console.log('user form is in scope');
        $modalInstance.close('closed');
      } else {
        console.log('userform is not in scope');
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

  $scope.showSuccess = function ($modalInstance) {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    var modalInstanceTwo = $modal.open({
      templateUrl: '../app/views/appointment-response.html',
    });

    $scope.close = function ($modalInstance) {
      $modalInstance.dismiss('cancel');
    };
  }
  $scope.submitContactUs = function (contactMessage) {
    mailService.submitMessage(contactMessage).then((response) => {
      $scope.contactMessage = {};
    })
  }

})