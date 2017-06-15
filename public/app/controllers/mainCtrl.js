angular.module('personal-project').controller('mainCtrl', function($scope, stripe, $http, $state, apptService) {
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

    $scope.hours = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

    $scope.submitForm = function(info) {
        apptService.checkWorking(info).then(response => {
            console.log(response)
        })
    }
    $scope.submitForm();
    console.log('hello');

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
    .then(function(payment) {
      console.log('successfully submitted payment for $', payment);
      $state.go('congrats');
    })
    .catch(function (err) {
       if (err.type && /^Stripe/.test(err.type)) {
         console.log('Stripe error: ', err.message);
         alert(err.message)
       }
       else {
         console.log('Other error occurred, possibly with your API', err.message);
         alert(err.message)
       }
     });
 };
})