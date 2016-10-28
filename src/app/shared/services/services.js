'use strict';

angular.module('highline-ui')
    .service('HighlineHttpService', ['$http', '$q', 'HIGHLINE', function($http, $q, HIGHLINE) {

        var server = HIGHLINE.SERVER;

        return  {
            serve: function(request) {

                var deferred = $q.defer();
                request.url = server + request.url;

                $http(request).then(function success(response) {
                    deferred.resolve(response);
                }, function error(error, status, headers, response) {
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

