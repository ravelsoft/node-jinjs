var __filter__ = {{ filter_exp|default("require('jinjs/lib/filters')") }};
var __utils__ = {{ util_exp|default("require('jinjs/lib/utils')") }};
var __get_template__ = {{ require_exp|default("require") }};
var fname = null, filter = null;
var __last_ctx__ = null;

for (fname in __utils__) {
    eval("var " + fname + " = __utils__." + fname + ";");
}

for (filter in __filter__) {
    eval("var __filter_" + filter + " = __filter__['" + filter + "'];");
}

{% if blocks %}
// Start Block Definitions

{% for name, contents in blocks %}
// Block declaration of "{{ name }}"
function __block_{{ name }} (__ctx__) {
    var _super = this._super || function(){return "";};
    var _b = (__ctx__ ? __ctx__.__blocks__ : {});
    var _res = "";
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
