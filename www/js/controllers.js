angular.module('starter.controllers', [])
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


  .controller('AppWords', function (ArrayWords, $stateParams, $scope, $ionicModal, $timeout) {
    $scope.itemsW = ArrayWords;
    if(ArrayWords.getList().indexOf($stateParams.listId)===-1) {
      $scope.itemsW.addItemms($stateParams.listId);
    }
    console.log('Doing wordData' + $scope.itemsW);


    $scope.onItemDelete = function (item) {
      $scope.itemsW.popItem(item);
    };

    $scope.wordData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/parole.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeWords = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.words = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doWords = function () {
      console.log('Doing wordData', ArrayWords.getList());
      itemTmp = {
        _id: 'listWord_' + ArrayWords.getList() + '_' + $scope.wordData.one + '_' + $scope.wordData.two,
        title: $scope.wordData.one + '_' + $scope.wordData.two,
        word: $scope.wordData.one,
        word1: $scope.wordData.two
      };
      $scope.itemsW.addItemm(itemTmp);
      $scope.modal.hide();
    };
  })

  .controller('MyList', function ($ionicPopup, PouchDBListener, $scope) {
      $scope.items = [];

      localDB.allDocs({
        include_docs: true,
        attachments: true,
        startkey: 'listGlossary_',
        endkey: 'listGlossary_\uffff'
      }).then(function (result) {
        for (i = 0; i < result.total_rows; i++)
          $scope.items.push(result.rows[i].doc);
        console.log(result);
      }).catch(function (err) {
        console.log(err);
      });

      $scope.create = function () {
        $ionicPopup.prompt({
            title: 'Enter a new TODO item',
            inputType: 'text'
          })
          .then(function (result) {
            if (result !== "") {
              if ($scope.hasOwnProperty("items") !== true) {
                $scope.items = [];
              }
              itemTmp = {
                _id: 'listGlossary_' + result,
                title: result
              };
              localDB.put(itemTmp);
              $scope.items.push(itemTmp);
            } else {
              console.log("Action not completed");
            }
          });
      };


      $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
        localDB.remove(item);
      };

      $scope.edit = function (item) {
        location.href = '#/app/crea/' + item.title;
      };
    }
  )

  .controller("ExampleController", function ($scope, $ionicPopup, PouchDBListener) {

    $scope.todos = [];
    localDB.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'listGlossary_',
      endkey: 'listGlossary_\uffff'
    }).then(function (result) {
      for (i = 0; i < result.total_rows; i++)
        $scope.todos.push(result.rows[i].doc);
    }).catch(function (err) {
      console.log(err);
    });

    $scope.create = function () {
      $ionicPopup.prompt({
          title: 'Enter a new TODO item',
          inputType: 'text'
        })
        .then(function (result) {
          if (result !== "") {
            if ($scope.hasOwnProperty("todos") !== true) {
              $scope.todos = [];
            }
            localDB.put({
              _id: 'listGlossary_' + result.substring(0, 4) + "_" + result.substring(5, 7) + result.substring(10, 13),
              title: result
            });
          } else {
            console.log("Action not completed");
          }
        });
    };

    $scope.$on('add', function (event, todo) {
      $scope.todos.push(todo);
    });

    $scope.$on('delete', function (event, id) {
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i]._id === id) {
          $scope.todos.splice(i, 1);
        }
      }
    });

  });

