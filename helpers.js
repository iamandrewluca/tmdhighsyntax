export function appendStyle(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
}

export function addMarkupListeners() {

}

export function clickHandler(e) {
    e.preventDefault();
    jQuery('#myModal').css('display', 'block');
}


/**
 * @deprecated [description]
 * [getCaret description]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
// export function getCaret(node) {
//     if (node.selectionStart) {
//         return node.selectionStart;
//     } else if (!document.selection) {
//         return 0;
//     }

//     var c = parseInt('001', 8),
//         sel = document.selection.createRange(),
//         dul = sel.duplicate(),
//         len = 0;

//     dul.moveToElementText(node);
//     sel.text = c;
//     len = dul.text.indexOf(c);
//     sel.moveStart('character',-1);
//     sel.text = "";
//     return len;
// }

/**
 * @deprecated [description]
 * [setCaret description]
 * @param {[type]} elem     [description]
 * @param {[type]} caretPos [description]
 */
// export function setCaret(elem, caretPos) {
//     if(elem !== null) {
//         if(elem.createTextRange) {
//             var range = elem.createTextRange();
//             range.move('character', caretPos);
//             range.select();
//         }
//         else {
//             if(elem.selectionStart) {
//                 elem.focus();
//                 elem.setSelectionRange(caretPos, caretPos);
//             }
//             else
//                 elem.focus();
//         }
//     }
// }

