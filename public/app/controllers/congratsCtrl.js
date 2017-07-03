angular.module('personal-project').controller('congratsCtrl', function ($scope, stripe, $http, $state, mailService, adminService, $modal, $log) {
    $scope.test = 'working';

    $scope.showForm = function () {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    var modalInstance = $modal.open({
      templateUrl: '../app/views/appointment-request.html',
      controller: ModalInstanceCtrlThree,
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
});