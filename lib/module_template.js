var __filter__ = require("./filters");
var __utils__ = require("./utils");
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
        
    _res += 'var __filter__ = ';
    _res += ((_ref = __filter_default(__ctx__.filter_exp, "require('jinjs/lib/filters')")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += ';\nvar __utils__ = ';
    _res += ((_ref = __filter_default(__ctx__.util_exp, "require('jinjs/lib/utils')")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += ';\nvar __get_template__ = ';
    _res += ((_ref = __filter_default(__ctx__.require_exp, "require")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += ';\nvar fname = null, filter = null;\nvar __last_ctx__ = null;\n\nfor (fname in __utils__) {\n    eval(\"var \" + fname + \" = __utils__.\" + fname + \";\");\n}\n\nfor (filter in __filter__) {\n    eval(\"var __filter_\" + filter + \" = __filter__[\'\" + filter + \"\'];\");\n}\n\n';
    if (__ctx__.blocks) {
        _res += '// Start Block Definitions\n\n';
        __for(__ctx__, __ctx__.blocks, 'name', 'contents', (function () {
        _res += '// Block declaration of \"';
        _res += ((_ref = __ctx__.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\"\nfunction __block_';
        _res += ((_ref = __ctx__.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += ' (__ctx__) {\n    var _super = this._super || function(){return \"\";};\n    var _b = (__ctx__ ? __ctx__.__blocks__ : {});\n    var _res = \"\";\n    ';
        _res += ((_ref = __ctx__.contents) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\n    return _res;\n}\n';}), (function(){}) );
        _res += '\n// End Block Definitions\n';
    }
    _res += '// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.\nfunction render (__ctx__) {\n    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;\n    var _ref = undefined;\n    var _res = \'\';\n    var _i = 0;\n    var __extends__ = null;\n    ';
    if (__ctx__.blocks) {
        _res += '    var _b = null;\n    (__ctx__.__blocks__ == null) && (__ctx__.__blocks__ = {});\n    _b = __ctx__.__blocks__;\n    var __newblocks__ = {};\n    var _block_iterator = null;\n    ';
    }
    _res += '    ';
    _res += ((_ref = __ctx__.body) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);\n    return _res;\n}\nexports.render = render;\n\nfunction _cached_ctx () {\n    if (!__last_ctx__) {\n        __last_ctx__ = {};\n        render(__last_ctx__);\n    }\n    return __last_ctx__;\n}\nexports._cached_ctx = _cached_ctx;\n';
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
