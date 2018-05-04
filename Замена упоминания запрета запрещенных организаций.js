// ==UserScript==
// @name         Замена упоминания запрета запрещенных организаций
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       tampermonkey@P0p0v.ru
// @match        http://*.imperiyanews.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
var replaceArry = [
    [/\-?\s?\S?((Террористическ\S*|об\S?)?\s?организаци\S+\W?\s*)?(\,?\s?деятельность которой\s?)?запрещен\S* (в|на территори\S*) (России|РФ|Росийской Федерации)\S?/gi,    '␥'],
    [/\-?\s?\S?((Террористическ\S*|об\S?)?\s?организаци\S+\W?\s*)?(\,?\s?деятельность которой\s?)?(в|на территори\S*) (России|РФ|Росийской Федерации)\S? запрещен\S*/gi,    '␥'],

    // etc.
];
var numTerms    = replaceArry.length;
var txtWalker   = document.createTreeWalker (
    document.body,
    NodeFilter.SHOW_TEXT,
    {   acceptNode: function (node) {
            //-- Skip whitespace-only nodes
            if (node.nodeValue.trim() )
                return NodeFilter.FILTER_ACCEPT;

            return NodeFilter.FILTER_SKIP;
        }
    },
    false
);
var txtNode     = null;

while (txtNode  = txtWalker.nextNode () ) {
    var oldTxt  = txtNode.nodeValue;

    for (var J  = 0;  J < numTerms;  J++) {
        oldTxt  = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
    }
    txtNode.nodeValue = oldTxt;
}

    // Your code here...
})();