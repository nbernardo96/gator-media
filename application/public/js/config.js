//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        .state('home',{
            url : '/',
            controller : 'IndexController',
            templateUrl: 'views/index.html'
        })
        .state('SignIn',{
            url : '/signin',
            templateUrl: 'views/users/signin.html'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
        })
        .state('articles',{
            url : '/article',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createArticle',{
            url : '/article/create',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editArticles',{
            url : '/article/{articleId}/edit',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewArticle',{
            url : '/article/{articleId}',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
        .state('404',{
            templateUrl: 'views/404.html'
        })
        .state('about-ahmad',{
            url : '/about-ahmad',
            templateUrl: 'views/about-team/about-ahmad.html'
        })
        .state('about-felipe',{
            url : '/about-felipe',
            templateUrl: 'views/about-team/about-felipe.html'
        })
        .state('about-pak',{
            url : '/about-pak',
            templateUrl: 'views/about-team/about-pak.html'
        })
        .state('about-viral',{
            url : '/about-viral',
            templateUrl: 'views/about-team/about-viral.html'
        })
        .state('about-nicole',{
            url : '/about-nicole',
            templateUrl: 'views/about-team/about-nicole.html'
        })
        .state('about-olivia',{
            url : '/about-olivia',
            templateUrl: 'views/about-team/about-olivia.html'
        })
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);