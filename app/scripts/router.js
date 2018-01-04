'use strict';
angular.module('testApp').config(router);

function router($routeProvider) {

  $routeProvider
    .when('/main', {
      templateUrl: 'components/main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'vm'
    })
    .when('/about', {
      templateUrl: 'components/about/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'vm'
    })
    .when('/contact', {
      templateUrl: 'components/contact/contact.html',
      controller: 'ContactCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/main'
    });

}