// const speakers = document.querySelectorAll('.speaker:not(.speaker--clone)');
// const closeBtns = document.querySelectorAll('.close-speaker');
// const mobileCloseBtns = document.querySelectorAll('.close-speaker--mobile');
const body = document.body;
const docEl = document.documentElement;
const grid = document.querySelector('.speaker-grid');
const speakers = [...grid.querySelectorAll('.speaker')];
const contents = [...document.querySelectorAll('.content > .content-item')];
const closeTheSpeaker = document.querySelector('.close__close');
let scrollPos;

//Window Size
let winsize;
const calcWinsize = () =>
    (winsize = { width: window.innerWidth, height: window.innerHeight });
calcWinsize();

// Calculates the offsetTop or offsetLeft of an element relative to the viewport
// (not counting with any transforms the element might have)
const getOffset = (elem, axis) => {
    let offset = 0;
    const type = axis === 'top' ? 'offsetTop' : 'offsetLeft';
    do {
        if (!isNaN(elem[type])) {
            offset += elem[type];
        }
    } while ((elem = elem.offsetParent));
    return offset;
};
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

//Hide All other speakers
const hideOthers = () => {
    const allSpeakers = document.querySelectorAll('.speaker:not(.exclude)');
    TweenMax.staggerTo(allSpeakers, 0.8, {
        scale: 0,
        opacity: 0,
        ease: Expo.easeInOut,
    });
};

const hideTexts = name => {
    TweenMax.to(name, 0.5, {
        ease: Quart.easeIn,
        delay: 0,
        y: 20,
        opacity: 0,
    });
};

const showContentElems = (contentEl, delay) => {
    // toggle the back control and scroll indicator.
    console.log(contentEl);
    const title = contentEl.querySelector('.content-item__title');
    const text = contentEl.querySelector('.content-item__text');
    const close = document.querySelector('.content > .content__close');
    charming(title);
    // And access the spans/letters.
    const titleLetters = title.querySelectorAll('span');
    const titleLettersTotal = titleLetters.length;
    title.style.opacity = '1';
    TweenMax.to([close, text], 0.8, {
        ease: Expo.easeOut,
        delay: delay,
        startAt: { y: 60 },
        y: 0,
        opacity: 1,
    });

    TweenMax.staggerFromTo(
        titleLetters,
        0.6,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, ease: Back.easeOut, delay: 1 },
        0.05
    );
};

const getSizePosition = (el, scrolls = true) => {
    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    return {
        width: el.offsetWidth,
        height: el.offsetHeight,
        left: scrolls
            ? getOffset(el, 'left') - scrollLeft
            : getOffset(el, 'left'),
        top: scrolls ? getOffset(el, 'top') - scrollTop : getOffset(el, 'top'),
    };
};

// Preload images.
imagesLoaded(document.querySelectorAll('.speaker-img'), () => {
    body.classList.remove('loading');
    var msnry = new Masonry(grid, {
        // options
        itemSelector: '.speaker',
        columnWidth: 260,
        gutter: 100,
        fitWidth: true,
    });
});

// speakers.forEach(speaker => {
//     speaker.addEventListener('click', event => {
//         event.preventDefault();
//         openSpeaker(speaker);
//     });
// });

