angular.module('personal-project').service('adminService', function($http) {

    this.getPatients = () => {
        return $http({
            url: '/api/getPatients',
            method: 'GET'
        });
    }
    this.getPayments = () => {
        return $http({
            url: '/api/getPayments',
            method: 'GET'
        })
    }
    this.addPatient = (patient) => {
        return $http({
            url: '/api/addPatient',
            method: 'POST',
            data: patient
        })
    }
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
})