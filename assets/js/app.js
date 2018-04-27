angular.module('sailsapp', []);
angular.module('sailsapp').controller('baseCtrl', ['$scope','$http', function($scope, $http){

  // $http.get('/emoji').then(function(response){ 
  //   $scope.emojis = response.data;
  // })
  // .catch(function(err){
  //   console.log(err)
  // })

  io.socket.get('/notes', function(data){
    $scope.notes = data;
    $scope.$apply();
  })

  $scope._findItem = function(element, index, array){

  }

  io.socket.on('notes', function(event){
    console.log(event);
    switch (event.verb){
      case 'created':
        $scope.notes.push(event.data);
        $scope.$apply();
        break;
      case 'destroyed':
        var deleted = $scope.notes.findIndex(function(element, index, array){
          if(element.id === event.previous.id) return element;
        });
        $scope.notes.splice(deleted, 1);
        $scope.$apply()
        break;
    }
  })

}]);