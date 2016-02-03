angular.module('starter.controllers', [])

  .controller('AppGioca', function (ArrayWords, $stateParams, $scope, $ionicModal, $state) {
    $scope.itemsW = ArrayWords;
    if (ArrayWords.getList().indexOf($stateParams.listId) === -1) {
      $scope.itemsW.addItemms($stateParams.listId);
    }
    $scope.itemsW = shuffle($scope.itemsW);
    console.log('Doing wordData' + $scope.itemsW);
    $scope.end = function () {
      $scope.$on('$ionicView.loaded');
      $state.transitionTo('app.inizia');
    };
  })

  .controller('AppWords', function (ArrayWords, $stateParams, $scope, $ionicModal, $timeout) {
    $scope.itemsW = ArrayWords;
    if (ArrayWords.getList().indexOf($stateParams.listId) === -1) {
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
      $scope.wordData = {};
      $scope.modal.hide();
    };
  })

  .controller('MyList', function ($ionicPopup, PouchDBListener, $scope) {
      $scope.items = [];

      $scope.addAllList = function () {
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
      };
      $scope.addAllList();
      $scope.create = function () {
        $ionicPopup.prompt({
            title: 'Enter a new TODO item',
            inputType: 'text'
          })
          .then(function (result) {
            if (result !== undefined) {
              console.log(result);
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
      $scope.chooseList = {
        list: 'None'
      };
      $scope.playGame = function () {
        if ($scope.chooseList.list !== 'None') {
          console.log($scope.chooseList);
          location.href = '#/app/gioca/' + $scope.chooseList.list;
        } else {
          console.log("Select a item");
        }
      };
    }
  )

  .controller('WelcomeCtrl', function ($scope, $state, $q, UserService, $ionicModal, $timeout, $ionicLoading) {
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

    // This is the success callback from the login method
    var fbLoginSuccess = function (response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
        .then(function (profileInfo) {
          // For the purpose of this example I will store user data on local storage
          UserService.setUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
          });
          $ionicLoading.hide();
          $state.go('app.inizia');
        }, function (fail) {
          // Fail get profile info
          console.log('profile info fail', fail);
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function (error) {
      console.log('fbLoginError', error);
      $ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
        function (response) {
          console.log(response);
          info.resolve(response);
        },
        function (response) {
          console.log(response);
          info.reject(response);
        }
      );
      return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function () {
      facebookConnectPlugin.getLoginStatus(function (success) {
        if (success.status === 'connected') {
          // The user is logged in and has authenticated your app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed request, and the time the access token
          // and signed request each expire
          console.log('getLoginStatus', success.status);

          // Check if we have our user saved
          var user = UserService.getUser('facebook');

          if (!user.userID) {
            getFacebookProfileInfo(success.authResponse)
              .then(function (profileInfo) {
                // For the purpose of this example I will store user data on local storage
                UserService.setUser({
                  authResponse: success.authResponse,
                  userID: profileInfo.id,
                  name: profileInfo.name,
                  email: profileInfo.email,
                  picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                });
                console.log(UserService.getUser('facebook'));
                $state.go('app.inizia');
              }, function (fail) {
                // Fail get profile info
                console.log('profile info fail', fail);
              });
          } else {
            $state.go('app.inizia');
            $scope.closeLogin();
          }
        } else {
          // If (success.status === 'not_authorized') the user is logged in to Facebook,
          // but has not authenticated your app
          // Else the person is not logged into Facebook,
          // so we're not sure if they are logged into this app or not.

          console.log('getLoginStatus', success.status);

          $ionicLoading.show({
            template: 'Logging in...'
          });

          // Ask the permissions you need. You can learn more about
          // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }
      });
    };
  })

  .controller('LogoutCtrl', function ($scope, UserService, $ionicActionSheet, $state, $ionicLoading) {
    $scope.user = UserService.getUser();

    $scope.showLogOutMenu = function () {
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Logout',
        titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
        cancelText: 'Cancel',
        cancel: function () {
        },
        buttonClicked: function (index) {
          return true;
        },
        destructiveButtonClicked: function () {
          $ionicLoading.show({
            template: 'Logging out...'
          });

          // Facebook logout
          facebookConnectPlugin.logout(function () {
              $ionicLoading.hide();
              $state.go('welcome');
            },
            function (fail) {
              $ionicLoading.hide();
            });
        }
      });
    };
  })

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

