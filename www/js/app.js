// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'pascalprecht.translate'])

  .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $translateProvider.translations('en', {
      submit: "Enter",
      goodbye_message: "Goodbye"
    });
    $translateProvider.translations('en', {
      submit: "Invio",
      goodbye_message: "Goodbye"
    });
    $translateProvider.translations('es', {
      submit: "Hola",
      goodbye_message: "Adios"
    });
    $translateProvider.preferredLanguage("en");
    $translateProvider.fallbackLanguage("en");
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (typeof navigator.globalization !== "undefined") {
        navigator.globalization.getPreferredLanguage(function (language) {
          $translate.use((language.value).split("-")[0]).then(function (data) {
            console.log("SUCCESS -> " + data);
          }, function (error) {
            console.log("ERROR -> " + error);
          });
        }, null);
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })

      .state('app.sessions', {
        url: "/sessions",
        views: {
          'menuContent': {
            templateUrl: "templates/sessions.html",
            controller: 'SessionsCtrl'
          }
        }
      })

      .state('app.session', {
        url: "/sessions/:sessionId",
        views: {
          'menuContent': {
            templateUrl: "templates/session.html",
            controller: 'SessionCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/sessions');

  });
