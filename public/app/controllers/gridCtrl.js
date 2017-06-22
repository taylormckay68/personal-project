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
        enableFiltering: true,
    }
    $scope.gridOptionsPayments = {
        enableFiltering: true,
    }

    $scope.receivePatients = () => {
        adminService.getPatients().then((response) => {
            $scope.gridOptionsPatients.data = response.data;
        })
    }
    $scope.receivePatients();

    $scope.receivePayments = () => {
        adminService.getPayments().then((response) => {
            $scope.gridOptionsPayments.data = response.data;
        })
    }
    $scope.receivePayments();

    $scope.submitPatient = function (patient) {
        adminService.addPatient(patient).then((response) => {
            !response ? alert('not working') : $state.go('admin');
        })
    }

})