const openSpeaker = speaker => {
    if (speaker.isAnimating) return;
    speaker.isAnimating = true;
    //grab elements we'll need
    const speakerBG = speaker.querySelector('.speaker__bg');
    const speakerImgWrap = speaker.querySelector('.speaker__wrap');
    const speakerImg = speaker.querySelector('.speaker__img');
    const speakerName = speaker.querySelector('.speaker__name');
    const gridWrap = document.querySelector('.speaker-grid');
    speaker.classList.add('exclude');
    // Get the current scroll position.
    scrollPos = window.scrollY;
    // Disable Scroll
    disableScroll();
    //set the current value
    const current = speakers.indexOf(speaker);
    //Hide all the other Speakers
    hideOthers();
    hideTexts(speakerName);
    // Get the "grid__item-bg" width and height and set it explicitly,
    // also set its top and left respective to the page.
    const itemDim = getSizePosition(speaker);
    speakerBG.style.width = `${itemDim.width}px`;
    speakerBG.style.height = `${itemDim.height}px`;
    speakerBG.style.left = `${itemDim.left}px`;
    speakerBG.style.top = `${itemDim.top}px`;
    // Set it to position fixed.
    speakerBG.style.position = 'fixed';
    speaker.style.zIndex = '1000';
    // Calculate the viewport diagonal. We will need to take this in consideration when scaling up the item´s bg element.
    const d = Math.hypot(winsize.width, winsize.height);
    // Scale up the item´s bg element.
    TweenMax.to(speakerBG, 1.2, {
        ease: Expo.easeInOut,
        delay: 0.4,
        x: winsize.width / 2 - (itemDim.left + itemDim.width / 2),
        y: winsize.height / 2 - (itemDim.top + itemDim.height / 2),
        scaleX: d / itemDim.width,
        scaleY: d / itemDim.height,
        rotation: -1 * speaker.angle * 2,
    });
    // Get the content element respective to this grid item.
    const contentEl = contents[current];
    // Set it to current.
    contentEl.classList.add('content-item--current');
    // Calculate the item´s image and content´s image sizes and positions.
    // We need this so we can scale up and translate the item´s image to the same size and position of the content´s image.
    const imgDim = getSizePosition(speakerImgWrap);
    const contentImgDim = getSizePosition(
        contentEl.querySelector('.content-item__img'),
        false
    );
    // Show the back control and scroll indicator and all the item´s content elements (1 second delay).
    showContentElems(contentEl, 1);
    TweenMax.to(speakerImg, 1.2, {
        ease: Expo.easeInOut,
        delay: 0.55,
        scaleX: contentImgDim.width / imgDim.width,
        scaleY: contentImgDim.height / imgDim.height,
        x:
            contentImgDim.left +
            contentImgDim.width / 2 -
            (imgDim.left + imgDim.width / 2),
        y:
            contentImgDim.top +
            contentImgDim.height / 2 -
            (imgDim.top + imgDim.height / 2),
        rotation: 0,
        onComplete: () => {
            // Hide the item´s image and show the content´s image. Should both be overlapping.
            speakerImg.style.opacity = 0;
            contentEl.querySelector('.content-item__img').style.visibility =
                'visible';
            // Set the main content wrapper to absolute so it´s position at the top.
            contentEl.parentNode.style.position = 'absolute';
            // Hiding the grid scroll.
            gridWrap.classList.add('grid-wrap--hidden');
            // Scroll up the page.
            window.scrollTo(0, 0);
            // Enable page scrolling.
            enableScroll();
            speaker.isAnimating = false;
        },
    });
};

// const closeSpeaker = speaker => {
//     if (this.isAnimating) return;
//     this.isAnimating = true;
//     // Get the content element respective to this grid item.
//     const current = speakers.indexOf(speaker);
//     const contentEl = contents[current];
//     // Scroll to the previous scroll position before opening the item.
//     window.scrollTo(0, this.scrollPos);
//     // contentEl.DOM.el.parentNode.style.position = 'fixed';
// };

// function initSpeakers() {
//     const sections = document.querySelectorAll('.speakers');
//     sections.forEach(section => {
//         const height = section.getBoundingClientRect().height;
//         section.style.height = `${height}px`;
//     });

//     if (window.innerWidth < 750) {
//         const speakerInners = document.querySelectorAll('.speaker__inner');
//         speakers.forEach(speaker => {
//             const bio = speaker.querySelector('.speaker__bio');
//             const height = speaker.getBoundingClientRect().height;
//             speaker.style.height = `${height}px`;
//             setTimeout(() => {
//                 bio.style.display = 'block';
//             }, 200);
//         });
//     }
// }

// speakers.forEach(speaker => {
//     speaker.addEventListener('click', () => {
//         if (speaker.classList.contains('active')) {
//             return;
//         }
//         speaker.classList.add('active');
//         const root = document.documentElement;
//         const body = document.body;
//         const footer = document.querySelector('#footer');
//         const hiddenBio = speaker.querySelector('.speaker__bio');
//         const pattern = document.querySelector('.speaker-bio__pattern');
//         const allTheThings = document.querySelectorAll(
//             '.speaker:not(.active), .speakers__heading, .interior-hero '
//         );
//         const tl = new TimelineMax();

