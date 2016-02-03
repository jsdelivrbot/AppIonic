// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var start = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'pascalprecht.translate']);
var localDB = new PouchDB('db-glossary-local', {adapter: 'websql'});
var remoteDB = new PouchDB('http://localhost:5984/db-remote');


start.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
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
    localDB.sync(remoteDB, {live: true});
  });
})

start.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/',
    suffix: '.json'
  })
  $translateProvider.registerAvailableLanguageKeys(['en', 'it'], {
    'en': 'en', 'en_GB': 'en', 'en_US': 'en',
    'de': 'de', 'de_DE': 'de', 'de_CH': 'de',
    'it': 'it', 'it_IT': 'it',
    '*': 'en'
  })

  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");
  $translateProvider.determinePreferredLanguage();


  $translateProvider.useSanitizeValueStrategy('escapeParameters');
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'WelcomeCtrl'
    })

    .state('app.modalita', {
      url: '/modalita',
      views: {
        'menuContent': {
          templateUrl: 'templates/modalita.html'
        }
      }
    })

    .state('app.inizia', {
      url: '/inizia',
      views: {
        'menuContent': {
          templateUrl: 'templates/inizia.html',
          controller: 'MyList'
        }
      }
    })

    .state('app.crea', {
      url: '/crea/:listId',
      views: {
        'menuContent': {
          templateUrl: 'templates/crea.html',
          controller: 'AppWords'
        }
      }
    })

    .state('app.gioca', {
      url: '/gioca/:listId',
      views: {
        'menuContent': {
          templateUrl: 'templates/gioca.html',
          controller: 'AppGioca'
        }
      }
    })

    .state('app.DBTest', {
      url: '/DBTest',
      views: {
        'menuContent': {
          templateUrl: 'templates/DBTest.html'
        }
      }
    })

    .state('app.impostazioni', {
      url: "/impostazioni",
      views: {
        'menuContent': {
          templateUrl: "templates/impostazioni.html"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inizia');

});
