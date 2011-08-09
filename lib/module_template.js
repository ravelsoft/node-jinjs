var __filter__ = require("./filters");
var __get_template__ = require;
var __indexOf = [].indexOf || function(x){
  for (var i = this.length; i-- && this[i] !== x;); return i;
};
function __in (obj, container) {
    if (obj instanceof Array) {
        return __indexOf.call(container, obj) > -1;
    }
    return container[obj] !== undefined;
}
function __for (__ctx__, condition, keyname, valuename, childcode, elsenode) {
    var i = 0;
    var _ref = null;
    var _prev_loop = __ctx__.loop;
    var _prev_key = __ctx__[keyname];
    var _prev_value = null;
    var x = null;
    var loop = null;

    if (!valuename) { // We iterate over an array.
        _ref = condition || [];
        loop = (__ctx__.loop = {length: _ref.length, callee: arguments.callee});

        for (i = 0; i < loop.length; i++) {
            loop.index = i + 1; loop.index0 = i;
            loop.first = (i == 0); loop.last = (i == loop.length - 1);
            __ctx__[keyname] = _ref[i];
            if (childcode) childcode();
        }
    } else {
        _ref = condition || {};
        x = '';
        i = 0;
        _prev_value = __ctx__[valuename];
        loop = (__ctx__.loop = { callee: arguments.callee });

        for (x in _ref) {
            if (_ref.hasOwnProperty(x)) {
                loop.index0 = i;
                loop.index = i + 1;
                __ctx__[keyname] = x;
                __ctx__[valuename] = _ref[x];
                if (childcode) childcode();
                i += 1;
            }
        }
        __ctx__[valuename] = _prev_value;
    }

    if (elsenode !== undefined && elsenode !== null) elsenode();
    __ctx__.loop = _prev_loop;
    __ctx__[keyname] = _prev_key;
}
// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.
function render (__ctx__) {
    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;
    var _ref = undefined;
    var _res = '';
    var _i = 0;
    var __extends__ = null;
        
    _res += '\"use strict\"\nvar __filter__ = ';
    _res += ((_ref = __filter__["default"](__ctx__.filter_exp, "require('jinjs/lib/filters')")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += ';\nvar __get_template__ = ';
    _res += ((_ref = __filter__["default"](__ctx__.require_exp, "require")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += ';\nvar __indexOf = [].indexOf || function(x){\n  for (var i = this.length; i-- && this[i] !== x;); return i;\n};\nfunction __in (obj, container) {\n    if (obj instanceof Array) {\n        return __indexOf.call(container, obj) > -1;\n    }\n    return container[obj] !== undefined;\n}';
    if (__ctx__.forblock) {
        _res += '\nfunction __for (__ctx__, condition, keyname, valuename, childcode, elsenode) {\n    var i = 0;\n    var _ref = null;\n    var _prev_loop = __ctx__.loop;\n    var _prev_key = __ctx__[keyname];\n    var _prev_value = null;\n    var x = null;\n    var loop = null;\n\n    if (!valuename) { // We iterate over an array.\n        _ref = condition || [];\n        loop = (__ctx__.loop = {length: _ref.length, callee: arguments.callee});\n\n        for (i = 0; i < loop.length; i++) {\n            loop.index = i + 1; loop.index0 = i;\n            loop.first = (i == 0); loop.last = (i == loop.length - 1);\n            __ctx__[keyname] = _ref[i];\n            if (childcode) childcode();\n        }\n    } else {\n        _ref = condition || {};\n        x = \'\';\n        i = 0;\n        _prev_value = __ctx__[valuename];\n        loop = (__ctx__.loop = { callee: arguments.callee });\n\n        for (x in _ref) {\n            if (_ref.hasOwnProperty(x)) {\n                loop.index0 = i;\n                loop.index = i + 1;\n                __ctx__[keyname] = x;\n                __ctx__[valuename] = _ref[x];\n                if (childcode) childcode();\n                i += 1;\n            }\n        }\n        __ctx__[valuename] = _prev_value;\n    }\n\n    if (elsenode !== undefined && elsenode !== null) elsenode();\n    __ctx__.loop = _prev_loop;\n    __ctx__[keyname] = _prev_key;\n}\n';
    }
    if (__ctx__.clone) {
        _res += '// A useful function stolen from coco to duplicate objects\nvar __import = function(obj, src){\n    var own = {}.hasOwnProperty;\n    for (var key in src) if (own.call(src, key)) obj[key] = src[key];\n    return obj;\n};\n';
    }
    if (__ctx__.blocks) {
        _res += '// Start Block Definitions\n\n';
        __for(__ctx__, __ctx__.blocks, 'name', 'contents', (function () {
        _res += '// Block declaration of \"';
        _res += ((_ref = __ctx__.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\"\nfunction __block_';
        _res += ((_ref = __ctx__.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += ' (__ctx__) {\n    var super = this.super;\n    ';
        _res += ((_ref = __ctx__.contents) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\n}\n';}), (function(){}) );
        _res += '\n// End Block Definitions\n';
    }
    _res += '// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.\nfunction render (__ctx__) {\n    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;\n    var _ref = undefined;\n    var _res = \'\';\n    var _i = 0;\n    var __extends__ = null;\n    ';
    if (__ctx__.blocks) {
        _res += '    var _b = null;\n    (__ctx__.__blocks__ == null) && (__ctx__.__blocks__ = {});\n    _b = __ctx__.__blocks__;\n    var __newblocks__ = {};\n    var _block_iterator = null;\n    ';
    }
    _res += '    ';
    _res += ((_ref = __ctx__.body) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);\n    return _res;\n}\nexports.render = render;\n';
    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);
    return _res;
}
exports.render = render;
