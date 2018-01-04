'use strict';

/**
 * @ngdoc function
 * @name testApp.component:Navigator
 * @description
 * # NavigatorCtrl
 * Controller of the testApp navigator component
 */
angular.module('testApp')
	.component('navigator', {
		templateUrl: './components/navigator/navigator.html',
		bindings:{},
		controller: NavigatorCtrl,
		controllerAs: 'vm'	
	});

function NavigatorCtrl () {
	
};