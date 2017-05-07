// ==UserScript==
// @name       TMD BB Code Highilighter
// @description This script will add a feauture to torrentsmd.com post menu. Use old code button, 20th in the row.
// @include https://torrentsmd.*/forum.php?action=viewforum*
// @include https://torrentsmd.*/forum.php?action=viewtopic*
// @copyright  2013+, trolic, Spider
// ==/UserScript==


HTMLTextAreaElement.prototype.insertAtCaret = function (text) {
  text = text || '';
  if (document.selection) {
    // IE
    this.focus();
    var sel = document.selection.createRange();
    sel.text = text;
  } else if (this.selectionStart || this.selectionStart === 0) {
    // Others
    var startPos = this.selectionStart;
    var endPos = this.selectionEnd;
    this.value = this.value.substring(0, startPos) +
      text +
      this.value.substring(endPos, this.value.length);
    this.selectionStart = startPos + text.length;
    this.selectionEnd = startPos + text.length;
  } else {
    this.value += text;
  }
};

function getCaret(node) {
    if (node.selectionStart) {
        return node.selectionStart;
    } else if (!document.selection) {
        return 0;
    }

    var c = "\001",
        sel = document.selection.createRange(),
        dul = sel.duplicate(),
        len = 0;

    dul.moveToElementText(node);
    sel.text = c;
    len = dul.text.indexOf(c);
    sel.moveStart('character',-1);
    sel.text = "";
    return len;
}

function setCaret(elem, caretPos) {
    if(elem !== null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

var caretPosition = 0;
var txt = '';
var lang = '';
var linenumber = '';

$(document).ready(function() {

    $('.markItUpContainer > textarea').attr('id', 'posttext');
    $('.markItUpButton.code').click(function(e) {
        console.log(666);
        e.preventDefault();
        var posttext = document.getElementById('posttext');
        caretPosition = getCaret(posttext);
        appendStyle(styles);
        $bbcode.appendTo('body');

        $('#closeCodeContainer').mouseup(function() {
            $('#posttext').focus();
            $bbcode.remove();
        }).mouseover(function() {
            $(this).css('cursor', 'pointer');
        }).mouseout(function() {
            $(this).css('cursor', 'default');
        });

        $('#codeContainer > form > textarea').focus();

        $('#codeContainer > form').on('keydown', '#textAreaCode', function(e) {
            var keyCode = e.keyCode || e.which;

            if (keyCode == 9) {
                e.preventDefault();
                var textAreaCode = document.getElementById('textAreaCode');
                var caret = getCaret(textAreaCode);
                var tab = '        ';
                textAreaCode.value = textAreaCode.value.substring(0, caret) + tab + textAreaCode.value.substring(caret, textAreaCode.value.length);
                setCaret(textAreaCode, caret + tab.length);
            }
        });

        $("#codeContainer > form").submit(function(e) {
            var postData = 'txt=' + txt + '&lang=' + lang + '&linenumber=' + linenumber;
            var formURL = $(this).attr('action');
            $.ajax({
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data) {
                    data = $('<div />').html(data).text();
                    posttext.value = posttext.value.substring(0, caretPosition) + data + posttext.value.substring(caretPosition, posttext.value.length);
                    $('#posttext').focus();
                    setCaret(posttext, caretPosition + data.length);
                    $bbcode.remove();
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    alert('Failed to reach/load from server :(');
                }
            });
            e.preventDefault();
        });

        $('#addCode').mouseup(function() {
            txt = $('#textAreaCode').val();
            lang = $('#langCode').val();
            linenumber = $('#linenr').val();

            if (txt.length === 0) {
                return false;
            }

            $("#codeContainer > form").submit();
        });

        return false;
    });
});
