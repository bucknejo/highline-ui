'use strict';

var highlineServices = angular.module('highline-ui-services', ['ui.router', 'ui.bootstrap', 'ngMessages', 'ngResource', 'ngCookies', 'ngAnimate']);

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
    constants.OPTIONS.ACCOUNT = {};
    constants.OPTIONS.GROUP = {};
    constants.OPTIONS.RIDE = {};

    constants.OPTIONS.STATE = [];
    constants.OPTIONS.COUNTRY = [];

    constants.OPTIONS.EQUIPMENT.TYPES = [];
    constants.OPTIONS.EQUIPMENT.STYLES = [];
    constants.OPTIONS.EQUIPMENT.MAKES = [];
    constants.OPTIONS.EQUIPMENT.YEARS = [];

    constants.OPTIONS.ACCOUNT.SKILLS = [];
    constants.OPTIONS.ACCOUNT.STYLES = [];
    constants.OPTIONS.ACCOUNT.ACCESS = [];
    constants.OPTIONS.ACCOUNT.GENDERS = [];

    constants.OPTIONS.GROUP.TYPES = [];
    constants.OPTIONS.GROUP.YNS = [];

    constants.OPTIONS.RIDE.STATII = [];
    constants.OPTIONS.RIDE.YNS = [];
    constants.OPTIONS.RIDE.TEMPOS =[];
    constants.OPTIONS.RIDE.ACCESS = [];

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

    constants.OPTIONS.ACCOUNT.SKILLS.push({value: 'Beginner', text: 'Beginner', selected: false});
    constants.OPTIONS.ACCOUNT.SKILLS.push({value: 'Intermediate', text: 'Intermediate', selected: false});
    constants.OPTIONS.ACCOUNT.SKILLS.push( {value: 'Advanced', text: 'Advanced', selected: false});
    constants.OPTIONS.ACCOUNT.SKILLS.push({value: 'Expert', text: 'Expert', selected: false});

    constants.OPTIONS.ACCOUNT.STYLES.push({value: 'Mellow', text: 'Mellow', selected: false});
    constants.OPTIONS.ACCOUNT.STYLES.push({value: 'Steady', text: 'Steady', selected: false});
    constants.OPTIONS.ACCOUNT.STYLES.push({value: 'Moderate', text: 'Moderate', selected: false});
    constants.OPTIONS.ACCOUNT.STYLES.push({value: 'Agressive', text: 'Agressive', selected: false});
    constants.OPTIONS.ACCOUNT.STYLES.push({value: 'Race', text: 'Race', selected: false});

    constants.OPTIONS.ACCOUNT.ACCESS.push({value: 0, text: 'Private', selected: false});
    constants.OPTIONS.ACCOUNT.ACCESS.push({value: 1, text: 'Public', selected: false});

    constants.OPTIONS.ACCOUNT.GENDERS.push({value: 'M', text: 'Male', selected: false});
    constants.OPTIONS.ACCOUNT.GENDERS.push({value: 'F', text: 'Female', selected: false});
    constants.OPTIONS.ACCOUNT.GENDERS.push({value: 'A', text: 'Alien', selected: false});

    constants.OPTIONS.GROUP.TYPES.push({value: 0, text: 'Private', selected: false});
    constants.OPTIONS.GROUP.TYPES.push({value: 1, text: 'Public', selected: false});

    constants.OPTIONS.GROUP.YNS.push({value: 0, text: 'No', selected: false});
    constants.OPTIONS.GROUP.YNS.push({value: 1, text: 'Yes', selected: false});

    constants.OPTIONS.RIDE.STATII.push({value: 'ON TIME', text: 'ON TIME', selected: false});
    constants.OPTIONS.RIDE.STATII.push({value: 'EARLY', text: 'EARLY', selected: false});
    constants.OPTIONS.RIDE.STATII.push({value: 'DELAYED', text: 'DELAYED', selected: false});
    constants.OPTIONS.RIDE.STATII.push({value: 'CANCELLED', text: 'CANCELLED', selected: false});

    constants.OPTIONS.RIDE.YNS.push({value: 0, text: 'No', selected: false});
    constants.OPTIONS.RIDE.YNS.push({value: 1, text: 'Yes', selected: false});

    constants.OPTIONS.RIDE.TEMPOS.push({value: 'Slow', text: 'Slow', selected: false});
    constants.OPTIONS.RIDE.TEMPOS.push({value: 'Medium', text: 'Medium', selected: false});
    constants.OPTIONS.RIDE.TEMPOS.push({value: 'Fast', text: 'Fast', selected: false});
    constants.OPTIONS.RIDE.TEMPOS.push({value: 'Race', text: 'Race', selected: false});

    constants.OPTIONS.RIDE.ACCESS.push({value: 0, text: 'Private', selected: false});
    constants.OPTIONS.RIDE.ACCESS.push({value: 1, text: 'Public', selected: false});

    return constants;

}]);

