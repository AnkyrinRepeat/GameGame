angular.module('gamegame.games', ['gamegame.services'])

.controller('GamesController', function($scope, $state, Steam){
  $scope.games = [];
  // Steam.fetchFriends().then(function(data){
  //   $scope.friends = data;
  // })
  $scope.games = Steam.fetchGames();

  console.log('On Games Controller')
})

console.log('Games loaded')