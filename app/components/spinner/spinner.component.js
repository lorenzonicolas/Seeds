'use strict';

angular.module('testApp')
	.component('spinner', {
		templateUrl: './components/spinner/spinner.html',
		bindings: {
	    	loading: '<'
		}
	});