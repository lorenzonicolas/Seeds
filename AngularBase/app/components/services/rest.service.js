'use strict';

angular.module('testApp')
    .factory('Rest', Rest);

function Rest(Constants, $http, $q, StorageService) {

    var REQUEST_LOG_LIMIT = 50 * 1024;

    var _globalTimeout = 60 * 1000;
    var baseURL = '../../../../v1/rest-api/';

    var calls = {
        clientLog: 'client-log',
        exampleEndpoint: 'api/{0}/example'
    };

    var service = {
        getDocumentFromServer: getDocumentFromServer, 
        clientLog: clientLog,
        exampleEndpoint: exampleEndpoint
    };

    return service;

    function clientLog(data) {
        httpRequest({
            spinner: false,
            traceable: false,
            __jsonRequest: true,
            url: baseURL + calls.clientLog,
            method: 'POST',
            data: data,
            error: function () { }
        });
    }

    function exampleEndpoint(onSuccess){
        httpRequest({
            url: baseURL,
            method: 'GET',
            params: {
                // BrandName: brand,
                // Ssn: person.SSN,
                // Birthday: person.DOB,
                // StateName: address.State,
                // ZipCode: address.ZipCode,
                // LastName: person.LastName,
                // CaptchaText: captcha.Text,
                // Lang: lang
            },
            success: onSuccess
        });
    }
	
    function httpRequest(config) {
        var timeoutMs = isNaN(config.timeout) ? _globalTimeout : config.timeout;
        var hasTimedOut = false;
        var timeout = $q.defer();

        config.timeout = timeout.promise;
        config.spinner = config.spinner !== false ? true : false;

        setTimeout(function() {
            hasTimedOut = true;
            timeout.resolve();
        }, timeoutMs);

        if (!config.data) {
            config.data = {};
        }           

        config.headers = config.headers || {};
        // config.headers['TF-Channel'] = Constants.Channel.Web;

        // if (config.__authTokenRequired) {
        //     var token = StorageService.get(Constants.SK.Token);
        //     config.headers['TF-Auth-Token'] = token;
        // }

        if (config.__jsonRequest) {
            config.headers['Content-Type'] = 'application/json; charset=utf-8';
            config.transformRequest = function(data, headersGetter, status) {
                return JSON.stringify(data);
            };
        }

        var request = $http(config);

        request
            .then(function (response) {
                if (config.success) return config.success(response.data);

                return response;
            })
            .catch(function (response) {
                if (hasTimedOut) {
                    config.data.__hasTimedOut = true;
                }

                if(response.status === 401) {
                    return;
                }

                if (config.error) {
                    return config.error(response);
                }

                throw response;
            });

        return request;
    }

    function getDocumentFromServer(url, callback) {
        httpRequest({
            __authTokenRequired: false,
            __jsonRequest: false,
            url: Constants.Url.Enrollment + 'RetrieveDocument/' + url,
            method: 'GET',
            success: callback
        });
    }

    return service;
}