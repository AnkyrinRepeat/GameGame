angular.module('gamegame.friends', [
  'gamegame.services',
  'ui.bootstrap'
  ])

.controller('FriendsController', function($scope, $state, Steam){
  $scope.clientId = 0;
  $scope.friends = [];
  $scope.savedFriends = []
  $scope.games = [];
  $scope.state = '';

  $scope.findUser = function(steamid) {
    Steam.getFriends(steamid)
    .then(function(data){
      var friends = data.data.friendslist.friends;
      _.each(friends, function(steamid){
        Steam.findName(steamid).then(function(data){
          data.data.response.players[0].style = 'blue'
          $scope.friends.push(data.data.response.players[0])
        })
      })

      $scope.friends;
      Steam.getGames(steamid)
      .then(function(data){
        var list = data.data.response.games
        .filter(
          function(element, index, array){
            return element.playtime_forever>60;
          }
        )

        list.forEach(function(val, index, arr){
          $scope.games.push(val.name)
        })
      })
    })
    $scope.state = 'friends';
  }

  $scope.findGames = function() {
    var steamids = $scope.savedFriends

    for (var i = 0; i < steamids.length; i++) {
      Steam.getGames(steamids[i])
      .then(function(data){
        var list = data.data.response.games
        .filter(
          function(element, index, array){
            return element.playtime_forever>60;
          }
        )
        console.log(list)
        list = _.map(list, function(obj){
          return obj.name
        })
        $scope.games = _.intersection($scope.games, list)
      })
      $scope.friends = [];
      $scope.state = 'games'
    }
  }

  $scope.toggleFriend = function(steamid) {
    var index = $scope.savedFriends.indexOf(steamid)
    index === -1
    ? $scope.savedFriends.push(steamid)
    : $scope.savedFriends.splice(index, 1)
    console.log($scope.savedFriends)
  }

  $scope.toggle = function(friend){
    if (friend.style==="red") {
      friend.style="blue"
    } else {
      friend.style="red"
    }
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
