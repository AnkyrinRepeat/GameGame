angular.module('gamegame.friends', ['gamegame.services'])

.controller('FriendsController', function($scope, $state, Steam){
  $scope.clientId = 0;
  $scope.friends;
  $scope.savedFriends = []
  $scope.games = [];

  $scope.findUser = function(steamid) {
    Steam.getFriends(steamid)
    .then(function(data){
      var friends = data.data.friendslist.friends;
      _.each(friends, Steam.findName()
      $scope.friends = data.data.friendslist.friends;
      Steam.getGames(steamid)
      .then(function(data){
        var list = data.data.response.games
        // .filter(
        //   function(element, index, array){
        //     return element.playtime_forever>60;
        //   }
        // )
        list.forEach(function(val, index, arr){
          $scope.games.push(val.appid)
        })
      })
    })
  } 

  $scope.findGames = function() {
    var steamids = $scope.savedFriends

    for (var i = 0; i < steamids.length; i++) {
      Steam.getGames(steamids[i])
      .then(function(data){
        var list = data.data.response.games
        // .filter(
        //   function(element, index, array){
        //     return element.playtime_forever>60;
        //   }
        // )
        list = _.map(list, function(obj){
          return obj.appid
        })
        console.log(list)
        $scope.games = _.intersection($scope.games, list)
      })
    }
  }

  $scope.toggleFriend = function(steamid) {
    var index = $scope.savedFriends.indexOf(steamid)
    index === -1
    ? $scope.savedFriends.push(steamid)
    : $scope.savedFriends.splice(index, 1)
    console.log($scope.savedFriends)
  }
})

.directive('toggleClass', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        element.toggleClass(attrs.toggleClass);
      });
    }
  };
});

console.log('Friends Loaded')
