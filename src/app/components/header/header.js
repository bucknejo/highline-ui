'use strict';

function HighlineHeaderController() {

    console.log('in HighlineHeaderController');

}

angular.module('highline-ui').component('highlineHeader', {
    templateUrl: 'app/components/header/header.tpl.html',
    controller: HighlineHeaderController,
    bindings: {}
});