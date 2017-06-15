angular.module('personal-project').service('apptService', function($http) {

    this.checkWorking = (info) => {
        return $http({
            url: '/api/test',
            method: 'POST',
            data: info
        })
    }
    
})