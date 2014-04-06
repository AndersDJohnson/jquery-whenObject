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

  var slice = Array.prototype.slice;

  var arrayToObject = function (keys, results) {
    var object = {};
    $.each(results, function (index, value) {
      var key = keys[index];
      object[key] = value;
    });
    return object;
  };

  /**
   * normalize results as array for single promises
   */
  var normalizeResults = function (keys, results) {
    if (keys.length === 1) {
      results = [results];
    }
    return results;
  };

  var whenObject = function(object) {
    var deferred = new $.Deferred();
    var promises = [];
    var keys = [];
    $.each(object, function (key, value) {
      keys.push(key);
      promises.push(value);
    });

    $.when.apply(null, promises)
      .done(function () {
        var results = slice.call(arguments);
        results = normalizeResults(keys, results);
        var resultsObject = arrayToObject(keys, results);
        deferred.resolve(resultsObject);
      })
      .fail(function () {
        var results = slice.call(arguments);
        results = normalizeResults(keys, results);
        var resultsObject = arrayToObject(keys, results);
        deferred.reject(resultsObject);
      });
    return deferred;
  };

  $.whenObject = whenObject;

  return whenObject;
}));
