// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-google-gapi'])

app.run(['$ionicPlatform', 'GAuth', 'GApi', 'GData', '$state', '$rootScope',
  function($ionicPlatform, GAuth, GApi, GData, $state, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  //Let's start the google auth servies
  function(GAuth, GApi, GData, $state, $rootScope) {
 
        $rootScope.gdata = GData;
 
        var CLIENT = 'yourGoogleAuthAPIKey';
        var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';
 
        GApi.load('myApiName','v1',BASE);
        GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/) 
 
        GAuth.setClient(CLIENT);
        GAuth.setScope("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly"); // default scope is only https://www.googleapis.com/auth/userinfo.email 
 
    // load the auth api so that it doesn't have to be loaded asynchronously 
    // when the user clicks the 'login' button.  
    // That would lead to popup blockers blocking the auth window 
    GAuth.load();
    
    // or just call checkAuth, which in turn does load the oauth api. 
    // if you do that, GAuth.load(); is unnecessary 
        GAuth.checkAuth().then(
            function (user) {
                console.log(user.name + 'is login')
                $state.go('webapp.home'); // an example of action if it's possible to 
                        // authenticate user at startup of the application 
            },
            function() {
                $state.go('login');       // an example of action if it's impossible to 
                      // authenticate user at startup of the application 
            }
        );
    }
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
  })
  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.calendar', {
    url: '/calendar',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
