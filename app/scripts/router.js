'use strict';
angular.module('testApp').config(router);

function router($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'components/main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'components/about/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .otherwise({
      redirectTo: '/'
    });

}