highlineServices.factory('HighlineConfirmation', ['$uibModal', '$log', function ($uibModal, $log) {

    var confirmation = {};

    var _title = 'Modal Title';
    var _body = 'Modal Body';
    var _animation = false;
    var _size = 'sm';

    confirmation.setTitle = function(title) {
        _title = title;
    };

    confirmation.getTitle = function() {
        return _title;
    };

    confirmation.setBody = function(body) {
        _body = body;
    };

    confirmation.getBody = function () {
        return _body;
    };

    confirmation.setAnimation = function(animation) {
        _animation = animation;
    };

    confirmation.getAnimation = function() {
        return _animation;
    };

    confirmation.setSize = function(size) {
        _size = size;
    };

    confirmation.getSize = function() {
        return _size;
    };

    confirmation.open = function(settings) {

        var _settings = settings || {};

        var modalInstance = $uibModal.open({
            animation: this.getAnimation(),
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/shared/directives/templates/highline-confirm.tpl.html',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

                $scope.title = _settings.title || confirmation.getTitle();
                $scope.body = _settings.body || confirmation.getBody();

                $scope.ok = function() {
                    $uibModalInstance.close();
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss();
                };

            }],
            controllerAs: '$ctrl',
            size: _settings.size || confirmation.getSize(),
            resolve: {
                /*
                items: function () {
                    return $ctrl.items;
                }
                */
            }
        });

        modalInstance.result.then(function () {
            $log.info('Modal ok\'d at: ' + new Date());
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    return confirmation;

}]);

highlineServices.factory('HighlineAuthentication', ['$cookies', function($cookies){

    var debug = true;
    var authentication = {};

    var _authenticated = (debug) ? true : false;
    var _user_id = (debug) ? 1 : -1;

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
        update: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/address/update/:id/:location_id'
        },
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
        update: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/equipment/update/:id'
        },
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
        update: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/gruppe/update/:id'
        },
        delete: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/gruppe/delete/:id'
        }
    });
}]);

highlineServices.factory('GruppeMember', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE + 'service/gruppemember/:id/:gruppe_id/:user_id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        retrieve: {method: 'GET', params: {
            gruppe_id:'@gruppe_id',
            user_id:'@user_id'
        }},
        update: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/gruppemember/update/:id/:gruppe_id/:user_id'
        },
        remove: {
            method: 'POST',
            params: {
                id: '@id',
                gruppe_id:'@gruppe_id',
                user_id:'@user_id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/gruppemember/remove/:id/:gruppe_id/:user_id'
        }

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
        update: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/ride/update/:id/:user_id'
        }

    });
}]);

highlineServices.factory('User', ['$resource', 'HIGHLINE', function($resource, HIGHLINE){
    return $resource(HIGHLINE.SERVER.RESOURCE  + 'service/user/:id', {id: '@id'}, {
        query: {method: 'GET', params: {}, isArray: true},
        update: {
            method: 'POST',
            params: {
                id: '@id'
            },
            url: HIGHLINE.SERVER.RESOURCE  + 'service/user/update/:id'
        }
    });
}]);


highlineServices.factory('Sandbox', ['$resource', function($resource){
    console.log('in Sandbox factory');
    return $resource('/highline/service/ride/get', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);

highlineServices.factory('TestSandbox', [function(){
    var testSandbox = {
        bucket1: 0,
        bucket2: 1
    };

    testSandbox.function1 = function(arg1, arg2) {
        return arg1 + arg2;
    };

    testSandbox.function2 = function(arg1, arg2) {
        return arg1 * arg2;
    };

    testSandbox.setBucket1 = function(value) {
        testSandbox.bucket1 = value;
    };

    testSandbox.getBucket1 = function() {
        return testSandbox.bucket1;
    };

    testSandbox.setBucket2 = function(value) {
        testSandbox.bucket2 = value;
    };

    testSandbox.getBucket2 = function() {
        return testSandbox.bucket2;
    };

    testSandbox.callFakeFunction = function() {
        return 0;
    };

    testSandbox.throwsError = function() {
        return 1;
    };

    testSandbox.trackingCalls = function(a, b) {
        return a + b;
    };

    return testSandbox;

}]);
