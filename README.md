jquery-whenObject
=================

$.when with objects, a la [async](https://github.com/caolan/async).

## Usage

Include on your page, after jQuery. Supports AMD.

```js

$.whenObject({
  first: firstPromise,
  second: secondPromise
}) // => returns combined promise
  .done(function (results) {
    console.log(results.first);
    console.log(results.second);
  })
  .fail(/* function... */)
  .always(/* function... */)

```

For details, refer to [jQuery.when](http://api.jquery.com/jQuery.when/) API.

