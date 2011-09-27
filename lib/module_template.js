var __filter__ = require('jinjs/lib/filters');
var __utils__ = require('jinjs/lib/utils');
var __get_template__ = require;
var fname = null, filter = null;
var __last_ctx__ = null;

for (fname in __utils__) {
    eval("var " + fname + " = __utils__." + fname + ";");
}

for (filter in __filter__) {
    eval("var __filter_" + filter + " = __filter__['" + filter + "'];");
}

// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.
function render (__ctx__) {
    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;
    var _ref = undefined;
    var _res = '';
    var _i = 0;
    var __extends__ = null;
        
    _res += 'var __get_template__ = ';
    _res += ((_ref = __filter_default(__ctx__.require_exp, "require")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += ';\nvar __last_ctx__ = null;\n\nvar __indexOf = [].indexOf || function(x) {\n    for (var i = this.length - 1; i >= 0; i--)\n        if (this[i] === x) return i;\n};\n\nif (!Object.keys) Object.keys = function(o){\n if (o !== Object(o))\n      throw new TypeError(\'Object.keys called on non-object\');\n var ret=[],p;\n for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);\n return ret;\n}\n\n';
    __for(__ctx__, __ctx__.utils, 'fname', 'fn', (function () {
    _res += ((_ref = __ctx__.fn) !== undefined && _ref !== null ? _ref : '').toString();}), (function(){}) );
    _res += '\n';
    __for(__ctx__, __ctx__.filters_used, 'fn_name', 'decl', (function () {
    _res += ((_ref = __ctx__.decl) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n';}), (function(){}) );
    _res += '\n';
    if (__ctx__.blocks) {
        _res += '// Start Block Definitions\n\n';
        __for(__ctx__, __ctx__.blocks, 'name', 'contents', (function () {
        _res += '// Block declaration of \"';
        _res += ((_ref = __ctx__.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\"\nfunction __block_';
        _res += ((_ref = __ctx__.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += ' ($$) {\n    var _b = ($$ ? $$.__blocks__ : {});\n    var _res = \"\";\n    var __extends__ = null;\n    ';
        _res += ((_ref = __ctx__.contents) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\n    return _res;\n}\n';}), (function(){}) );
        _res += '\n// End Block Definitions\n';
    }
    _res += '// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.\nfunction render ($$) {\n    $$ = ($$ === undefined || $$ === null) ? {} : $$;\n    var _ref = undefined;\n    var _res = \'\';\n    var _i = 0;\n    var __extends__ = null;\n    ';
    if (__ctx__.blocks) {
        _res += '    var _b = null;\n    ($$.__blocks__ == null) && ($$.__blocks__ = {});\n    _b = $$.__blocks__;\n    var __newblocks__ = {};\n    var _block_iterator = null;\n    ';
    }
    _res += '    ';
    _res += ((_ref = __ctx__.body) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render($$);\n    return _res;\n}\nexports.render = render;\n\nfunction _cached_ctx () {\n    if (!__last_ctx__) {\n        __last_ctx__ = {};\n        render(__last_ctx__);\n    }\n    return __last_ctx__;\n}\nexports._cached_ctx = _cached_ctx;\n';
    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);
    return _res;
}
exports.render = render;

function _cached_ctx () {
    if (!__last_ctx__) {
        __last_ctx__ = {};
        render(__last_ctx__);
    }
    return __last_ctx__;
}
exports._cached_ctx = _cached_ctx;
