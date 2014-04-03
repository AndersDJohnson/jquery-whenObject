(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var whenObject = function(object) {
    var deferred = new $.Deferred();
    var promises = [];
    var keys = [];
    $.each(object, function (key, value) {
      keys.push(key);
      promises.push(value);
    });
    $.when.apply(null, promises)
      .done(function (results) {
        var resultsObject = {};
        $.each(results, function (index, value) {
          var key = keys[index];
          resultsObject[key] = value;
        });
        deferred.resolve(resultsObject);
      })
      .fail(function (results) {
        deferred.reject(results);
      });
    return deferred;
  };

  $.whenObject = whenObject;

  return whenObject;
}));
