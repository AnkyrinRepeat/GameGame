angular.module('gamegame.friends', ['gamegame.services'])

.controller('FriendsController', function($scope, Steam){
  $scope.clientId = 0;
  $scope.clientFriends;

  $scope.findUser = function(steamid) {
    Steam.getFriends(steamid)
    .then(function(data){
      console.log(data)
      // $scope.clientFriends = data.friendsList.friends
    }) 
  }
})

console.log('Friends Loaded')
