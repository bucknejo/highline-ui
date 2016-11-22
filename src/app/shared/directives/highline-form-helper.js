'use strict';

angular.module('highline-ui').directive('highlineFormHelper', ['$animate', function($animate) {
    return {
        require: '^form',
        scope: {},
        link: function(scope, element, attrs, form){

            if (angular.isDefined(attrs.eventName)) {
                scope.$on(attrs.eventName, function() {
                    var elements = element[0].querySelectorAll('.form-control');
                    angular.forEach(elements, function(e) {
                        $animate.addClass(e, 'form-success-flash').then(function() {
                            $animate.removeClass(e, 'form-success-flash');
                        });
                    });
                });
            }

        }
    };
}]);
