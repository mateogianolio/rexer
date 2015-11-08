#!/usr/bin/env node

(function() {
  'use strict';

  var re = require('regexp'),
      _ = require('underscore');

  function match(exp) {
    if (exp.body.length === 1)
      return rex(exp.body[0]);

    return rex(exp.body);
  }

  function range(exp) {
    var start = exp.start.body,
        end = exp.end.body,
        result = [],
        i;
    if (isNaN(start)) {
      var ab = 'abcdefghijklmnopqrstuvwxyz';
      ab = start === start.toUpperCase() ? ab.toUpperCase() : ab;

      for (i = ab.indexOf(start); i <= ab.indexOf(end); i++)
        result.push(ab[i]);
    } else {
      for (i = parseInt(start); i <= parseInt(end); i++)
        result.push(i);
    }

    return result;
  }

  function alternate(exp) {
    return [
      rex(exp.left),
      rex(exp.right)
    ];
  }

  function cartesianProductOf() {
    return _.reduce(arguments, (a, b) => {
      return _.flatten(_.map(a, x => {
        return _.map(b, y => {
          return x.concat([y]);
        });
      }), true);
    }, [[]]);
  }

  function rex(exp) {
    var result;

    if (exp instanceof Array) {
      result = _.map(exp, rex);
      result = cartesianProductOf.apply(null, result);
      return _.map(result, x => {
        return x instanceof Array ? x.join('') : x;
      });
    }

    switch(exp.type) {
      case 'match':
      case 'capture-group':
      case 'charset':
      case 'quantified':
        return match(exp);
      case 'range':
        return range(exp);
      case 'alternate':
        return alternate(exp);
    }

    return exp.body;
  }

  var args = process.argv.splice(2),
      exp;
  if (args.length >= 1) {
    exp = re(args.join(''));
    console.log(JSON.stringify(rex(exp)));
    return;
  }

  module.exports = function() {
    args = Array.prototype.slice.call(arguments);
    exp = re(args.join(''));
    return rex(exp);
  };
}());
