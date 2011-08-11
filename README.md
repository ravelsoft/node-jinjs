JinJS
=====

JinJS is the native port of Jinja to the world of NodeJS. Just like Jinja, it aims to transform template documents to native javascript code to maximize execution speed.

It is not a 100% exact copy of Jinja however, and is still in early stages.

So far, the principal differences are :
*   You can't have variables with javascript reserved names
*   There is no real `loader` : instead, templates are `require`'d as if they were modules. It was in fact made so that integrating with *browserify* is crazy easy : juste require your template and have browserify bundle it for you.
*   It is probably much more permissive ; you can assign to compound expressions (`{% let foo.bar = something %}` is valid)

Head to http://jinja.pocoo.org/ to read the template designer documentation (the API is fairly different).

The following tags are implemented almost like the real thing : `for`, `if`, `elseif`, `extends`, `block`, `import`, `include`, `macro`, `let`, `do`
We are still missing `call`

The following filters are implemented : `in`, `abs`, `capitalize`, `default`, `filesizeformat`, `first`, `last`, `join`, `length`, `lower`, `upper`, `replace`, `reverse`, `round`, `trim`

How To Use
==========

    npm install jinjs

To have node load your templates as if they were modules, you first have to register your module extension :

    require("jinjs").registerExtension(".tpl");

If you want your file to be transformed prior to being submitted to jinjs, you can pass a callback ;

    var pwilang = require("pwilang");
    require("jinjs").registerExtension(".pwx", function (txt) { 
        return pwilang.parse(txt); 
    });

You can now write :

    var my_template = require("./mytemplate");
    var context = { foo: "foo", bar: "bar" };
    var result = my_template.render(context);

Use With Browserify
===================

    var de = require("jinjs").defaultEnvironment;
    var browserifier = require("browserify")();
    browserifier.register({ extension: ".tpl", wrapper: function (body, file) {
        return de.getTemplateSourceFromString(body);
    });
