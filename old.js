// ==UserScript==
// @name       TMD BB Code Highilighter
// @description This script will add a feauture to torrentsmd.com post menu. Use old code button, 20th in the row.
// @include http://*.torrentsmd.*/forum.php?action=viewforum*
// @include http://*.torrentsmd.*/forum.php?action=viewtopic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013+, trolic, Spider
// ==/UserScript==

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
    if(elem != null) {
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

function appendStyle(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
}

var caretPosition = 0;
var txt = '';
var lang = '';
var linenumber = '';

$(document).ready(function() {
    $('.markItUpContainer > textarea').attr('id', 'posttext');
    $('.markItUpButton20 > a').mousedown(function() {
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

var styles = '\
#codeContainer {\
  position:fixed;\
  top:0;\
  left:0;\
  width:100%;\
  height:100%;\
  background-color:rgba(0,0,0,0.6);\
  }\
#codeContainer > form {\
  width:800px;\
  height:480px;\
  border:1px solid #fff;\
  position:fixed;\
  background-color:rgb(255,255,255);\
  top:50%;\
  left:50%;\
  margin:-240px 0 0 -400px;\
  }\
#closeCodeContainer {\
  width:26px;\
  height:26px;\
  float:right;\
  background-image:url("http://www.torrentsmd.com/pic/close.gif");\
  background-repeat:no-repeat;\
  background-size:26px 26px;\
  }\
#addCode {\
  float:right;\
  }\
#textAreaCode {\
  font-family:Courier;\
  font-size:12px;\
  resize:none;\
  width:796px;\
  height:449px;\
  background-color:#EEEFFF;\
  outline:none;\
  border:none;\
  border-top:1px solid #fff;\
  }\
#codeCredits {\
  width:800px;\
margin-left:-1px;\
text-align:center;\
color:#000;\
font-size:24px;\
font-family:Courier;\
line-height:50px;\
background-color:rgba(255,255,255,0.8);\
border:1px solid #fff;\
}\
';

var $bbcode = $('\
<div id="codeContainer">\
  <form method="POST" action="http://spider853.byethost17.com/highlighter2/tmd.php">\
    <select name="lang" id="langCode">\
        <option value="4cs">GADV 4CS</option>\
        <option value="6502acme">MOS 6502 (6510) ACME Cross Assembler format</option>\
        <option value="6502kickass">MOS 6502 (6510) Kick Assembler format</option>\
        <option value="6502tasm">MOS 6502 (6510) TASM/64TASS 1.46 Assembler format</option>\
        <option value="68000devpac">Motorola 68000 - HiSoft Devpac ST 2 Assembler format</option>\
        <option value="abap">ABAP</option>\
        <option value="actionscript">ActionScript</option>\
        <option value="actionscript3">ActionScript 3</option>\
        <option value="ada">Ada</option>\
        <option value="algol68">ALGOL 68</option>\
        <option value="apache">Apache configuration</option>\
        <option value="applescript">AppleScript</option>\
        <option value="apt_sources">Apt sources</option>\
        <option value="arm">ARM ASSEMBLER</option>\
        <option value="asm">ASM</option>\
        <option value="asp">ASP</option>\
        <option value="asymptote">asymptote</option>\
        <option value="autoconf">Autoconf</option>\
        <option value="autohotkey">Autohotkey</option>\
        <option value="autoit">AutoIt</option>\
        <option value="avisynth">AviSynth</option>\
        <option value="awk">awk</option>\
        <option value="bascomavr">BASCOM AVR</option>\
        <option value="bash">Bash</option>\
        <option value="basic4gl">Basic4GL</option>\
        <option value="bf">Brainfuck</option>\
        <option value="bibtex">BibTeX</option>\
        <option value="blitzbasic">BlitzBasic</option>\
        <option value="bnf">bnf</option>\
        <option value="boo">Boo</option>\
        <option value="c">C</option>\
        <option value="c_loadrunner">C (LoadRunner)</option>\
        <option value="c_mac">C (Mac)</option>\
        <option value="caddcl">CAD DCL</option>\
        <option value="cadlisp">CAD Lisp</option>\
        <option value="cfdg">CFDG</option>\
        <option value="cfm">ColdFusion</option>\
        <option value="chaiscript">ChaiScript</option>\
        <option value="cil">CIL</option>\
        <option value="clojure">Clojure</option>\
        <option value="cmake">CMake</option>\
        <option value="cobol">COBOL</option>\
        <option value="coffeescript">CoffeeScript</option>\
        <option value="cpp-qt">C++ (Qt)</option>\
        <option value="cpp" selected>C++</option>\
        <option value="csharp">C#</option>\
        <option value="css">CSS</option>\
        <option value="cuesheet">Cuesheet</option>\
        <option value="d">D</option>\
        <option value="dcl">DCL</option>\
        <option value="dcpu16">DCPU-16 Assembly</option>\
        <option value="dcs">DCS</option>\
        <option value="delphi">Delphi</option>\
        <option value="diff">Diff</option>\
        <option value="div">DIV</option>\
        <option value="dos">DOS</option>\
        <option value="dot">dot</option>\
        <option value="e">E</option>\
        <option value="ecmascript">ECMAScript</option>\
        <option value="eiffel">Eiffel</option>\
        <option value="email">eMail (mbox)</option>\
        <option value="epc">EPC</option>\
        <option value="erlang">Erlang</option>\
        <option value="euphoria">Euphoria</option>\
        <option value="f1">Formula One</option>\
        <option value="falcon">Falcon</option>\
        <option value="fo">FO (abas-ERP)</option>\
        <option value="fortran">Fortran</option>\
        <option value="freebasic">FreeBasic</option>\
        <option value="freeswitch">FreeSWITCH</option>\
        <option value="fsharp">F#</option>\
        <option value="gambas">GAMBAS</option>\
        <option value="gdb">GDB</option>\
        <option value="genero">genero</option>\
        <option value="genie">Genie</option>\
        <option value="gettext">GNU Gettext</option>\
        <option value="glsl">glSlang</option>\
        <option value="gml">GML</option>\
        <option value="gnuplot">Gnuplot</option>\
        <option value="go">Go</option>\
        <option value="groovy">Groovy</option>\
        <option value="gwbasic">GwBasic</option>\
        <option value="haskell">Haskell</option>\
        <option value="haxe">Haxe</option>\
        <option value="hicest">HicEst</option>\
        <option value="hq9plus">HQ9+</option>\
        <option value="html4strict">HTML</option>\
        <option value="html5">HTML5</option>\
        <option value="icon">Icon</option>\
        <option value="idl">Uno Idl</option>\
        <option value="ini">INI</option>\
        <option value="inno">Inno</option>\
        <option value="intercal">INTERCAL</option>\
        <option value="io">Io</option>\
        <option value="j">J</option>\
        <option value="java">Java</option>\
        <option value="java5">Java(TM) 2 Platform Standard Edition 5.0</option>\
        <option value="javascript">Javascript</option>\
        <option value="jquery">jQuery</option>\
        <option value="kixtart">KiXtart</option>\
        <option value="klonec">KLone C</option>\
        <option value="klonecpp">KLone C++</option>\
        <option value="latex">LaTeX</option>\
        <option value="lb">Liberty BASIC</option>\
        <option value="ldif">LDIF</option>\
        <option value="lisp">Lisp</option>\
        <option value="llvm">LLVM Intermediate Representation</option>\
        <option value="locobasic">Locomotive Basic</option>\
        <option value="logtalk">Logtalk</option>\
        <option value="lolcode">LOLcode</option>\
        <option value="lotusformulas">Lotus Notes @Formulas</option>\
        <option value="lotusscript">LotusScript</option>\
        <option value="lscript">LScript</option>\
        <option value="lsl2">LSL2</option>\
        <option value="lua">Lua</option>\
        <option value="m68k">Motorola 68000 Assembler</option>\
        <option value="magiksf">MagikSF</option>\
        <option value="make">GNU make</option>\
        <option value="mapbasic">MapBasic</option>\
        <option value="matlab">Matlab M</option>\
        <option value="mirc">mIRC Scripting</option>\
        <option value="mmix">MMIX</option>\
        <option value="modula2">Modula-2</option>\
        <option value="modula3">Modula-3</option>\
        <option value="mpasm">Microchip Assembler</option>\
        <option value="mxml">MXML</option>\
        <option value="mysql">MySQL</option>\
        <option value="nagios">Nagios</option>\
        <option value="netrexx">NetRexx</option>\
        <option value="newlisp">newlisp</option>\
        <option value="nsis">NSIS</option>\
        <option value="oberon2">Oberon-2</option>\
        <option value="objc">Objective-C</option>\
        <option value="objeck">Objeck Programming Language</option>\
        <option value="ocaml-brief">OCaml (brief)</option>\
        <option value="ocaml">OCaml</option>\
        <option value="octave">GNU Octave</option>\
        <option value="oobas">OpenOffice.org Basic</option>\
        <option value="oorexx">ooRexx</option>\
        <option value="oracle11">Oracle 11 SQL</option>\
        <option value="oracle8">Oracle 8 SQL</option>\
        <option value="oxygene">Oxygene (Delphi Prism)</option>\
        <option value="oz">OZ</option>\
        <option value="parasail">ParaSail</option>\
        <option value="parigp">PARI/GP</option>\
        <option value="pascal">Pascal</option>\
        <option value="pcre">PCRE</option>\
        <option value="per">per</option>\
        <option value="perl">Perl</option>\
        <option value="perl6">Perl 6</option>\
        <option value="pf">OpenBSD Packet Filter</option>\
        <option value="php-brief">PHP (brief)</option>\
        <option value="php">PHP</option>\
        <option value="pic16">PIC16</option>\
        <option value="pike">Pike</option>\
        <option value="pixelbender">Pixel Bender 1.0</option>\
        <option value="pli">PL/I</option>\
        <option value="plsql">PL/SQL</option>\
        <option value="postgresql">PostgreSQL</option>\
        <option value="povray">POVRAY</option>\
        <option value="powerbuilder">PowerBuilder</option>\
        <option value="powershell">PowerShell</option>\
        <option value="proftpd">ProFTPd configuration</option>\
        <option value="progress">Progress</option>\
        <option value="prolog">Prolog</option>\
        <option value="properties">PROPERTIES</option>\
        <option value="providex">ProvideX</option>\
        <option value="purebasic">PureBasic</option>\
        <option value="pycon">Python (console mode)</option>\
        <option value="pys60">Python for S60</option>\
        <option value="python">Python</option>\
        <option value="q">q/kdb+</option>\
        <option value="qbasic">QBasic/QuickBASIC</option>\
        <option value="rails">Rails</option>\
        <option value="rebol">REBOL</option>\
        <option value="reg">Microsoft Registry</option>\
        <option value="rexx">rexx</option>\
        <option value="robots">robots.txt</option>\
        <option value="rpmspec">RPM Specification File</option>\
        <option value="rsplus">R / S+</option>\
        <option value="ruby">Ruby</option>\
        <option value="sas">SAS</option>\
        <option value="scala">Scala</option>\
        <option value="scheme">Scheme</option>\
        <option value="scilab">SciLab</option>\
        <option value="sdlbasic">sdlBasic</option>\
        <option value="smalltalk">Smalltalk</option>\
        <option value="smarty">Smarty</option>\
        <option value="spark">SPARK</option>\
        <option value="sparql">SPARQL</option>\
        <option value="sql">SQL</option>\
        <option value="stonescript">StoneScript</option>\
        <option value="systemverilog">SystemVerilog</option>\
        <option value="tcl">TCL</option>\
        <option value="teraterm">Tera Term Macro</option>\
        <option value="text">Text</option>\
        <option value="thinbasic">thinBasic</option>\
        <option value="tsql">T-SQL</option>\
        <option value="typoscript">TypoScript</option>\
        <option value="unicon">Unicon (Unified Extended Dialect of Icon)</option>\
        <option value="upc">UPC</option>\
        <option value="urbi">Urbi</option>\
        <option value="uscript">Unreal Script</option>\
        <option value="vala">Vala</option>\
        <option value="vb">Visual Basic</option>\
        <option value="vbnet">vb.net</option>\
        <option value="vedit">Vedit macro language</option>\
        <option value="verilog">Verilog</option>\
        <option value="vhdl">VHDL</option>\
        <option value="vim">Vim Script</option>\
        <option value="visualfoxpro">Visual Fox Pro</option>\
        <option value="visualprolog">Visual Prolog</option>\
        <option value="whitespace">Whitespace</option>\
        <option value="whois">Whois (RPSL format)</option>\
        <option value="winbatch">Winbatch</option>\
        <option value="xbasic">XBasic</option>\
        <option value="xml">XML</option>\
        <option value="xorg_conf">Xorg configuration</option>\
        <option value="xpp">X++</option>\
        <option value="yaml">YAML</option>\
        <option value="z80">ZiLOG Z80 Assembler</option>\
        <option value="zxbasic">ZXBasic</option>\
    </select>\
    <input type="checkbox" name="linenumber" id="linenr" checked>\
    <label for="linenr">Line Numbering</label>\
    <div id="closeCodeContainer"></div>\
    <input type="button" id="addCode" value="Add BB code">\
    <br/>\
    <textarea name="txt" id="textAreaCode"></textarea>\
    <div id="codeCredits">Credits go to <a href="http://www.torrentsmd.com/userdetails.php?id=183319">trolic</a> & <a href="http://www.torrentsmd.com/userdetails.php?id=6544">Spider</a></div>\
  </form>\
</div>\
');
