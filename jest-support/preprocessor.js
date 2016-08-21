'use strict';

var babel = require('babel-core');
var es2015Preset = require('babel-preset-es2015');
var jestPreset = require('babel-preset-jest');
var reactPreset = require('babel-preset-react');

module.exports = {
  process: function (src, filename) {
    if (filename.match(/node_modules/)) {
      return src;
    }

    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [es2015Preset, jestPreset, reactPreset],
        retainLines: true,
      }).code;
    }

    return src;
  }
};
