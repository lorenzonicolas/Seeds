'use strict';

angular.module('testApp').config(HTTPProvider);

function HTTPProvider($httpProvider) {
    $httpProvider.interceptors.push(httpInterceptor);
}

function httpInterceptor($q, $rootScope, $injector, Constants) {
    $rootScope.showSpinner = false;
    $rootScope.http = null;
    return {
        'request': function (config) {
            if (config.spinner) {
                $rootScope.showSpinner = true;
            }

            return config || $q.when(config);
        },

        'requestError': function (rejection) {
            $rootScope.http = $rootScope.http || $injector.get('$http');
            if ($rootScope.http.pendingRequests.length < 1) {
                $rootScope.showSpinner = false;
            }

            return $q.reject(rejection);
        },

        'response': function (response) {
            $rootScope.http = $rootScope.http || $injector.get('$http');
            if ($rootScope.http.pendingRequests.length < 1) {
                $rootScope.showSpinner = false;
            }
            return response || $q.when(response);
        },
        
        'responseError': function (rejection) {
            $rootScope.http = $rootScope.http || $injector.get('$http');
            if ($rootScope.http.pendingRequests.length < 1) {
                $rootScope.showSpinner = false;
            }

            return $q.reject(rejection);
        }
    };
}