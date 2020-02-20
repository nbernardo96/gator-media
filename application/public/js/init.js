angular.element(document).ready(function() {
    'use strict';
    //Fixing facebook bug with redirect
    if (window.location.hash === "#_=_") {
        window.location.hash = "#!";
    }

    //Then init the app
    angular.bootstrap(document, ['mean']);
});