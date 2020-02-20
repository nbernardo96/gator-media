//Articles service used for articles REST endpoint
angular.module('mean.articles').factory("Articles", ['$resource', function($resource) {
    'use strict';
    return $resource('articles/:articleId', {
        articleId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);