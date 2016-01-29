var str = angular.module('starter.services', ['ionic']);

str.factory('PouchDBListener', ['$rootScope', function ($rootScope) {
  localDB.changes({
    since: 'now',
    include_docs: true,
    live: true
  }).on('change', function (change) {
    if (!change.deleted) {
      $rootScope.$apply(function () {
        localDB.get(change.id, function (err, doc) {
          $rootScope.$apply(function () {
            if (err) console.log(err);
            $rootScope.$broadcast('add', doc);
          })
        });
      });
    } else {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('delete', change.id);
      });
    }
  }).on('error', function (err) {
    alert(err);
  });

  return true;

}])

str.factory('ArrayWords', function () {

  var o = [];
  listTmp = 'None';
  o.addItemm = function (item) {
    o.push(item);
    console.log(item);
    localDB.put(item);
  };

  o.popItem = function (item) {
    o.splice(o.indexOf(item), 1);
    localDB.remove(item);
  };

  o.getList = function () {
    return listTmp;
  };

  o.addItemms = function (lists) {
    listTmp = lists;
    o.length = 0;
    localDB.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'listWord_' + lists,
      endkey: 'listWord_' + lists + '_\uffff'
    }).then(function (result) {
      console.log(result);
      for (i = 0; i < result.total_rows - 1; i++) {
        console.log(result.rows[i].doc);
        o.push(result.rows[i].doc);
        console.log(o);
      }
    }).catch(function (err) {
        console.log(err);
      }
    );
  };
  return o;
});
