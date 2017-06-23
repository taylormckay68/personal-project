angular.module('personal-project')
.service('userService', function($http) {
  

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }
})