//         if (window.innerWidth < 750) {
//             const bioPs = hiddenBio.querySelectorAll('p');
//             const close = speaker.querySelector('.close-speaker--mobile');
//             tl.set(bioPs, { autoAlpha: 0 })
//                 .set(hiddenBio, {
//                     display: 'block',
//                     position: 'relative',
//                     zIndex: 12,
//                     autoAlpha: 1,
//                 })
//                 .set(root, { className: '+=no-scroll' })
//                 .set(body, { className: '+=no-scroll' })
//                 .set(footer, { autoAlpha: 0, ease: Expo.easeInOut })
//                 .to(
//                     allTheThings,
//                     0.9,
//                     { scale: 1.3, autoAlpha: 0, ease: Expo.easeInOut },
//                     0.1
//                 )
//                 .call(flip, [speaker], this, '-=0.7')
//                 .staggerFromTo(
//                     bioPs,
//                     1,
//                     { y: 40 },
//                     { y: 0, autoAlpha: 1, ease: Expo.easeOut },
//                     0.15
//                 )
//                 .to(close, 0.8, { autoAlpha: 1 })
//                 .set(speaker, { overflow: 'initial' });
//         } else {
//             const close = speaker.querySelector('.close-speaker');
//             const bioContainer = document.querySelector(
//                 '.speaker-bio__container'
//             );
//             let theBioInner = document.querySelector('.speaker-bio__inner');
//             theBioInner.innerHTML = hiddenBio.innerHTML;
//             const bioPs = theBioInner.querySelectorAll('p');

//             tl.set(bioPs, { autoAlpha: 0 })
//                 .set(bioContainer, { autoAlpha: 1, zIndex: 5 })
//                 .set(root, { className: '+=no-scroll' })
//                 .set(body, { className: '+=no-scroll' })
//                 .set(footer, { autoAlpha: 0, ease: Expo.easeInOut })
//                 .to(
//                     allTheThings,
//                     0.9,
//                     { scale: 1.3, autoAlpha: 0, ease: Expo.easeInOut },
//                     0.1
//                 )
//                 .call(flip, [speaker], this, '-=0.7')
//                 .staggerFromTo(
//                     bioPs,
//                     1,
//                     { y: 40 },
//                     { y: 0, autoAlpha: 1, ease: Power4.easeOut },
//                     0.15
//                 )
//                 .to(pattern, 0.8, { autoAlpha: 1, ease: Expo.easeOut }, '-=0.4')
//                 .to(close, 0.8, { autoAlpha: 1, ease: Expo.easeOut });
//         }
//     });
// });

// function flip(speaker) {
//     const inner = speaker.querySelector('.speaker__inner');
//     const first = inner.getBoundingClientRect();

//     speaker.classList.add('expanding');

//     if (window.innerWidth < 750) {
//         inner.style.height = '100vh';
//         inner.classList.add('move');
//         const last = inner.getBoundingClientRect();
//         var deltaY = first.top - last.top;
//         var deltaX = first.left - last.left;
//         var deltaW = first.width / window.innerWidth;
//         var deltaH = window.innerHeight / last.height;
//         TweenMax.fromTo(
//             inner,
//             1.3,
//             {
//                 transformOrigin: 'top left',
//                 x: deltaX,
//                 y: deltaY,
//                 scale: deltaW,
//             },
//             {
//                 transformOrigin: 'top left',
//                 x: 0,
//                 y: 0,
//                 transform: 'none',
//                 ease: Power4.easeOut,
//             }
//         );
//     }

//     if (window.innerWidth > 750) {
//         const margin =
//             (window.innerHeight - speaker.getBoundingClientRect().height) / 2 +
//             'px';
//         inner.style.top = margin;
//         inner.classList.add('move');
//         const last = inner.getBoundingClientRect();
//         let deltaY = first.top - last.top;
//         let deltaX = first.left - last.left;

//         TweenMax.fromTo(
//             inner,
//             1.3,
//             { x: deltaX, y: deltaY },
//             { transform: 'none', ease: Power2.easeOut }
//         );
//     }
// }

// closeBtns.forEach(btn => {
//     const parent = btn.parentElement;
//     const speaker = parent.parentElement;

//     btn.addEventListener('click', () => {
//         if (!parent.classList.contains('move')) {
//             return;
//         }
//         const root = document.documentElement;
//         const body = document.body;
//         const footer = document.querySelector('#footer');
//         const bioContainer = document.querySelector('.speaker-bio__container');
//         const bioPs = bioContainer.querySelectorAll('p');
//         const pattern = document.querySelector('.speaker-bio__pattern');
//         const allTheThings = document.querySelectorAll(
//             '.speaker:not(.active), .speakers__heading, .interior-hero '
//         );
//         const tl = new TimelineMax({ onComplete: removeTransform });

