angular.module('personal-project').controller('mapCtrl', function($scope) {
    $scope.options = {
      map: {
        center: new google.maps.LatLng(40.5631372, -111.9415556),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    }
    $scope.marker = {
        "id": 0,
        name: 'Southwest Chiropractic',
        "location": { 
            lat: 40.5631372,
            lng: -111.9415556
        }
    }
    


    $scope.blah = "working it"
})