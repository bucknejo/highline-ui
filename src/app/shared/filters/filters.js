'use strict';

var highlineFilters = angular.module('highline-ui');

highlineFilters.filter('checkmark', function(){
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});

/*
 * blue - open to invite
 * green - invite accepted
 * yellow - invited
 * red - de-friended
 */

highlineFilters.filter('friendStatus', function() {
    return function(input) {
        return false;
    };
});

highlineFilters.filter('available', function() {
    return function(input) {
        return (input === 1) ? 'Public' : 'Private';
    };
});

highlineFilters.filter('yn', function() {
    return function(input) {
        return (input === 1) ? 'Yes' : 'No';
    };
});
