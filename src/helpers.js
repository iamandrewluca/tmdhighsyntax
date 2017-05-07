module.exports.appendStyles = function (styles) {
    var css = document.createElement('style');
    css.type = 'text/css';
    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.head.appendChild(css);
};

module.exports.appendScript = function (url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
};

module.exports.appendCss = function (url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
};
