
/*! ==UserScript==
// @name        TMD BB Code Highilighter
// @description This script will add a feauture to torrentsmd.com post menu. Use old code button, 20th in the row.
// @include     /^http(s)?:\/\/(www\.)?torrentsmd\.(com|me|eu)\/forum\.php\?action=(viewforum|viewtopic).+/
// @copyright   2013+, trolic, Spider
// ==/UserScript== */

import './polyfills';
import { appendStyle, addMarkupListeners, clickHandler } from './helpers'

import css from 'raw-loader!./styles.css';
import html from 'raw-loader!./markup.html';
import languages from 'json-loader!./languages.json';

jQuery(window).on('load', function(e) {

    appendStyle(css);

    $(html).appendTo(document.body);
    addMarkupListeners();

    $('.markItUpButton.code')
        .off('mousedown')
        .on('click', clickHandler)
        .trigger('click');


});

