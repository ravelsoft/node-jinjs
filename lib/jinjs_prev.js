"use strict";

var tk_tag_open = "{%";
var tk_tag_open_spc = "{%-";
var tk_tag_close = "%}";
var tk_tag_close_spc = "-%}";

var tk_tag_single = "%";

var tk_comment_open = "{#";
var tk_comment_open_spc = "{#-";
var tk_comment_close = "#}";
var tk_comment_close_spc = "-#}";

var tk_comment_single = "#";

var tk_print_open = "{{";
var tk_print_close = "}}";

var tk_new_line = "\n";

/**
 *  Sort function for token sorting.
 *
 *  @param a: First Operand
 *  @param b: Second Operand
 *  @returns 1, 0 or -1
 */
function __token_sort (a, b) {
    if (a.pos == -1) return 1; // -1 is bigger than everyone !
    if (b.pos == -1) return -1;

    if (a.pos < b.pos) return -1;
    if (a.pos == b.pos) {
        if (a.tok.length > b.tok.length) return -1;
        if (a.tok.length < b.tok.length) return 1;
        return 0;
    }
    return 1;

}

/**
 *  @param str A string
 *  @returns    A trimmed string, without leading nor ending spaces.
 */
function trim (str) {
    return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

/**
 *  @param str  a string
 *  @returns    an escaped string suitable to be quoted.
 */
function escape (str) {
    function __repl (m) { return '\\' + m; }

    var res = str.replace (/\\/g, '\\\\').replace (/["\']/g, __repl).replace ('\n', '\\n');

    return res;
}

var _tag_search = / *([-a-zA-Z0-9_]+) *(.*)/;
/**
 *  @param stmt A freshly parsed tag statement
 *  @returns    An object containing the tag portion and the contents.
 */
function break_tag (stmt) {
    var m = _tag_search.exec (stmt);
    return {
        tag: m[1],
        contents: trim (m[2])
    };
}

var tk_pipe = "|";
var tk_lparen = "(";
var tk_rparen = ")";
var tk_dquote = "\"";
var tk_bck_dquote = "\\\"";
var tk_squote = "\'";
var tk_bck_squote = "\\\'";
var tk_lbrace = "{";
var tk_rbrace = "}";
var tk_comma = ",";
var tk_colon = ":";
var tk_semicolon = ";";
var tk_or_pipes = "||"; // Confligts with tk_pipe
var tk_or = "or";
var tk_and = "and";
var tk_not = "not";
var _l = Lexer ({ tokens: [
    tk_pipe,
    tk_or_pipes,
    tk_lparen,
    tk_rparen,
    tk_dquote,
    tk_squote,
    tk_bck_dquote,
    tk_bck_squote,
    tk_lbrace,
    tk_rbrace,
    tk_comma,
    tk_colon,
    tk_semicolon,
    tk_or,
    tk_and,
    tk_not
]} );

var re_begin_ident = /(^|[\.])\s*([a-zA-Z_]\w*)/g;
/**
 *  Replace all variable names by ctx.their_name and transform filters to have
 *  the cute filter|with_pipes|and_calls(yay) syntax
 *
 *  If a variable is already present in ctx, it will not be escaped.
 */
function make_expr (str, ctx) {
    var n = null;

    function _repl (str) {
        if (str.charAt (0) == ".")
            return str;
        for (var i = 0; i < ctx.length; i++) {
            if (str.match (new RegExp ("^\s*" + ctx[i] + "([^\\w]|$)")) ) {
                return str;
            }
        }
        return str.replace (/([a-zA-Z_])/, "ctx.$1");
    }

    function process_string (char) {
        var res = char;
        do {
            n = _l.next ();
            res += n;
        } while ( n != char );
        return res;
    }

    function process_object () {
        var res = "{";
        do {
            while (n != tk_colon) {
                n = _l.next ();
                res += n;
            }
            res += process_group (tk_comma, tk_rbrace);
        } while (n !== null && n != tk_rbrace);
        return res;
    }

    function process_parengroup () {
        var res = "";
        do {
            res += process_group (tk_comma, tk_rparen);
        } while (n !== null && n != tk_rparen);

        return res;
    }
    
    function process_group (expect1, expect2, expect3) {
        var res = "";
        var group = "";

        do {
            n = _l.next ();

            if (n !== null && (n == expect1 || n == expect2 || n == expect3) ) {
                group += n;
                res += group;
                return res;
            }

            if (n == tk_lparen) {
                res += group;
                group = n + process_parengroup ();
                continue;
            }

            if (n == tk_lbrace) {
                res += group;
                group = process_object ();
                continue;
            }

            if (n == tk_pipe) {
                n = _l.next ();
                var p = _l.peek ();

                var tmp = break_tag (n);

                if (p == tk_lparen) {
                    n = _l.next ();
                    group = "env.filters." + tmp.tag + " (" + group + ", " + process_parengroup ();
                } else {
                    group = "env.filters." + tmp.tag + " (" + group + ") " + tmp.contents.replace (re_begin_ident, _repl);
                }

                continue;
            }

            if (n == tk_dquote || n == tk_squote) { // Skip until next quote
                res += group;
                group = process_string (n);
                continue;
            }
            
            if (n == tk_or) { group += "||"; continue; }
            if (n == tk_and) { group += "&&"; continue; }
            if (n == tk_not) { group += "!"; continue; }

            if (n !== null) group += n.replace (re_begin_ident, _repl);

        } while (n !== null);
        res += group;

        return res;
    }

    _l.feed (str);

    return process_group ();
}

/*****************************************************************************************************
.##......######..##..##..######..#####..
.##......##.......####...##......##..##.
.##......####......##....####....#####..
.##......##.......####...##......##..##.
.######..######..##..##..######..##..##.
........................................
*****************************************************************************************************/

/**
 *  A Lexer.
 *
 *  Use Lexer.feed (str) to input a string for it to break it down.
 *  Use Lexer.next () to get the next token.
 *  Use Lexer.peek () to see a future token without advancing in the stream.
 *
 *  This Lexer does NOT use regular expression but simple strings for speed.
 */
function Lexer (specs) {
    var specs = specs || {};
    var that = {};

    var _str = "";
    var _pos = 0;
    var _len = -1;

    var _toks = [];

    specs.tokens = specs.tokens || [ tk_tag_open,
                  tk_tag_open_spc,
                  tk_tag_close,
                  tk_tag_close_spc,
                  tk_tag_single,
                  tk_comment_open,
                  tk_comment_open_spc,
                  tk_comment_close,
                  tk_comment_close_spc,
                  tk_comment_single,
                  tk_print_open,
                  tk_print_close,
                  tk_new_line
                ];

    for (var i = 0; i < specs.tokens.length; i++) {
        _toks.push ( { tok: specs.tokens[i], pos: -1 } );
    }

    var l = _toks.length;

    function _compute_token_positions () {
        var i = 0;

        for (i = 0; i < l; i++) {
            _toks[i].pos = _str.indexOf (_toks[i].tok, _pos);
        }
        _toks.sort (__token_sort);
    }

    function feed (str) {
        _str = str;
        _pos = 0;
        _len = str.length;
        that.lineno = 0;

        _compute_token_positions ();
    }

    function _advance (to) {
        var _res = _str.slice (_pos, to);
        _pos = to;
        return _res;
    }

    function _advance_cur_token () {
        if (_toks[0].tok == tk_new_line)
            that.lineno += 1;

        var _res = _advance (_pos + _toks[0].tok.length);
        _compute_token_positions ();
        return _res;
    }

    function next () {
        if (_pos >= _len) // End of our feed.
            return null;

        if (_toks[0].pos == -1) // No more tokens, we just send the rest of the string.
            return _advance (_len);

        if (_toks[0].pos == _pos) {
            return _advance_cur_token ();
        } else {
            return _advance (_toks[0].pos);
        }
    }

    function peek () {
        var save = _pos;
        var res = next ();
        _pos = save;
        _compute_token_positions ();
        return res;
    }

    that.feed = feed;
    that.next = next;
    that.peek = peek;
    return that;
}

/*****************************************************************************************************
.##..##...####...#####...######...####..
.###.##..##..##..##..##..##......##.....
.##.###..##..##..##..##..####.....####..
.##..##..##..##..##..##..##..........##.
.##..##...####...#####...######...####..
........................................
*****************************************************************************************************/

/**
 *  The basic Node.
 */
function BasicNode (specs, that) {
    specs = specs || {};
    that = that || {};
    that.specs = specs;

    that.compile = function (opts, ctx) {
        var res = "_res += \"" + specs.contents + "\";";
        return res;
    };

    return that;
}

/**
 *  A list of nodes that are to be evaluated one after another.
 */
function NodeList (specs, that) {
    that = that || {};
    BasicNode (specs, that);
    var nodes = [];
    var _last_is_string = false;

    that.compile = function (opts, ctx) {
        ctx = ctx || [];
        var i = 0;
        var res = "";
        for (i = 0; i < nodes.length; i++) {
            res += nodes[i].compile (opts, ctx);
        }
        return res;
    };

    that.push = function (node) {
        if (node.charAt) {// String
            if (_last_is_string) {
                nodes[nodes.length - 1].specs.contents += escape (node);
            } else {
                nodes.push (BasicNode ({ contents: escape (node) }) );
            }
            _last_is_string = true;
        } else {
            _last_is_string = false;
            nodes.push (node);
        }
    };

    that.nodes = nodes;
    return that;
}

/**
 *  The print statement's node. Ensures everything is outputted correctly,
 *  and changes undefined or null values to ''.
 *  FIXME this should be configurable when in some kind of debug mode.
 */
function NodePrint (specs, that) {
    that = that || {};
    BasicNode (specs, that);

    that.compile = function (opts, ctx) {
        var res = "_res += (" + make_expr (specs.contents, ctx) + ") || '';";
        return res;
    };

    return that
}

var re_let_varname = /\s*([a-zA-Z_]\w+)\s*=/;
/**
 *  Add a variable to the context.
 */
function NodeLet (specs, that) {
    that = that || {};
    BasicNode (specs, that);

    console.log (specs.contents);
    var match = re_let_varname.exec (specs.contents);
    if (match == null) throw "Let was expecting a correct variable name";
    var var_name = match[1];

    that.compile = function (opts, ctx) {
        ctx.push (var_name);
        return "var " + specs.contents + ";";
    };

    return that;
}

function NodeTag (specs, that) {
    that = that || {};
    BasicNode (specs, that);

    that.until = "none";
    return that;
}

var re_macro_fn_name = /\s*([a-zA-Z_]\w+)\s*\((.*)\)/;
var re_macro_arg_names = /[a-zA-Z_]\w+/g;
function NodeMacro (specs, that) {
    that = that || {};
    NodeTag (specs, that);

    var match = null;

    match = re_macro_fn_name.exec (specs.contents);
    if (! match) throw "Macro declaration is invalid";

    var fn_name = match[1];
    var var_names = [];
    // We are not replacing !
    match[2].replace (re_macro_arg_names, function (s) { var_names.push (s); return s; } );

    that.compile = function (opts, ctx) {
        var _res = "";
        ctx.push (fn_name);
        var new_ctx = ctx.slice (0);
        for (var i = 0; i < var_names.length; i++) { new_ctx.push (var_names[i]); }
        
        _res += "function " + specs.contents + " {";
        _res += "var _res = '';";
        if (that.inside) _res += that.inside.compile (opts, new_ctx);
        _res += "return _res; }";

        return _res;
    }

    that.until = "endtag";
    return that;
}

/**
 *  This node just outputs } else {
 */
function NodeElse (specs, that) {
    that = that || {};
    NodeTag (specs, that);

    that.compile = function (opts, ctx) {
        return "} else { ";
    };

    return that;
}

/**
 *  The conditional node
 */
function NodeIf (specs, that) {
    that = that || {};
    NodeTag (specs, that);

    var condition = specs.contents;

    that.compile = function (opts, ctx) {
        var res = "if (" + make_expr (condition, ctx) + ") {";
        if (that.inside) res += that.inside.compile (opts, ctx);
        res += "} ";
        return res;
    };

    that.until = "endtag"; // or none, or endfile
    return that;
}

/**
 *  A very simple node : does what it's told.
 */
function NodeDo (specs, that) {
    that = that || {};
    NodeTag (specs, that);

    var _action = specs.contents;

    that.compile = function (opts, ctx) {
        return make_expr (specs.contents) + ';';
    };

    that.until = "none";
    return that;
}

/**
 *  Similar to python's elif
 */
function NodeElIf (specs, that) {
    that = that || {};
    NodeIf (specs, that);

    var _condition = specs.contents;
    var _if_compile = that.compile;

    that.compile = function (opts, ctx) {
        return " } else if (" + make_expr (_condition, ctx) + ") {";
    };

    that.until = "none";
    return that;
}

var re_for = /([a-zA-Z_]\w*)\s*(,\s*([a-zA-Z_]\w*))?\s*in\s*(.*)/;
/**
 *  A Node that emulates the for () { } statement.
 */
function NodeFor (specs, that) {
    that = that || {};
    NodeTag (specs, that);

    var m = re_for.exec (specs.contents);
    var _var1 = m[1];
    var _var2 = m[3];

    that.compile = function (opts, ctx) {
        opts = opts || {};
        ctx = ctx.slice (0);
        ctx.push (_var1);
        if (_var2) ctx.push (_var2);
        ctx.push ('loop');

        var _exp = make_expr ( trim (m[4]), ctx );
        var res = "";

        if (_var2 === undefined) { // For dans un array.
            res += "(function () {                                  \
            var i = 0;                                              \
            var __var1__ = null;                                    \
            var __expr = __expr__ || [];                            \
            var loop = {};                                          \
            loop.length = __expr.length;                        \
            loop.callee = arguments.callee;                     \
            for (i = 0; i < __expr.length; i++) {                   \
                loop.index = i + 1; loop.index0 = i;        \
                loop.first = i == 0; loop.last = i == __expr.length - 1;    \
                __var1__ = __expr[i];"
              .replace (/__var1__/g, _var1).replace (/__expr__/g, _exp).replace (/\s+/g, " ");

            if (that.inside) res += that.inside.compile (opts, ctx);

            res += "} }) ();"
              .replace (/__var1__/g, _var1).replace (/__expr__/g, _exp).replace ("\s+", " ");

        } else {
            res += "(function () {                                  \
            var x = 0;                                              \
            var i = 0;                                              \
            var __var1__ = null;                                    \
            var __var2__ = null;                                    \
            var __expr = __expr__ || {};                            \
            var loop = {};                                          \
            loop.callee = arguments.callee;                     \
            for (x in __expr) {                                     \
                loop.index = i + 1; loop.index0 = i;        \
                i += 1;                                             \
                __var1__ = x;                                       \
                __var2__ = __expr[x];"
              .replace (/__var1__/g, _var1).replace (/__var2__/g, _var2).replace (/__expr__/g, _exp).replace (/\s+/g, " ");
            if (that.inside) res += that.inside.compile (opts, ctx);
            res += "} }) ();"
              .replace (/__var1__/g, _var1).replace (/__var2__/g, _var2).replace (/__expr__/g, _exp).replace ("\s+", " ");

        }
        return res;
    };

    that.until = "endtag";
    return that;
}

var tags = {
    'if' : NodeIf,
    'else' : NodeElse,
    'elseif' : NodeElIf,
    'do' : NodeDo,
    'let' : NodeLet,
    'for' : NodeFor,
    'macro' : NodeMacro
};

/*****************************************************************************************************
.#####....####...#####....####...######..#####..
.##..##..##..##..##..##..##......##......##..##.
.#####...######..#####....####...####....#####..
.##......##..##..##..##......##..##......##..##.
.##......##..##..##..##...####...######..##..##.
................................................
*****************************************************************************************************/

/**
 *  The parser is used to build a node tree : this node tree will present a compile () method
 *  that generates javascript code ready to be compiled.
 */
function Parser (specs) {
    var _lexer = Lexer (specs);
    var _root = NodeList ();
    var n = null;
    
    /**
     *  Parse comments in the input.
     *  @return nothing ! We ditch everything inside.
     */
    function _parse_comments () {
        var _balance = 1;

        do {
            n = _lexer.next ();

            if (n == tk_comment_close || n == tk_comment_close_spc) {
                _balance -= 1;
                continue;
            }
            if (n == tk_comment_open || n == tk_comment_open_spc) {
                _balance += 1;
                continue;
            }
        }
        while (n !== null && _balance > 0);

        if (_balance == 0)
            return;
        else
            throw "Unclosed Comment at line " + _lexer.lineno;
    }

    /**
     *  Parse a print statement. Usually delimited by {{ and }}
     *  The insides of the print statement are in turn parsed to escape
     *  variables and filters with the ctx. and env.filters. prefix respectively.
     *  @return a PrintNode
     */
    function _parse_print () {
        var stmt = "";

        do {
            n = _lexer.next ();
            if (n && n != tk_print_close) stmt += n;
        }
        while (n !== null && n != tk_print_close)

        if (n === null)
            throw "Waiting for " + tk_print_close + " at line" + _lexer.lineno;

        return NodePrint ({ contents: trim (stmt) });

    }

    /**
     *  Parse the input file.
     *  @return the root NodeList
     */
    function _parse_global (waiting_for) {
        var res = NodeList ();

        while (true) {
            n = _lexer.next ();
            if (n === null)
                break;

            if (n == tk_tag_open || n == tk_tag_open_spc) {
                var tag_contents = "";

                n = _lexer.next ();
                while (n !== null && n != tk_tag_close && n != tk_tag_close_spc) {
                    tag_contents += n;
                    n = _lexer.next ();
                }

                if (n === null)
                    throw "Waiting for " + tk_tag_close + " on line " + _lexer.lineno;

                var broke_tag = break_tag (tag_contents);

                if (waiting_for == broke_tag.tag)
                    return res;
                
                if (! tags[broke_tag.tag])
                    throw "No such tag or incorrect end tag : " + broke_tag.tag + " at line " + _lexer.lineno;
 
                var tag = tags[broke_tag.tag] ({ tag: broke_tag.tag, contents: broke_tag.contents });
                res.push (tag);

                if (tag.until == "endtag") {
                    tag.inside = _parse_global ("end" + broke_tag.tag);
                }

                if (tag.until == "endfile") {
                    tag.inside = _parse_global ();
                }

                continue;
            }

            if (n == tk_print_open) {
                res.push ( _parse_print () );
                continue;
            }

            if (n == tk_comment_open || n == tk_comment_open_spc) {
                _parse_comments ();
                continue;
            }

            res.push (n);
        }

        return res;
    }

    /**
     *  Holder function for _parse_global
     *  @return _parse_global's result
     */
    function parse (str) {
        _lexer.feed (str);
        var _cur = _root;

        _lexer.feed (str);
        n = "";
        return _parse_global ();
    }

    return {
        parse: parse
    };
}

/***********************************************************************************************
.######..######..##......######..######..#####....####..
.##........##....##........##....##......##..##..##.....
.####......##....##........##....####....#####....####..
.##........##....##........##....##......##..##......##.
.##......######..######....##....######..##..##...####..
........................................................
***********************************************************************************************/

var _default_env = { filters: {} };
var _filters = _default_env.filters;

_filters.in = function (obj, arr) {
    var x = null;
    for (x in arr) {
        if (arr.hasOwnProperty (x)) {
            if (obj === arr[x])
                return true;
        }
    }
    return false;
};

_filters.abs = function (num) {
    if (num < 0) return -num;
    else return num;
};

_filters.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

_filters.default = function (value, default_value) {
    if (value === undefined) return default_value;
    else return value;
}

_filters.filesizeformat = function (value) {
    // FIXME : value is a number, make it smaller to get
    // xxMb, xxGb, xxKb
    return value;
}

_filters.first = function (arr) {
    return arr[0];
}

_filters.last = function (arr) {
    if (arr.length == 0) return null;
    return arr[arr.length - 1];
}

_filters.groupby = function (arr, attribute) {
    // FIXME : Chain objects in array that have the same attribute.
    return _arr;
}

_filters.join = function (arr, string) {
    var i = 0;
    var _l = arr.length;
    var _res = "";

    for (i = 0; i < l; i++) {
        if (i > 0)
            _res += string;
        _res += arr[i].toString ();
    }
    return _res;
}

_filters.length = function (arr) {
    return arr.length;
}

_filters.lower = function (value) {
    return value.toLowerCase ();
}

_filters.upper = function (value) {
    return value.toUpperCase ();
}

_filters.replace = function (string, regexp, newvalue) {
    return string.replace (regexp, newvalue);
}

_filters.reverse = function (arr) {
    return arr.reverse ();
}

_filters.round = function (value, precision) {
    return value; // FIXME
}

/***********************************************************************************************
..####....####...##...##..#####...######..##.......####...######..######...####...##..##.
.##..##..##..##..###.###..##..##....##....##......##..##....##......##....##..##..###.##.
.##......##..##..##.#.##..#####.....##....##......######....##......##....##..##..##.###.
.##..##..##..##..##...##..##........##....##......##..##....##......##....##..##..##..##.
..####....####...##...##..##......######..######..##..##....##....######...####...##..##.
.........................................................................................
***********************************************************************************************/

exports.Parser = Parser;

/*

function makeJSCode (string) {
    var parsed = _parser.parse (string);
    var compiled_function = parsed.compile ();
    // console.log (compiled_function);

    var _result = "(function (ctx, env) { \
var _blocs = {}; \
env = env || _default_env; \
var _res = '';" + 
            compiled_function + 
        " return _res;})";
    return _result;
}

function makeTemplate (string) {
    return eval (makeJSCode (string));
}

var fs = require ("fs");

if (process.argv.length < 3) {
    console.warn ("Need files to convert !");
}

var files = process.argv.slice (2);
var i = 0;
var f = null;

for (i = 0; i < files.length; i++) {
    fs.readFile (files[i], 'utf-8', function (err, data) {
        console.log (makeJSCode (data));
    });
}
*/
