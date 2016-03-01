/* Created by Gil on 23/08/15 */
(function()
{
    'use strict';

    angular
        .module('App')
        .config(
        [
            '$stateProvider',
            '$urlRouterProvider',
            '$httpProvider',
            appRouter
        ]);

    function appRouter($stateProvider, $urlRouterProvider, $httpProvider)
    {
        // Allow Cross Origin using $http
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.useXDomain = true;

        // Default route
        $urlRouterProvider.otherwise('/body/homePage');

        // Application route:
        $stateProvider

            // **************************** //
            // **** Application Layout **** //
            // **************************** //

            .state('body',
            {
                url: "/body",

                views:
                {
                    // Application container (the only child view of index.html)
                    '':
                    {
                        templateUrl: "Views/Body.html",
                        controller: "MainController as mainCtrl"
                    },
                    // Header (nested in body view)
                    'header@body':
                    {
                        templateUrl: "Views/Header.html",
                        controller: "MainController as mainCtrl"
                    },
                    // Footer (nested in body view)
                    'footer@body':
                    {
                        templateUrl: "Views/Footer.html",
                        controller: "MainController as mainCtrl"
                    }
                }
            })

            // **************************** //
            // **** Application Pages ***** //
            // **************************** //

            // *** Home Page *** //
            .state('body.homePage',
            {
                url: "/homePage",
                templateUrl: "Views/Pages/HomePage.html",
                controller: "HomePageController as homePageCtrl"
            })

            // *** About *** //
            .state('body.about',
            {
                url: "/about",
                templateUrl: "Views/Pages/About.html",
                controller: "AboutController as aboutCtrl"
            })

        ;
    }

})();