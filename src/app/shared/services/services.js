'use strict';

var highlineServices = angular.module('highline-ui');

highlineServices.service('HighlineHttpService', ['$http', '$q', 'HIGHLINE', function($http, $q, HIGHLINE) {

    var server = HIGHLINE.SERVER.RESOURCE;

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

highlineServices.factory('HighlineApplicationConstants', [function(){

    var constants = {};

    constants.OPTIONS = {};
    constants.OPTIONS.EQUIPMENT = {};

    constants.OPTIONS.STATE = [];
    constants.OPTIONS.COUNTRY = [];

    constants.OPTIONS.EQUIPMENT.TYPES = [];
    constants.OPTIONS.EQUIPMENT.STYLES = [];
    constants.OPTIONS.EQUIPMENT.MAKES = [];
    constants.OPTIONS.EQUIPMENT.YEARS = [];

    constants.OPTIONS.STATE.push({value: 'AL', text: 'Alabama', selected: false});
    constants.OPTIONS.STATE.push({value: 'AK', text: 'Alaska', selected: false});
    constants.OPTIONS.STATE.push({value: 'AZ', text: 'Arizona', selected: false});
    constants.OPTIONS.STATE.push({value: 'AR', text: 'Arkansas', selected: false});
    constants.OPTIONS.STATE.push({value: 'CA', text: 'California', selected: false});
    constants.OPTIONS.STATE.push({value: 'CO', text: 'Colorado', selected: false});
    constants.OPTIONS.STATE.push({value: 'CT', text: 'Connecticut', selected: false});
    constants.OPTIONS.STATE.push({value: 'DC', text: 'District of Columbia', selected: false});
    constants.OPTIONS.STATE.push({value: 'DE', text: 'Delaware', selected: false});
    constants.OPTIONS.STATE.push({value: 'FL', text: 'Floria', selected: false});
    constants.OPTIONS.STATE.push({value: 'GA', text: 'Georgia', selected: false});
    constants.OPTIONS.STATE.push({value: 'HI', text: 'Hawaii', selected: false});
    constants.OPTIONS.STATE.push({value: 'ID', text: 'Idaho', selected: false});
    constants.OPTIONS.STATE.push({value: 'IL', text: 'Illinois', selected: false});
    constants.OPTIONS.STATE.push({value: 'IN', text: 'Indiana', selected: false});
    constants.OPTIONS.STATE.push({value: 'IA', text: 'Iowa', selected: false});
    constants.OPTIONS.STATE.push({value: 'KA', text: 'Kansas', selected: false});
    constants.OPTIONS.STATE.push({value: 'KY', text: 'Kentucky', selected: false});
    constants.OPTIONS.STATE.push({value: 'LA', text: 'Louisiana', selected: false});
    constants.OPTIONS.STATE.push({value: 'ME', text: 'Maine', selected: false});
    constants.OPTIONS.STATE.push({value: 'MD', text: 'Maryland', selected: false});
    constants.OPTIONS.STATE.push({value: 'MA', text: 'Massachusetts', selected: false});
    constants.OPTIONS.STATE.push({value: 'MI', text: 'Michigan', selected: false});
    constants.OPTIONS.STATE.push({value: 'MN', text: 'Minnesota', selected: false});
    constants.OPTIONS.STATE.push({value: 'MS', text: 'Mississippi', selected: false});
    constants.OPTIONS.STATE.push({value: 'MO', text: 'Missouri', selected: false});
    constants.OPTIONS.STATE.push({value: 'MT', text: 'Montana', selected: false});
    constants.OPTIONS.STATE.push({value: 'NE', text: 'Nebraska', selected: false});
    constants.OPTIONS.STATE.push({value: 'NV', text: 'Nevada', selected: false});
    constants.OPTIONS.STATE.push({value: 'NH', text: 'New Hampshire', selected: false});
    constants.OPTIONS.STATE.push({value: 'NJ', text: 'New Jersey', selected: false});
    constants.OPTIONS.STATE.push({value: 'NM', text: 'New Mexico', selected: false});
    constants.OPTIONS.STATE.push({value: 'NY', text: 'New York', selected: false});
    constants.OPTIONS.STATE.push({value: 'NC', text: 'North Carolina', selected: false});
    constants.OPTIONS.STATE.push({value: 'ND', text: 'North Dakota', selected: false});
    constants.OPTIONS.STATE.push({value: 'OH', text: 'Ohio', selected: false});
    constants.OPTIONS.STATE.push({value: 'OK', text: 'Oklahoma', selected: false});
    constants.OPTIONS.STATE.push({value: 'OR', text: 'Oregon', selected: false});
    constants.OPTIONS.STATE.push({value: 'PA', text: 'Pennsylvania', selected: false});
    constants.OPTIONS.STATE.push({value: 'RI', text: 'Rhode Island', selected: false});
    constants.OPTIONS.STATE.push({value: 'SC', text: 'South Carolina', selected: false});
    constants.OPTIONS.STATE.push({value: 'SD', text: 'South Dakota', selected: false});
    constants.OPTIONS.STATE.push({value: 'TN', text: 'Tennessee', selected: false});
    constants.OPTIONS.STATE.push({value: 'TX', text: 'Texas', selected: false});
    constants.OPTIONS.STATE.push({value: 'UT', text: 'Utah', selected: false});
    constants.OPTIONS.STATE.push({value: 'VT', text: 'Vermont', selected: false});
    constants.OPTIONS.STATE.push({value: 'VA', text: 'Virginia', selected: false});
    constants.OPTIONS.STATE.push({value: 'WA', text: 'Washington', selected: false});
    constants.OPTIONS.STATE.push({value: 'WV', text: 'West Virginia', selected: false});
    constants.OPTIONS.STATE.push({value: 'WI', text: 'Wisconsin', selected: false});
    constants.OPTIONS.STATE.push({value: 'WY', text: 'Wyoming', selected: false});

    constants.OPTIONS.EQUIPMENT.TYPES.push({value: 'BIKE', text: 'Bike', selected: false});
    constants.OPTIONS.EQUIPMENT.TYPES.push({value: 'SKI', text: 'Ski', selected: false});

    constants.OPTIONS.EQUIPMENT.STYLES.push({value: 'HT', text: 'Hard Tail', selected: false});
    constants.OPTIONS.EQUIPMENT.STYLES.push({value: 'FS', text: 'Full Suspension', selected: false});

    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Cannondale', text: 'Cannondale', selected: false});
    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Specialized', text: 'Specialized', selected: false});
    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Santa Cruz', text: 'Santa Cruz', selected: false});
    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Pivot', text: 'Pivot', selected: false});
    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Trek', text: 'Trek', selected: false});
    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Giant', text: 'Giant', selected: false});
    constants.OPTIONS.EQUIPMENT.MAKES.push({value: 'Yeti', text: 'Yeti', selected: false});

    var year = 1980;
    for (var i=0; i < 50; i++) {
        var option = {value: year.toString(), text: year.toString(), selected: false};
        constants.OPTIONS.EQUIPMENT.YEARS.push(option);
        year++;
    }

    return constants;

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
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/address/:id/:location_id', {}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {method: 'PUT'},
        retrieve: {method: 'GET', params: {
            location_id: '@location_id'
        }, isArray: true},
        getByUser: {method: 'GET', params: {
            id: '@id',
            user_id: '@user_id'
        }, url: HIGHLINE.SERVER.RESOURCE + 'service/address/id/:id/user/:user_id'}
    });
}]);

highlineServices.factory('Equipment', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/equipment', {}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {method: 'PUT'},
        getByUser: {method: 'GET', params: {
            id: '@id',
            user_id: '@user_id'
        }, url: HIGHLINE.SERVER.RESOURCE + 'service/equipment/id/:id/user/:user_id'}
    });
}]);

highlineServices.factory('Friend', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/friend/:id', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('Gruppe', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/gruppe/:id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {method: 'PUT'}
    });
}]);

highlineServices.factory('GruppeMember', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/gruppemember/:id/:gruppe_id/:user_id', {id: '@id'}, {
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
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/location/:id/:state', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        retrieve: {method: 'GET', params: {
            state: '@state'
        }, isArray: true}
    });
}]);

highlineServices.factory('Member', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/member/:id', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('Photo', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/photo/get', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('Ride', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/ride/:id/:user_id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        retrieve: {method: 'GET', params: {
            user_id: '@user_id'
        }, isArray: true},

        update: {method: 'PUT'},
    });
}]);

highlineServices.factory('User', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE  + 'service/user/:id', {id: '@id'}, {
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
