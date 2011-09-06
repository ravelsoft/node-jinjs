JinJS
=====

As stated on Jinja's home page, *"Jinja Is Beautiful"*

    {% extends "layout.html" %}
    {% block body %}
      <ul>
      {% for user in users %}
        <li><a href="{{ user.url }}">{{ user.username }}</a></li>
      {% endfor %}
      </ul>
    {% endblock %}

JinJS is the native port of Jinja to the world of NodeJS. Just like Jinja, it aims to transform template documents to native javascript code to maximize execution speed.

Head over to the [Documentation](https://github.com/Ravelsoft/node-jinjs/wiki)

