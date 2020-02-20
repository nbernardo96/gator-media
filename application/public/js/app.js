angular.module('mean', ['ngCookies', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.auth','satellizer','angularFblogin'])
.config(function ($authProvider) {

    'use strict';
    $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri:  'http://localhost:3000/auth/twitter/callback',
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    });

    $authProvider.google({
        clientId: ' 787193207141-bt93ok7d01m1mgk2lls6n1kgv83rjl82.apps.googleusercontent.com', // google client id
        url: '/auth/google',
        redirectUri: 'http://localhost:3000/auth/google/callback'
    });

});

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.auth', []);