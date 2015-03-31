var util = require('util');
module.exports.register = function (Handlebars, options)  {
  function createPath(obj, path) {
    var arr = path.split('.');
    return arr.reduce(function(o, key) {
      if (!o[key]) {
        o[key] = {};
      }
      return o[key];
    }, obj);
  }
  function toNested(symbols) {
    var res = {};

    symbols.forEach(function(item) {
      var name = item.name;
      var method = name.split('#');
      var path = method[0].split('.').splice(1);

      var obj = path.reduce(function(obj, key, i) {
        createPath(obj, '__nodes.children');
        if (!obj.__nodes.children[key]) {
            obj.__nodes.children[key] = {};
        }

        return obj.__nodes.children[key];
      }, res);

      if (method[1]) {
        createPath(obj, '__nodes.methods');
        var methods = obj.__nodes.methods;
        methods[method[1]] = { props: item };
      } else {
        obj.props = item;
      }
    });
    return res.__nodes.children;
  }

  // Block Helper to categorize symbols and defines by namespace
  Handlebars.registerHelper("filterNamespace", function(arr, options) {
    if (arr && arr.length > 0) {
      return options.fn(toNested(arr));
    }
    else {
      return options.elseFn();
    }
  });

};
