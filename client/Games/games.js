angular.module('gamegame.games',['gamegame.services'])

.controller('GamesController', function($scope, $state, Steam){
  // Steam.fetchFriends().then(function(data){
  //   $scope.friends = data;
  // })
  $scope.friends = Steam.friends;
  console.log($scope.friends) 
})

console.log('Games loaded')