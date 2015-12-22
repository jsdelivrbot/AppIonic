angular.module('starter.services', ['ngResource'])

  .factory('List', function ($resource) {
    return [1,2,3,4,5,6,7,8,9,0,12,23,34,45,5,67,7];
  });
