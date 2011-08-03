{% extends "./extended.tpl" %}

{% block content %}
EXTENDED BLOCK : SHOULD SEE ME.
{% endblock %}

{% block content2 %}
This block is not extending a block in the base template : should not be seen.
{% endblock %}

{% block test_super %}
Extending super: {{ super() }}
{% endblock %}
