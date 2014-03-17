(function (root) {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        new SAT.ConsoleView(console);
        new SAT.HtmlView(document.getElementsByTagName("body")[0]);
    });

    SAT.addTest("Single element", function (console) {
        var root = ObjectToHtml(
            {div: {}}
            );

        console.log("Created: " + root.outerHTML);
        console.assert(root.outerHTML === "<div></div>");
    });

    SAT.addTest("A little hierarchy", function (console) {
        var root = ObjectToHtml(
            {div: {}, c: [
                {img: {}},
                {img: {}},
            ]});

        console.log("Created: " + root.outerHTML);
        console.assert(root.outerHTML === "<div><img><img></div>");
    });

    SAT.addTest("A little hierarchy and some attributes", function (console) {
        var root = ObjectToHtml(
            {div: {}, c: [
                {span: {}, t: "text"},
                {img: {src: "http://deletethis.net/dave/images/daverecent.png", class: "photo"}},
                {img: {"data-example1": "one", "data-example2": "two"}}
            ]});

        console.log("Created: " + root.outerHTML);
        console.assert(root.outerHTML === "<div><span>text</span><img class=\"photo\" src=\"http://deletethis.net/dave/images/daverecent.png\"><img data-example1=\"one\" data-example2=\"two\"></div>");
    });

    SAT.addTest("A little hierarchy, some attributes, and some events", function (console) {
        var clicked = false,
            root = ObjectToHtml(
                {div: {}, c: [
                    {img: {}},
                    {img: {id: "clickable"}, e: {click: function () { clicked = true; }}}
                ]});

        console.log("Created: " + root.outerHTML);
        root.querySelector("#clickable").click();
        console.assert(clicked);
    });

    SAT.addTest("A little hierarchy, and some style", function (console) {
        var clicked = false,
            root = ObjectToHtml(
                {div: {}, c: [
                    {img: {}},
                    {img: {}, s: {color: 'green', display: 'none' }}
                ]});

        console.log("Created: " + root.outerHTML);
        console.assert(root.outerHTML === "<div><img><img style=\"color: green; display: none;\"></div>");
    });

    SAT.addTest("Can't set events using attributes.", function (console) {
        var e;

        try {
            ObjectToHtml(
                {img: { src: "uri:doesntload", onerror: "throw new Exception(\"This shall not run.\");" }});
        }
        catch (eInner) {
            console.log("Successfully caught error: " + eInner);
            e = eInner;
        }
        console.assert(e !== undefined);
    });
})(this);