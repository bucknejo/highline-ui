'use strict';

var highlineServices = angular.module('highline-ui');

highlineServices.service('HighlineHttpService', ['$http', '$q', 'HIGHLINE', function($http, $q, HIGHLINE) {

    var server = HIGHLINE.SERVER;

    return  {
        serve: function(request) {

            var deferred = $q.defer();
            request.url = server + request.url;

            $http(request).then(function success(response) {
                deferred.resolve(response);
            }, function (error, status, headers, response) {
                deferred.reject({
                    message: error,
                    status: status,
                    headers: headers,
                    response: response
                });
            });

            return deferred.promise;
        }
    };

}]);

highlineServices.factory('HighlineAuthentication', ['$cookies', function($cookies){

    var authentication = {};

    var _authenticated = false;
    var _user_id = -1;

    var _authCookie = {
        authenticated: _authenticated,
        user_id: _user_id
    };

    var _authCookieName = "highlineAuthenticationCookie";

    authentication.setAuthenticated = function(authenticated) {
        _authenticated = authenticated;
    };

    authentication.isAuthenticated = function() {
        return _authenticated;
    };

    authentication.setUserId = function(user_id) {
        _user_id = user_id;
    };

    authentication.getUserId = function() {
        return _user_id;
    };

    authentication.setAuthenticationCookie = function() {
        _authCookie.authenticated = authentication.isAuthenticated();
        _authCookie.user_id = authentication.getUserId();
        $cookies.put(_authCookieName, JSON.stringify(_authCookie));
    };

    authentication.getAuthenticationCookie = function() {
        return $cookies.get(_authCookieName);
    };

    authentication.removeAuthenticationCookie = function() {
        $cookies.remove(_authCookieName);
    };

    return authentication;

}]);

highlineServices.factory('Address', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/address/:id/:location_id', {}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {method: 'PUT'},
        retrieve: {method: 'GET', params: {
            location_id: '@location_id'
        }, isArray: true}
    });
}]);

highlineServices.factory('Friend', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/friend/:id', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('Gruppe', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/gruppe/:id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {method: 'PUT'}
    });
}]);

highlineServices.factory('GruppeMember', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/gruppemember/:id/:gruppe_id/:user_id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        retrieve: {method: 'GET', params: {
            gruppe_id:'@gruppe_id',
            user_id:'@user_id'
        }},
        update: {method: 'PUT'},
        remove: {method: 'DELETE', params: {
            gruppe_id:'@gruppe_id',
            user_id:'@user_id'
        }}

    });
}]);

highlineServices.factory('Location', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/location/:id/:state', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        retrieve: {method: 'GET', params: {
            state: '@state'
        }, isArray: true}
    });
}]);

highlineServices.factory('Member', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/member/:id', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('Photo', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/photo/get', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('Ride', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER + 'service/ride/:id/:user_id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        retrieve: {method: 'GET', params: {
            user_id: '@user_id'
        }, isArray: true},

        update: {method: 'PUT'},
    });
}]);

highlineServices.factory('User', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER  + 'service/user/:id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {method: 'PUT'}
    });
}]);


highlineServices.factory('Sandbox', ['$resource', function($resource){
    console.log('in Sandbox factory');
    return $resource('/highline/service/ride/get', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);
