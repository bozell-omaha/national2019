function hasClass(el, cls) {
    return (
        el.className &&
        new RegExp('(\\s|^)' + cls + '(\\s|$)').test(el.className)
    );
}

function indexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i] == node) return num;
        if (children[i].nodeType == 1) num++;
    }
    return -1;
}
