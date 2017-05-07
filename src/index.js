
/*! ==UserScript==
 // @name        TMD BB Code Highilighter
 // @description This script will add a feauture to torrentsmd.com post menu. Use old code button, 20th in the row.
 // @include     /^http(s)?:\/\/(www\.)?torrentsmd\.(com|me|eu)\/forum\.php\?action=(viewforum|viewtopic).+/
 // @copyright   2013+, trolic, Spider
 // ==/UserScript== */

require('./polyfills');
var helpers = require('./helpers');

// Add CodeMirror CSS and theme
helpers.appendCss('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/codemirror.min.css');
helpers.appendCss('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/theme/monokai.min.css');

// Add modal CSS
helpers.appendStyles(require('raw-loader!./styles.css'));

// Add modal HTML
jQuery(require('raw-loader!./markup.html')).appendTo(document.body);

require("codemirror/addon/edit/closebrackets");
var codeMirror = require("codemirror");

var languages = require('json-loader!./languages.json');

jQuery(window).on('load', function() {

    var modal = document.getElementById('codeModal');
    var span = modal.getElementsByClassName("close")[0];

    span.onclick = function() { modal.style.display = "none"; };
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    var textArea = document.getElementById('textAreaCode');
    var editor = codeMirror.fromTextArea(textArea, {
        mode: 'javascript',
        lineNumbers: true,
        lineWrapping: false,
        smartIndent: true,
        autoRefresh: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
        matchTags: true,
        theme: 'monokai'
    });
    editor.refresh();

    jQuery('.markItUpButton.code')
        .off('mousedown')
        .on('click', function (e) {
            e.preventDefault();
            jQuery('#codeModal').css('display', 'block');
        })
        .trigger('click');

});

