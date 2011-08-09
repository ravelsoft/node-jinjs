"use strict"
var __filter__ = {{ filter_exp|default("require('jinjs/lib/filters')") }};
var __get_template__ = {{ require_exp|default("require") }};
var __indexOf = [].indexOf || function(x){
  for (var i = this.length; i-- && this[i] !== x;); return i;
};
function __in (obj, container) {
    if (obj instanceof Array) {
        return __indexOf.call(container, obj) > -1;
    }
    return container[obj] !== undefined;
}


{%- if forblock %}

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
{% endif -%}

{% if clone %}// A useful function stolen from coco to duplicate objects
var __import = function(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
};
{% endif %}
{% if blocks %}
// Start Block Definitions

{% for name, contents in blocks %}
// Block declaration of "{{ name }}"
function __block_{{ name }} (__ctx__) {
    var super = this.super;
    {{ contents }}
}
{% endfor %}

// End Block Definitions
{% endif %}
// RENDERING FUNCTION, EVERYTHING HAPPENS HERE.
function render (__ctx__) {
    __ctx__ = (__ctx__ === undefined || __ctx__ === null) ? {} : __ctx__;
    var _ref = undefined;
    var _res = '';
    var _i = 0;
    var __extends__ = null;
    {% if blocks %}
    var _b = null;
    (__ctx__.__blocks__ == null) && (__ctx__.__blocks__ = {});
    _b = __ctx__.__blocks__;
    var __newblocks__ = {};
    var _block_iterator = null;
    {% endif %}
    {{ body }}
    if (__extends__ !== undefined && __extends__ !== null) return __extends__.render(__ctx__);
    return _res;
}
exports.render = render;
