angular.module('starter.controllers', ['starter.services'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('MyWords', function ($scope, $stateParams) {
    $scope.itemsW = [];
    currentStart = 0
    $scope.addItems = function () {
      for (var i = currentStart; i < currentStart + 20; i++) {
        $scope.itemsW.push({
          word: "W " + i + " Lista: " + $stateParams.listId,
          word1: "W2 " + i + " Lista: " + $stateParams.listId
        });
      }

      currentStart += 20
    }

    $scope.addItems()

    $scope.onItemDelete = function (item) {
      $scope.itemsW.splice($scope.itemsW.indexOf(item), 1);
    };
  })

  .controller('MyList', function ($scope) {
    $scope.items = []
    currentStart = 0
    $scope.addItems = function () {
      for (var i = currentStart; i < currentStart + 20; i++) {
        $scope.items.push({
          itm: "Item " + i,
          id: i
        });
      }

      currentStart += 20
    }

    $scope.addItems()

    $scope.onItemDelete = function (item) {
      $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.edit = function(item) {
      location.href='#/app/crea/'+item.id;
    };
  });