//         tl.to(btn, 0.8, { autoAlpha: 0, ease: Expo.easeOut })
//             .staggerTo(
//                 bioPs,
//                 0.8,
//                 { y: -40, autoAlpha: 0, ease: Power4.easeIn },
//                 0.1,
//                 '-=0.6'
//             )
//             .to(pattern, 0.8, { autoAlpha: 0, ease: Expo.easeOut }, '-=0.6')
//             .set(bioContainer, { autoAlpha: 0, zIndex: -1 })
//             .set(root, { className: '-=no-scroll' })
//             .set(body, { className: '-=no-scroll' })
//             .set(footer, { autoAlpha: 1, ease: Expo.easeInOut })
//             .call(flipBack, [speaker], this, '-=0.6')
//             .to(allTheThings, 0.9, {
//                 scale: 1,
//                 autoAlpha: 1,
//                 ease: Power3.easeInOut,
//             })
//             .set(speaker, { className: '-=active' });

//         function removeTransform() {
//             speakers.forEach(speaker => {
//                 speaker.style.transform = 'none';
//             });
//         }
//     });
// });

// mobileCloseBtns.forEach(btn => {
//     const speaker = btn.parentElement;
//     btn.addEventListener('click', () => {
//         const root = document.documentElement;
//         const body = document.body;
//         const footer = document.querySelector('#footer');
//         const bioContainer = document.querySelector('.speaker-bio__container');
//         const bioPs = bioContainer.querySelectorAll('p');
//         const allTheThings = document.querySelectorAll(
//             '.speaker:not(.active), .speakers__heading, .interior-hero '
//         );
//         const tl = new TimelineMax({ onComplete: removeTransform });

//         if (window.innerWidth < 750) {
//             tl.to(btn, 0.8, { autoAlpha: 0, ease: Expo.easeOut })
//                 .staggerTo(
//                     bioPs,
//                     0.8,
//                     { y: -40, autoAlpha: 0, ease: Power4.easeIn },
//                     0.1,
//                     '-=0.6'
//                 )
//                 .set(root, { className: '-=no-scroll' })
//                 .set(body, { className: '-=no-scroll' })
//                 .set(footer, { autoAlpha: 1, ease: Expo.easeInOut })
//                 .call(flipBack, [speaker], this, '-=0.6')
//                 .to(allTheThings, 0.9, {
//                     scale: 1,
//                     autoAlpha: 1,
//                     zIndex: 'initial',
//                     ease: Power3.easeInOut,
//                 })
//                 .set(speaker, { className: '-=active' });
//         }

//         function removeTransform() {
//             speakers.forEach(speaker => {
//                 speaker.style.transform = 'none';
//             });
//         }
//     });
// });

// function flipBack(speaker) {
//     const inner = speaker.querySelector('.speaker__inner');
//     const first = inner.getBoundingClientRect();

//     speaker.classList.remove('expanding');

//     if (window.innerWidth < 750) {
//         inner.querySelector('.speaker__bio').style.display = 'none';
//         inner.style.top = 0;
//         inner.style.height = 'initial';
//         inner.classList.remove('move');
//         const last = inner.getBoundingClientRect();

//         var deltaY = first.top - last.top;
//         var deltaX = first.left - last.left;
//         var deltaW = window.innerWidth / last.width;
//         var deltaH = last.height / last.height;

//         TweenMax.fromTo(
//             inner,
//             1.1,
//             {
//                 transformOrigin: 'top left',
//                 x: deltaX,
//                 y: deltaY,
//                 scale: deltaW,
//             },
//             {
//                 transformOrigin: 'top left',
//                 transform: 'none',
//                 ease: Power4.easeOut,
//             }
//         );
//     } else {
//         inner.classList.remove('move');

//         const last = inner.getBoundingClientRect();

//         var deltaY = first.top - last.top;
//         var deltaX = first.left - last.left;

//         TweenMax.fromTo(
//             inner,
//             1.6,
//             { x: deltaX, y: deltaY },
//             { transform: 'none', ease: Power4.easeOut }
//         );
//     }
// }

// initSpeakers();
