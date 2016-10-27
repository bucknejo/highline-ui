'use strict';

function HighlineFooterController() {

    console.log('in HighlineFooterController');

}

angular.module('highline-ui').component('highlineFooter', {
    templateUrl: 'app/components/footer/footer.tpl.html',
    controller: HighlineFooterController,
    bindings: {}
});

