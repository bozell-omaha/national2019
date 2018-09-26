const eventTitles = document.querySelectorAll('.event__title');
const eventCloseBtns = document.querySelectorAll('.mobile-desc__close');
const body = document.body;
const docEl = document.documentElement;
//Disable/Enable Scroll Things
// Scroll control functions. Taken from https://stackoverflow.com/a/4770179.
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
const preventDefault = e => {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
};
const preventDefaultForScrollKeys = e => {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
};
const disableScroll = () => {
    if (window.addEventListener)
        // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
};
const enableScroll = () => {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
};

eventTitles.forEach(title => {
    const description = title.nextElementSibling;
    title.addEventListener('click', e => {
        e.stopPropagation;
        description.style.transform = 'none';
        disableScroll();
    });
});

eventCloseBtns.forEach(btn => {
    const container = btn.parentElement.parentElement;
    btn.addEventListener('click', e => {
        e.stopPropagation;
        container.style.transform = 'translateX(100%)';
        enableScroll();
    });
});
