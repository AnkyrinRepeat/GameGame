console.log('App loaded')

angular.module('gamegame', [
  'gamegame.services',
  'gamegame.friends',
  'gamegame.games',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/friends')

  $stateProvider
    .state('friends', {
      templateUrl: 'friends/friends.html',
      url: '/friends',
      controller: 'FriendsController'
    })  
    .state('games', {
      templateUrl: 'games/games.html',
      url: '/games',
      controller: 'GamesController'
  })  
})

