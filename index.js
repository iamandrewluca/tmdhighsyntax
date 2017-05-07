// ==UserScript==
// @name        TMD BB Code Highilighter
// @description This script will add a feauture to torrentsmd.com post menu. Use old code button, 20th in the row.
// @include     /^http(s)?:\/\/(www\.)?torrentsmd\.(com|me|eu)\/forum\.php\?action=(viewforum|viewtopic).+/
// @resource    codemirror_css https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/codemirror.min.css
// @require     https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/codemirror.min.js
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @copyright   2013+, trolic, Spider
// ==/UserScript==

(function ($) {

    // INJECT STYLES
    GM_addStyle(GM_getResourceText('codemirror_css'));

    // INJECT HTML
    $('<div class="jora">').appendTo(document.body);

    $(function () {

        // REMOVE OLD LISTENERS
        // ADD NEW LISTENERS

        console.log(666);

    });
})(jQuery);
