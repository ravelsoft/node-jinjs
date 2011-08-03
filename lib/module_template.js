var __filter__ = require("./filters");
var __get_template__ = require;

// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.
function render (__ctx__) {
    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;
    var _ref = undefined;
    var _res = '';
    var _i = 0;
    var __extends__ = null;
        
    _res += 'var __filter__ = ';
    _res += (__filter__["default"](__ctx__.filter_exp, "require('jinjs/lib/filters')") || '').toString();
    _res += ';\nvar __get_template__ = ';
    _res += (__filter__["default"](__ctx__.require_exp, "require") || '').toString();
    _res += ';\nvar __indexOf = [].indexOf || function(x){\n  for (var i = this.length; i-- && this[i] !== x;); return i;\n};\nfunction __in (obj, container) {\n    if (obj instanceof Array) {\n        return __indexOf.call(container, obj) > -1;\n    }\n    return container[obj] !== undefined;\n}\n';
    if (__ctx__.clone) {
        _res += '// A useful function stolen from coco to duplicate objects\nvar __import = function(obj, src){\n    var own = {}.hasOwnProperty;\n    for (var key in src) if (own.call(src, key)) obj[key] = src[key];\n    return obj;\n};\n';
    }
    if (__ctx__.blocks) {
        _res += '// Start Block Definitions\n\n';
        (function () {
            x = '';
            i = 0;
            var _ref = (__ctx__.blocks) || {};
            var _prev_loop = __ctx__.loop;
            var _prev_key = __ctx__.name;
            var _prev_value = __ctx__.contents;
            var loop = (__ctx__.loop = { callee: arguments.callee });
            for (x in _ref) {
                if (_ref.hasOwnProperty(x)) {
                    loop.index0 = i;
                    loop.index = i + 1;
                    __ctx__.name = x;
                    __ctx__.contents = _ref[x];
                    _res += '// Block declaration of \"';
                    _res += (__ctx__.name || '').toString();
                    _res += '\"\nfunction __block_';
                    _res += (__ctx__.name || '').toString();
                    _res += ' (__ctx__) {\n    var super = this.super;\n    ';
                    _res += (__ctx__.contents || '').toString();
                    _res += '\n}\n';
                    i += 1;
                }
            }
            __ctx__.loop = _prev_loop;
            __ctx__.name = _prev_key;
            __ctx__.contents = _prev_value;
        })();
        _res += '\n// End Block Definitions\n';
    }
    _res += '// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.\nfunction render (__ctx__) {\n    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;\n    var _ref = undefined;\n    var _res = \'\';\n    var _i = 0;\n    var __extends__ = null;\n    ';
    if (__ctx__.blocks) {
        _res += '    var _b = null;\n    (__ctx__.__blocks__ == null) && (__ctx__.__blocks__ = {});\n    _b = __ctx__.__blocks__;\n    var __newblocks__ = {};\n    var _block_iterator = null;\n    ';
    }
    _res += '    ';
    _res += (__ctx__.body || '').toString();
    _res += '\n    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);\n    return _res;\n}\nexports.render = render;\n';
    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);
    return _res;
}
exports.render = render;
