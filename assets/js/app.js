angular.module('sailsapp', []);
angular.module('sailsapp').controller('baseCtrl', ['$scope','$http', function($scope, $http){

  // $http.get('/emoji').then(function(response){ 
  //   $scope.emojis = response.data;
  // })
  // .catch(function(err){
  //   console.log(err)
  // })

  io.socket.get('/emoji', function(data){
    $scope.emojis = data;
    $scope.$apply();
  })

  $scope._findItem = function(element, index, array){

  }

  io.socket.on('emoji', function(event){
    switch (event.verb){
      case 'created':
        $scope.emojis.push(event.data);
        $scope.$apply();
        break;
      case 'destroyed':
        var deleted = $scope.emojis.findIndex(function(element, index, array){
          if(element.id === event.previous.id) return element;
        });
        $scope.emojis.splice(deleted, 1);
        $scope.$apply()
        break;
    }
  })

}]);