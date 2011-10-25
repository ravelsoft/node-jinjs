var _require = require;
var require = (function (_require) {
    return function (mod) { 
        if ((typeof mod === "object") && (mod.render != null))
            return mod;
        return require(mod);
    };
})(_require);
var __last_ctx__ = null;

var __indexOf = [].indexOf || function(x) {
    for (var i = this.length - 1; i >= 0; i--)
        if (this[i] === x) return i;
};

if (!Object.keys) Object.keys = function(o){
 if (o !== Object(o))
      throw new TypeError('Object.keys called on non-object');
 var ret=[],p;
 for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
 return ret;
}

function __in(obj, container){
    if (obj instanceof Array) {
      return __indexOf.call(container, obj) > -1;
    }
    return container[obj] != null;
  }function __import(obj, src){
    var own, key;
    own = {}.hasOwnProperty;
    for (key in src) {
      if (own.call(src, key)) {
        obj[key] = src[key];
      }
    }
    return obj;
  }
function $default(value, default_value){
        if (value == null) {
          return default_value;
        }
        return value;
      }

// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.
function render ($$) {
    $$ = ($$ === undefined || $$ === null) ? {} : $$;
    var _ref = undefined;
    var _res = '';
    var _i = 0;
    var __extends__ = null;
        
    _res += 'var _require = function (mod) { \n    if ((typeof mod === \"object\") && (mod.render != null))\n        return mod;\n    return ';
    _res += ((_ref = $default.call($$,$$.require_exp, "require")) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '(mod);\n};\nvar __last_ctx__ = null;\n\nvar __indexOf = [].indexOf || function(x) {\n    for (var i = this.length - 1; i >= 0; i--)\n        if (this[i] === x) return i;\n};\n\nif (!Object.keys) Object.keys = function(o){\n if (o !== Object(o))\n      throw new TypeError(\'Object.keys called on non-object\');\n var ret=[],p;\n for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);\n return ret;\n}\n\n';
    (function() {var _fref = $$.utils || [], _prev_loop = $$.loop, _prev_key = $$['fname'], _prev_value = $$['fn'], k = null, v = null, i = 0, l = 0, x = null, last_v = null, last_k = null;$$.loop = { };
    if (_fref instanceof Array) {l = _fref.length;for (i = 0; i < l; i++) {$$.loop.last = (i == l - 1);$$.loop.first = (i == 0);$$.loop.index0 = i;$$.loop.index = i + 1;$$['fname'] = _fref[i]; $$['fn'] = i;
    _res += ((_ref = $$.fn) !== undefined && _ref !== null ? _ref : '').toString();}
    } else {$$.loop = { first: true, last: false };l = Object.keys(_fref).length;for (x in _fref) { if (_fref.hasOwnProperty(x)) {$$.loop.last = (i == l - 1);$$['fname'] = x;$$['fn'] = _fref[x];$$.loop.index0 = i;$$.loop.index = i + 1;
    _res += ((_ref = $$.fn) !== undefined && _ref !== null ? _ref : '').toString();i += 1;$$.loop.first = false;} }}
    if ($$.loop.index == undefined) {}$$.loop = _prev_loop; $$['fname'] = _prev_key; $$['fn'] = _prev_value;})();
    _res += '\n';
    (function() {var _fref = $$.filters_used || [], _prev_loop = $$.loop, _prev_key = $$['fn_name'], _prev_value = $$['decl'], k = null, v = null, i = 0, l = 0, x = null, last_v = null, last_k = null;$$.loop = { };
    if (_fref instanceof Array) {l = _fref.length;for (i = 0; i < l; i++) {$$.loop.last = (i == l - 1);$$.loop.first = (i == 0);$$.loop.index0 = i;$$.loop.index = i + 1;$$['fn_name'] = _fref[i]; $$['decl'] = i;
    _res += ((_ref = $$.decl) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n';}
    } else {$$.loop = { first: true, last: false };l = Object.keys(_fref).length;for (x in _fref) { if (_fref.hasOwnProperty(x)) {$$.loop.last = (i == l - 1);$$['fn_name'] = x;$$['decl'] = _fref[x];$$.loop.index0 = i;$$.loop.index = i + 1;
    _res += ((_ref = $$.decl) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n';i += 1;$$.loop.first = false;} }}
    if ($$.loop.index == undefined) {}$$.loop = _prev_loop; $$['fn_name'] = _prev_key; $$['decl'] = _prev_value;})();
    _res += '\n';
    if ($$.blocks) {
        _res += '// Start Block Definitions\n\n';
        (function() {var _fref = $$.blocks || [], _prev_loop = $$.loop, _prev_key = $$['name'], _prev_value = $$['contents'], k = null, v = null, i = 0, l = 0, x = null, last_v = null, last_k = null;$$.loop = { };
        if (_fref instanceof Array) {l = _fref.length;for (i = 0; i < l; i++) {$$.loop.last = (i == l - 1);$$.loop.first = (i == 0);$$.loop.index0 = i;$$.loop.index = i + 1;$$['name'] = _fref[i]; $$['contents'] = i;
        _res += '// Block declaration of \"';
        _res += ((_ref = $$.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\"\nfunction __block_';
        _res += ((_ref = $$.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += ' ($$) {\n    var require = _require;\n    var _b = ($$ ? $$.__blocks__ : {});\n    var _res = \"\";\n    var __extends__ = null;\n    ';
        _res += ((_ref = $$.contents) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\n    return _res;\n}\n';}
        } else {$$.loop = { first: true, last: false };l = Object.keys(_fref).length;for (x in _fref) { if (_fref.hasOwnProperty(x)) {$$.loop.last = (i == l - 1);$$['name'] = x;$$['contents'] = _fref[x];$$.loop.index0 = i;$$.loop.index = i + 1;
        _res += '// Block declaration of \"';
        _res += ((_ref = $$.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\"\nfunction __block_';
        _res += ((_ref = $$.name) !== undefined && _ref !== null ? _ref : '').toString();
        _res += ' ($$) {\n    var require = _require;\n    var _b = ($$ ? $$.__blocks__ : {});\n    var _res = \"\";\n    var __extends__ = null;\n    ';
        _res += ((_ref = $$.contents) !== undefined && _ref !== null ? _ref : '').toString();
        _res += '\n    return _res;\n}\n';i += 1;$$.loop.first = false;} }}
        if ($$.loop.index == undefined) {}$$.loop = _prev_loop; $$['name'] = _prev_key; $$['contents'] = _prev_value;})();
        _res += '\n// End Block Definitions\n';
    }
    _res += '// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.\nfunction render ($$) {\n    $$ = ($$ === undefined || $$ === null) ? {} : $$;\n    var _ref = undefined;\n    var _res = \'\';\n    var _i = 0;\n    var __extends__ = null;\n    var require = _require;\n    ';
    if ($$.blocks) {
        _res += '    var _b = null;\n    ($$.__blocks__ == null) && ($$.__blocks__ = {});\n    _b = $$.__blocks__;\n    var __newblocks__ = {};\n    var _block_iterator = null;\n    ';
    }
    _res += '    ';
    _res += ((_ref = $$.body) !== undefined && _ref !== null ? _ref : '').toString();
    _res += '\n    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render($$);\n    return _res;\n}\nexports.render = render;\n\nfunction _cached_ctx () {\n    if (!__last_ctx__) {\n        __last_ctx__ = {};\n        render(__last_ctx__);\n    }\n    return __last_ctx__;\n}\nexports._cached_ctx = _cached_ctx;\n';
    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render($$);
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
