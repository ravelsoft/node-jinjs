{% let variable = "bloup" %}
{% macro test () %}
Yoyo {{ variable }}
{% endmacro %}
Should show "included": "{% include "./included.tpl" %}"
