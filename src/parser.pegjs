/**
    @title JinJS Parser

    @author Christophe Eymard <christophe.eymard@ravelsoft.com>
 */

{
    var tag_opening = "{%";
    var tag_closing = "%}";

    var comment_opening = "{#";
    var comment_closing = "#}";

    var print_opening = "{{";
    var print_closing = "}}";

    var comment_single_line = "#";
    var tag_single_line = "%";

    var nodes = require("./nodes").nodes;
    // var filters = require("./filters");

    var inside_tag = false;
    var inside_single_line = false;
}

toplevel
    = anything
    / space?

anything
    = any:any anything:anything { return any + anything; }
    / any

tag
    = "{%" bspl:"-"? space? tagname:identifier contents:anything space? espl:"-"? "%}"
    / "{%" bspl:"-"? space? end:identifier space? espl:"-"? "%}"

any
    = space
    / & { return inside_tag === false; } tag
    / & { return inside_single_line === false; } endline
    / char:. { return char; }

space
    = sp:[ \t]+ { return sp.join(""); }

endline
    // We eat up all the empty endlines to not perturbate indentation count.
    = end1:"\n" sp:space? end:endline { return end1 + sp + end; }
    / "\n" { return "\n"; }

