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
