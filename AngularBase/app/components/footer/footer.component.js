'use strict';

/**
 * @ngdoc function
 * @name testApp.component:Navigator
 * @description
 * # NavigatorCtrl
 * Controller of the testApp navigator component
 */
angular.module('testApp')
	.component('footer', {
		templateUrl: './components/footer/footer.html',
		bindings:{},
		controller: FooterCtrl,
		controllerAs: 'vm'	
	});

function FooterCtrl () {
	
};