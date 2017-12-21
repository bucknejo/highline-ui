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

highlineFilters.filter('bt', function() {
    return function(input) {
        var suspension = '';
        switch (input) {
            case 'FS':
                suspension = 'Full Suspension';
                break;
            case 'HT':
                suspension = 'Hard Tail';
                break;
            default:
                break;
        }
        return suspension;
    };
});

highlineFilters.filter('activityType', function() {
    return function(input) {
        var icon = '<i class="fa fa-question" aria-hidden="true"></i>';

        if (input.indexOf('ADD') !== -1) {
            icon = '<i class="fa fa-plus" aria-hidden="true"></i>';
        }

        if (input.indexOf('REMOVE') !== -1) {
            icon = '<i class="fa fa-minus" aria-hidden="true"></i>';
        }

        if (input.indexOf('FIXED') !== -1) {
            icon = '<i class="fa fa-wrench" aria-hidden="true"></i>';
        }

        if (input.indexOf('BROKE') !== -1) {
            icon = '<i class="fa fa-chain-broken" aria-hidden="true"></i>';
        }
        return icon;
    };
});

highlineFilters.filter('checkedItems', function() {
    return function(items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function(item){
            if (!item.done || showComplete) {
                resultArr.push(item);
            }
        });
        return resultArr;
    };
});
