var __get_template__ = {{ require_exp|default("require") }};
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

{% for fname, fn in utils %}{{ fn }}{% endfor %}

{% for fn_name, decl in filters_used %}
{{ decl }}
{% endfor %}

{% if blocks %}
// Start Block Definitions

{% for name, contents in blocks %}
// Block declaration of "{{ name }}"
function __block_{{ name }} (__ctx__) {
    var _b = (__ctx__ ? __ctx__.__blocks__ : {});
    var _res = "";
    var __extends__ = null;
    {{ contents }}
    return _res;
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

function _cached_ctx () {
    if (!__last_ctx__) {
        __last_ctx__ = {};
        render(__last_ctx__);
    }
    return __last_ctx__;
}
exports._cached_ctx = _cached_ctx;
