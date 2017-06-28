angular.module('personal-project').service('mailService', function($http) {

    this.checkWorking = (info) => {
        return $http({
            url: '/api/sendrequest',
            method: 'POST',
            data: info
        })
    }
    this.submitMessage = (contactMessage) => {
        return $http({
            url: '/api/sendMessage',
            method: 'POST',
            data: contactMessage
        })
    }
    
})