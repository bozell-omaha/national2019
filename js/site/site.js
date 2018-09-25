console.log('Hi');
/*
=====================================
Helper Functions
=====================================
*/
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

const isIE =
    !!navigator.userAgent.match(/Trident/g) ||
    !!navigator.userAgent.match(/MSIE/g);

/*
=====================================
Home Page Functions
=====================================
*/
const homeSpeakerInit = () => {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const prevSlide = document.querySelector('.slide__nav-btn--prev');
    if (window.innerWidth < 990) {
        const slider = document.querySelector('.slider');
        const width = window.innerWidth;
        const slide = document.querySelector('.slide.active');
        const contentHeight = slide.querySelector('.slide__content')
            .offsetHeight;
        const theHeight = contentHeight + width + 200;
        slider.style.height = theHeight + 'px';
    }
    //Hide all slide that aren't active
    slides.forEach(slide => {
        if (!hasClass(slide, 'active')) {
            TweenLite.set(slide, { autoAlpha: 0 });
        }
    });
    // Disable arrow on page load
    TweenLite.set(prevSlide, { autoAlpha: 0.2 });
};

const speakerSlider = () => {
    const nextSlide = document.querySelector('.slide__nav-btn--next');
    const prevSlide = document.querySelector('.slide__nav-btn--prev');
    const goToNextSlide = (slideOut, slideIn) => {
        let tl = new TimelineMax();
        //slideOut items
        const slideOutImg = slideOut.querySelector('.slide__img--inner');
        const slideOutContent = slideOut.querySelector('.slide__content');
        //slideIn items
        const slideInPos =
            Array.from(slideIn.parentNode.children).indexOf(slideIn) + 1;
        const slideInImg = slideIn.querySelector('.slide__img--inner');
        const slideInContent = slideIn.querySelector('.slide__content');
        const size = [...document.querySelectorAll('.slide')].length;

        tl.to(slideIn, 0.4, { autoAlpha: 1, className: '+=active' })
            .to(slideOut, 0.4, { className: '-=active' })
            .to(slideOutImg, 1.1, { xPercent: 100, ease: Expo.easeInOut }, 0.1)
            .fromTo(
                slideInImg,
                1.1,
                { xPercent: -115, scale: 1.3 },
                { xPercent: 0, scale: 1, ease: Expo.easeInOut },
                0.1
            )
            .to(
                slideOutContent,
                0.9,
                { y: 32, autoAlpha: 0, ease: Expo.easeInOut },
                0.1
            )
            .fromTo(
                slideInContent,
                0.9,
                { y: 32, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, ease: Expo.easeInOut },
                0.1
            );

        // Fade out arrow up and fade in arrow down
        // Fade in arrow down
        TweenLite.set(prevSlide, { autoAlpha: 1 });
        // Fade out arrow up on last slide
        if (slideInPos === size) {
            TweenLite.to(nextSlide, 0.3, {
                autoAlpha: 0.2,
                ease: Linear.easeNone,
            });
        }
    };

    const goToPrevSlide = (slideOut, slideIn) => {
        let tl = new TimelineMax();
        //slideOut items
        const slideOutImg = slideOut.querySelector('.slide__img--inner');
        const slideOutContent = slideOut.querySelector('.slide__content');
        //slideIn items
        const slideInPos =
            Array.from(slideIn.parentNode.children).indexOf(slideIn) + 1;
        const slideInImg = slideIn.querySelector('.slide__img--inner');
        const slideInContent = slideIn.querySelector('.slide__content');

        tl.to(slideIn, 0.4, { autoAlpha: 1, className: '+=active' })
            .to(slideOut, 0.4, { className: '-=active' })
            .to(slideOutImg, 1.1, { xPercent: -100, ease: Expo.easeInOut }, 0.1)
            .fromTo(
                slideInImg,
                1.1,
                { xPercent: 115, scale: 1.3 },
                { xPercent: 0, scale: 1, ease: Expo.easeInOut },
                0.1
            )
            .to(
                slideOutContent,
                0.9,
                { y: 32, autoAlpha: 0, ease: Expo.easeInOut },
                0.1
            )
            .fromTo(
                slideInContent,
                0.9,
                { y: 32, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, ease: Expo.easeInOut },
                0.1
            );

        // Fade out arrow up and fade in arrow down
        // Fade in arrow down
        TweenLite.set(nextSlide, { autoAlpha: 1 });
        // Fade out arrow up on last slide
        if (slideInPos === 1) {
            TweenLite.to(prevSlide, 0.3, {
                autoAlpha: 0.2,
                ease: Linear.easeNone,
            });
        }
    };
    nextSlide.addEventListener('click', e => {
        const slideOut = document.querySelector('.slide.active');
        const slideIn = document.querySelector('.slide.active')
            .nextElementSibling;
        if (slideIn !== null) {
            goToNextSlide(slideOut, slideIn);
        }
    });
    prevSlide.addEventListener('click', e => {
        const slideOut = document.querySelector('.slide.active');
        const slideIn = document.querySelector('.slide.active')
            .previousElementSibling;
        if (slideIn !== null) {
            goToPrevSlide(slideOut, slideIn);
        }
    });
};

// const heroVideo = () => {
//     const modalBtn = document.querySelector('.js-tingle-modal');
//     modalBtn.addEventListener('click', function() {
//         var modalSurprise = new tingle.modal({
//             onClose: function() {
//                 modalSurprise.destroy();
//             },
//         });
//         modalSurprise.setContent(
//             '<iframe width="100%" height="400" src="https://www.youtube.com/embed/Vyi8x02GRuI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
//         );
//         modalSurprise.open();
//     });
// };

const initHeroSlides = () => {
    const carouselCells = document.querySelectorAll('.carousel-cell');
    //Hide all slide that aren't active
    carouselCells.forEach(cell => {
        if (!hasClass(cell, 'active')) {
            TweenLite.set(cell, { autoAlpha: 0 });
        }
    });
};

const homeCellSlider = () => {
    const nextCell = document.querySelector('.carousel-btn--next');
    const prevCell = document.querySelector('.carousel-btn--prev');

    const goToNextCell = (cellOut, cellIn) => {
        let tl = new TimelineMax();
        //cellOut items
        const cellOutHeading = cellOut.querySelector('h1');
        const cellOutContent = cellOut.querySelector('p');
        //slideIn items
        const cellInPos =
            Array.from(cellIn.parentNode.children).indexOf(cellIn) + 1;
        const cellInHeading = cellIn.querySelector('h1');
        const cellInContent = cellIn.querySelector('p');
        const size = [...document.querySelectorAll('.carousel-cell')].length;

        tl.to(cellIn, 0.4, { autoAlpha: 1, className: '+=active' })
            .to(cellOut, 0.4, { className: '-=active' })
            .to(
                cellOutHeading,
                0.9,
                {
                    yPercent: -32,
                    autoAlpha: 0,
                    ease: Quart.easeIn,
                },
                0.1
            )
            .to(
                cellOutContent,
                0.9,
                { yPercent: -32, autoAlpha: 0, ease: Quart.easeIn },
                0.2
            )
            .fromTo(
                cellInHeading,
                0.9,
                { yPercent: 32, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, ease: Expo.easeOut },
                1.2
            )

            .fromTo(
                cellInContent,
                0.9,
                { yPercent: 32, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, ease: Expo.easeOut },
                1.3
            );

        // Fade out arrow up and fade in arrow down
        // Fade in arrow down
        TweenLite.set(prevCell, { autoAlpha: 1 });
        // Fade out arrow up on last slide
        if (cellInPos === size) {
            TweenLite.to(nextCell, 0.3, {
                autoAlpha: 0.2,
                ease: Linear.easeNone,
            });
        }
    };

    const goToPrevCell = (cellOut, cellIn) => {
        let tl = new TimelineMax();
        //cellOut items
        const cellOutHeading = cellOut.querySelector('h1');
        const cellOutContent = cellOut.querySelector('p');
        //slideIn items
        const cellInPos =
            Array.from(cellIn.parentNode.children).indexOf(cellIn) + 1;
        const cellInHeading = cellIn.querySelector('h1');
        const cellInContent = cellIn.querySelector('p');
        const size = [...document.querySelectorAll('.carousel-cell')].length;

        tl.to(cellIn, 0.4, { autoAlpha: 1, className: '+=active' })
            .to(cellOut, 0.4, { className: '-=active' })
            .to(
                cellOutContent,
                0.9,
                { yPercent: 32, autoAlpha: 0, ease: Quart.easeIn },
                0.1
            )
            .to(
                cellOutHeading,
                0.9,
                {
                    yPercent: 32,
                    autoAlpha: 0,
                    ease: Quart.easeIn,
                },
                0.2
            )
            .fromTo(
                cellInContent,
                0.9,
                { yPercent: -32, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, ease: Expo.easeOut },
                1.2
            )
            .fromTo(
                cellInHeading,
                0.9,
                { yPercent: -32, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, ease: Expo.easeOut },
                1.3
            );

        // Fade out arrow up and fade in arrow down
        // Fade in arrow down
        TweenLite.set(nextCell, { autoAlpha: 1 });
        // Fade out arrow up on last slide
        if (cellInPos === 1) {
            TweenLite.to(prevCell, 0.3, {
                autoAlpha: 0.2,
                ease: Linear.easeNone,
            });
        }
    };

    nextCell.addEventListener('click', e => {
        const cellOut = document.querySelector('.carousel-cell.active');
        const cellIn = document.querySelector('.carousel-cell.active')
            .nextElementSibling;

        if (cellIn !== null) {
            goToNextCell(cellOut, cellIn);
        }
    });

    prevCell.addEventListener('click', e => {
        const cellOut = document.querySelector('.carousel-cell.active');
        const cellIn = document.querySelector('.carousel-cell.active')
            .previousElementSibling;

        if (cellIn !== null) {
            goToPrevCell(cellOut, cellIn);
        }
    });
};

const smallHeightHacks = () => {
    const tdaLogo = document.querySelector('.header__td-logo');
    const links = document.querySelectorAll('.nav-link--large');
    // const heroImg = document.querySelector('.home-hero__img');

    if (window.innerHeight < 850 && window.innerWidth > 750) {
        tdaLogo.style.display = 'none';
        links.forEach(link => {
            link.style.margin = '6px 0';
        });
        // heroImg.style.right = '-30%';
    } else if (window.innerHeight > 675 && window.innerWidth > 750) {
        tdaLogo.style.display = 'flex';
        links.forEach(link => {
            link.style.margin = '12px 0';
        });
        // heroImg.style.right = '-64px';
    }
};

/*
=====================================
BCL Functions
=====================================
*/
const BCLTopics = () => {
    const topicContainer = document.querySelector('.ones-topics');
    const topicSlides = topicContainer.querySelectorAll(
        '.ones-topics__content'
    );
    const topicLinks = topicContainer.querySelectorAll('.ones-topics__topic');

    const initTopics = () => {
        //Hide all slide that aren't active
        topicSlides.forEach(slide => {
            if (!hasClass(slide, 'active')) {
                TweenLite.set(slide, { autoAlpha: 0 });
            }
        });
    };

    const goToTopic = (slideOut, slideIn) => {
        let tl = new TimelineMax();
        tl.set(slideIn, { className: '+=active' })
            .set(slideOut, { className: '-=active' })
            .to(
                slideOut,
                0.9,
                { y: 32, autoAlpha: 0, ease: Expo.easeInOut },
                0.1
            )
            .fromTo(
                slideIn,
                0.9,
                { y: 32, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, ease: Expo.easeInOut },
                0.1
            );
    };

    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const slideOut = topicContainer.querySelector(
                '.ones-topics__content.active'
            );
            let slideIn;
            const dataIndex = this.getAttribute('data-index');
            const activeLink = topicContainer.querySelector(
                '.ones-topics__topic.active'
            );

            if (this.classList.contains('active')) {
                return;
            }

            activeLink.classList.remove('active');
            this.classList.add('active');

            topicSlides.forEach(slide => {
                if (slide.getAttribute('data-index') === dataIndex) {
                    slideIn = slide;
                }
                return;
            });

            goToTopic(slideOut, slideIn);
        });
    });

    initTopics();
};

/*
=====================================
Agenda Functions
=====================================
*/
const fixedAgenda = () => {
    const agenda = document.querySelector('#agenda');
    const header = document.querySelector('#header');
    const agendaHeight = agenda.getBoundingClientRect().height;
    const daysHeight = agenda
        .querySelector('.agenda__days')
        .getBoundingClientRect().height;
    const theHeight = (agendaHeight - daysHeight) * -1;

    const slideMenu = document.querySelector('.slide-menu');
    const arrow = document.querySelector('.arrow-forward');

    window.onscroll = () => {
        const scroll = window.pageYOffset;
        if (scroll >= 10 && !header.classList.contains('slim')) {
            if (slideMenu.classList.contains('open')) {
                slideMenu.classList.remove('open');
                TweenMax.to(slideMenu, 0.4, {
                    xPercent: -100,
                    autoAlpha: 0,
                });
                TweenMax.to(arrow, 0.4, { rotation: 360 });
            }
            header.classList.add('slim');
        }

        if (window.location.href.indexOf('agenda') > -1) {
            // alert('your url contains the name franky');
            const agendaScroll = agenda.getBoundingClientRect().top;
            const agendaBottom = agenda.getBoundingClientRect().bottom;

            if (window.innerWidth < 750) {
                const headerBottom = header.getBoundingClientRect().bottom;
                if (agendaScroll <= 80) {
                    agenda.classList.add('fixed');
                    header.classList.add('slide-up');
                    fixDays();
                } else if (agendaScroll >= 80) {
                    agenda.classList.remove('fixed');
                    header.classList.remove('slide-up');
                }
            }

            if (agendaScroll <= -1) {
                agenda.classList.add('fixed');
                agenda.classList.remove('bottom');
                fixDays();
            } else {
                agenda.classList.remove('fixed');
                removeActive();
            }

            if (agendaScroll <= theHeight) {
                agenda.classList.add('bottom');
                agenda.classList.remove('fixed');
                removeActive();
            }
        }
    };
};

const removeActive = () => {
    const agenda = document.querySelector('#agenda');
    const actives = agenda.querySelectorAll('.active');
    if (actives.length > 0) {
        actives.forEach(item => {
            item.classList.remove('active');
        });
    }
};

const fixDays = () => {
    const dayWrappers = document.querySelectorAll('.agenda__day-wrapper');
    const agendaDays = document.querySelectorAll('.agenda-day');
    const agenda = document.querySelector('#agenda');
    const sweetSpot =
        document.querySelector('.agenda__header').getBoundingClientRect()
            .height +
        document.querySelector('.agenda__events-header').getBoundingClientRect()
            .height;

    dayWrappers.forEach((wrapper, i) => {
        const top = wrapper.getBoundingClientRect().top;
        const bottom = wrapper.getBoundingClientRect().bottom;
        const wrapperDay = wrapper.getAttribute('data-day');

        if (top <= sweetSpot && bottom >= sweetSpot) {
            wrapper.classList.remove('bottom');
            wrapper.classList.add('active');
            agendaDays.forEach(day => {
                const theDay = day.getAttribute('data-day');
                if (wrapperDay == theDay) {
                    day.classList.add('active');
                }
            });
        } else if (wrapper.classList.contains('active')) {
            wrapper.classList.remove('active');
            wrapper.classList.add('bottom');
            agendaDays.forEach(day => {
                const theDay = day.getAttribute('data-day');
                if (wrapperDay == theDay) {
                    day.classList.remove('active');
                }
            });
        }
    });
};

const scrollAgenda = () => {
    const agendaDays = document.querySelectorAll('.agenda-day');
    const agenda = document.querySelector('#agenda');
    const dayWrappers = document.querySelectorAll('.agenda__day-wrapper');

    agendaDays.forEach((day, i) => {
        day.addEventListener('click', () => {
            const theDay = day.getAttribute('data-day');
            async function scrollAgenda(theDay) {
                if (!agenda.classList.contains('fixed')) {
                    window.scroll({
                        behavior: 'smooth',
                        top: agenda.offsetTop,
                    });
                }
            }

            scrollAgenda(theDay).then(() => {
                dayWrappers.forEach(wrapper => {
                    const wrapperDay = wrapper.getAttribute('data-day');
                    if (wrapperDay == theDay) {
                        if (window.innerWidth < 750) {
                            const mobileSweetSpot = document
                                .querySelector('.agenda__events-header')
                                .getBoundingClientRect().height;

                            window.scroll({
                                behavior: 'smooth',
                                top: wrapper.offsetTop + mobileSweetSpot,
                            });
                        } else {
                            const sweetSpot = document
                                .querySelector('.agenda__header')
                                .getBoundingClientRect().height;
                            window.scroll({
                                behavior: 'smooth',
                                top: wrapper.offsetTop - sweetSpot,
                            });
                        }
                    }
                });
            });
        });
    });
};

const showFilters = () => {
    const agendaHeader = document.querySelector('.agenda__header-search');
    const filterIcons = agendaHeader.querySelectorAll('.show-filters');
    const filterContainer = agendaHeader.querySelector('.agenda-filters');

    filterIcons.forEach(filter => {
        filter.addEventListener('click', () => {
            if (window.innerWidth < 750) {
                filterContainer.classList.toggle('slide');
            } else {
                filterContainer.classList.toggle('show');
            }
        });
    });
};

const filters = () => {
    const days = document.querySelectorAll('.agenda__day-wrapper');
    const inputs = document.querySelectorAll('.agenda-filter input');
    let isoArray = [];
    days.forEach(day => {
        const eventsWrapper = day.querySelector('.agenda__events');
        let iso = new Isotope(day, {
            itemSelector: '.event',
            layoutMode: 'vertical',
            stagger: 30,
        });
        isoArray.push(iso);
    });

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            var filters = [];
            var theFilters;
            inputs.forEach(checkbox => {
                if (checkbox.checked) {
                    filters.push(checkbox.value);
                }
                theFilters = filters.join(', ');
            });
            isoArray.forEach(iso => {
                iso.arrange({ filter: theFilters });
            });
        });
    });
};

/*
=====================================
Speaker Functions
=====================================
*/
const speakersInit = () => {
    const body = document.body;
    const docEl = document.documentElement;
    const grid = document.querySelector('.speaker-grid');
    const speakers = [...grid.querySelectorAll('.speaker')];
    const contents = [...document.querySelectorAll('.content > .content-item')];
    const closeTheSpeaker = document.querySelector('.content__close');
    const contentWrapper = document.querySelector('#barba-wrapper');
    const contentPattern = document.querySelector(
        '.content > .content__pattern'
    );
    let scrollPos;
    let activeSpeaker;

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

    const showOthers = () => {
        const allSpeakers = document.querySelectorAll('.speaker:not(.exclude)');
        TweenMax.staggerTo(allSpeakers, 0.8, {
            scale: 1,
            opacity: 1,
            ease: Expo.easeInOut,
            onComplete: () => {
                allSpeakers.forEach(speaker => {
                    speaker.style.transform = 'none';
                });
            },
        });
    };

    const hideTexts = (name, keynote) => {
        TweenMax.to([name, keynote], 0.5, {
            ease: Quart.easeIn,
            delay: 0,
            y: 20,
            opacity: 0,
        });
    };

    const showTexts = (name, keynote) => {
        TweenMax.to([name, keynote], 1, {
            ease: Expo.easeOut,
            delay: 1,
            y: 0,
            opacity: 1,
        });
    };

    const showContentElems = (contentEl, delay) => {
        // toggle the back control and scroll indicator.
        const title = contentEl.querySelector('.content-item__title');
        const text = contentEl.querySelector('.content-item__text');
        const close = document.querySelector('.content > .content__close');
        const position = contentEl.querySelector('.content-item__position');
        if (!title.classList.contains('charmed')) {
            charming(title);
            title.classList.add('charmed');
        }
        // And access the spans/letters.
        const titleLetters = title.querySelectorAll('span');
        TweenMax.to([close, text, position, contentPattern], 0.8, {
            ease: Expo.easeOut,
            delay: delay,
            startAt: { y: 60 },
            y: 0,
            opacity: 1,
        });

        setTimeout(() => {
            titleLetters.forEach((letter, pos) => {
                const delay = pos * 0.05;
                TweenMax.to(letter, 0.6, {
                    ease: Back.easeOut,
                    delay: delay,
                    startAt: { yPercent: '50%', opacity: 0 },
                    yPercent: '0',
                    opacity: 1,
                });
            });
        }, 1000);
    };

    const hideContentElems = (contentEl, delay) => {
        // toggle the back control and scroll indicator.
        const title = contentEl.querySelector('.content-item__title');
        const text = contentEl.querySelector('.content-item__text');
        const position = contentEl.querySelector('.content-item__position');
        const close = document.querySelector('.content > .content__close');
        // charming(title);
        // And access the spans/letters.
        const titleLetters = title.querySelectorAll('span');
        const titleLettersTotal = titleLetters.length;
        TweenMax.to([close, text, contentPattern, position], 0.8, {
            ease: Expo.easeIn,
            delay: 0,
            startAt: null,
            y: 60,
            opacity: 0,
        });

        titleLetters.forEach((letter, pos) => {
            TweenMax.to(letter, 0.3, {
                ease: Quart.easeIn,
                delay: (titleLettersTotal - pos - 1) * 0.04,
                yPercent: '50%',
                startAt: null,
                opacity: 0,
            });
        });
    };

    const getSizePosition = (el, scrolls = true) => {
        const scrollTop =
            window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft =
            window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        return {
            width: el.offsetWidth,
            height: el.offsetHeight,
            left: scrolls
                ? getOffset(el, 'left') - scrollLeft
                : getOffset(el, 'left'),
            top: scrolls
                ? getOffset(el, 'top') - scrollTop
                : getOffset(el, 'top'),
        };
    };

    const openSpeaker = speaker => {
        if (speaker.isAnimating) return;
        speaker.isAnimating = true;
        //grab elements we'll need
        const speakerBG = speaker.querySelector('.speaker__bg');
        const speakerImgWrap = speaker.querySelector('.speaker__wrap');
        const speakerImg = speaker.querySelector('.speaker__img');
        const speakerName = speaker.querySelector('.speaker__name');
        const speakerKeynote = speaker.querySelector('.speaker__keynote');
        const gridWrap = document.querySelector('.speaker-grid');
        speaker.classList.add('exclude');
        // Get the current scroll position.
        scrollPos = window.scrollY;
        // Disable Scroll
        disableScroll();
        //set the current value
        const current = speakers.indexOf(speaker);
        activeSpeaker = current;
        //Hide all the other Speakers
        hideOthers();
        hideTexts(speakerName, speakerKeynote);
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
            // rotation: -1 * speaker.angle * 2,
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
                contentWrapper.style.position = 'initial';
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

    const closeItem = item => {
        if (item.isAnimating) return;
        item.isAnimating = true;
        const gridWrap = document.querySelector('.speaker-grid');
        // Get the content element respective to this grid item.
        const contentEl = contents[activeSpeaker];
        const contentImg = contentEl.querySelector('.content-item__img');
        // Scroll to the previous scroll position before opening the item.
        window.scrollTo(0, scrollPos);
        contentEl.parentNode.style.position = 'fixed';
        // Disable page scrolling.
        disableScroll();
        // Showing the grid scroll.
        gridWrap.classList.remove('grid-wrap--hidden');
        // The item that is open.
        const gridItem = speakers[activeSpeaker];
        const gridItemImg = gridItem.querySelector('.speaker__img');
        const gridItemBg = gridItem.querySelector('.speaker__bg');
        const gridItemName = gridItem.querySelector('.speaker__name');
        const gridItemKeynote = gridItem.querySelector('.speaker__keynote');
        // Hide the back control and scroll indicator and all the item´s content elements.
        hideContentElems(contentEl, 0);
        // Set the grid´s image back to visible and hide the content´s one.
        gridItemImg.style.opacity = 1;
        contentImg.style.visibility = 'hidden';
        // Animate the grid´s image back to the grid position.
        TweenMax.to(gridItemImg, 1.2, {
            ease: Expo.easeInOut,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
            rotation: gridItem.angle * 2,
        });
        // And also the bg element.
        TweenMax.to(gridItemBg, 1.2, {
            ease: Expo.easeInOut,
            delay: 0.15,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            onComplete: () => {
                contentEl.classList.remove('content-item--current');
                gridItem.classList.remove('exclude');
                contentWrapper.style.position = 'relative';
                gridItemBg.style.position = 'absolute';
                gridItemBg.style.left = '0px';
                gridItemBg.style.top = '0px';
                activeSpeaker = -1;
                // allowTilt = true;
                gridItem.style.zIndex = 0;
                enableScroll();
                item.isAnimating = false;
            },
        });
        // Show all the grid items except the one we want to close.
        showOthers();
        // Also show the item texts. (1s delay)
        showTexts(gridItemName, gridItemKeynote);
    };

    const animationHover = (speaker, type, nameLetters) => {
        if (window.innerWidth > 990) {
            const bg = speaker.querySelector('.speaker__bg');
            // Scale up the bg element.
            TweenMax.to(bg, 1, {
                ease: Expo.easeOut,
                scale: type === 'mouseenter' ? 1.15 : 1,
            });
        }
    };

    if (isIE) {
        speakers.forEach(speaker => {
            speaker.classList.remove('no-barba');
        });
    } else {
        speakers.forEach(speaker => {
            const name = speaker.querySelector('.speaker__name');
            charming(name);
            const nameLetters = name.querySelectorAll('span');
            speaker.addEventListener('mouseenter', () => {
                animationHover(speaker, 'mouseenter', nameLetters);
            });

            speaker.addEventListener('mouseleave', () => {
                animationHover(speaker, 'mouseleave', nameLetters);
            });

            speaker.addEventListener('click', event => {
                event.preventDefault();
                openSpeaker(speaker);
            });
        });

        closeTheSpeaker.addEventListener('click', event => {
            event.preventDefault();
            // Get the content element respective to this grid item.
            const currentContent = document.querySelector(
                '.content-item--current'
            );
            closeItem(currentContent);
        });
    }
};

/*
=====================================
MOBILE NAV
=====================================
*/

function hamburger() {
    const burger = document.querySelector('.menu-icon');
    const links = document.querySelectorAll(
        '.nav-link:not(.nav-link--overview)'
    );
    const mobileLinks = document.querySelectorAll(
        '.mobile-nav__link:not(.has-drop)'
    );
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('.header');
    const slideMenu = document.querySelector('.slide-menu');
    const largeClose = document.querySelector('.header__close');
    const arrow = document.querySelector('.nav-link--large > .arrow-forward');

    burger.addEventListener('click', () => {
        if (window.innerWidth <= 990) {
            if (!burger.classList.contains('open')) {
                burger.classList.add('open');
                mobileNav.style.transform = 'none';
            } else {
                burger.classList.remove('open');
                mobileNav.style.transform = 'translateX(-100%)';
            }
        } else {
            if (!header.classList.contains('slim')) {
                header.classList.add('slim');
            } else {
                header.classList.remove('slim');
            }
        }
    });

    largeClose.addEventListener('click', () => {
        if (!header.classList.contains('slim')) {
            header.classList.add('slim');
        } else {
            header.classList.remove('slim');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth >= 990) {
                const active = document.querySelector(
                    '.nav-link.current-menu-item'
                );
                active.classList.remove('current-menu-item');
                link.classList.add('current-menu-item');
                header.classList.add('slim');
                if (slideMenu.classList.contains('open')) {
                    slideMenu.classList.remove('open');
                    TweenMax.to(slideMenu, 0.4, {
                        xPercent: -100,
                        autoAlpha: 0,
                    });
                    TweenMax.to(arrow, 0.4, { rotation: 360 });
                }
                setTimeout(() => {
                    ga('send', 'pageview', location.pathname);
                }, 1000);
            }
        });
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 990) {
                const active = document.querySelector(
                    '.nav-link.current-menu-item'
                );
                active.classList.remove('current-menu-item');
                link.classList.add('current-menu-item');
                burger.classList.remove('open');
                mobileNav.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    ga('send', 'pageview', location.pathname);
                }, 1000);
            }
        });
    });
}

const openAccordian = () => {
    const drops = document.querySelectorAll('.has-drop');

    drops.forEach(drop => {
        const parent = drop.parentElement;
        const dropdown = drop.nextElementSibling;
        const arrow = drop.querySelector('.arrow-down');

        drop.addEventListener('click', event => {
            event.preventDefault();
            if (!parent.classList.contains('open')) {
                parent.classList.add('open');
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            } else {
                parent.classList.remove('open');
                dropdown.style.maxHeight = '0';
            }
        });
    });
};

/*
=====================================
LARGE NAV - SLIDE MENU
=====================================
*/
function slideTheMenu() {
    const links = document.querySelectorAll(
        '.nav-link--overview, .slide-menu__back'
    );
    const arrow = document.querySelector('.arrow-forward');
    const slideMenu = document.querySelector('.slide-menu');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if (!slideMenu.classList.contains('open')) {
                slideMenu.classList.add('open');
                TweenMax.to(slideMenu, 0.4, {
                    autoAlpha: 1,
                    transform: 'none',
                });
                TweenMax.to(arrow, 0.4, { rotation: 180 });
            } else {
                slideMenu.classList.remove('open');
                TweenMax.to(slideMenu, 0.4, {
                    xPercent: -100,
                    autoAlpha: 0,
                });
                TweenMax.to(arrow, 0.4, { rotation: 360 });
            }
        });
    });
}

/*
=====================================
ON SCROLL DOWN - HIDE SIDE NAV
=====================================
*/
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */

function scrollSideNav() {
    const header = document.querySelector('#header');
    const slideMenu = document.querySelector('.slide-menu');
    const arrow = document.querySelector('.arrow-forward');
    window.onscroll = () => {
        const scroll = window.pageYOffset;
        if (scroll >= 10 && !header.classList.contains('slim')) {
            if (slideMenu.classList.contains('open')) {
                slideMenu.classList.remove('open');
                TweenMax.to(slideMenu, 0.4, {
                    xPercent: -100,
                    autoAlpha: 0,
                });
                TweenMax.to(arrow, 0.4, { rotation: 360 });
            }
            header.classList.add('slim');
        }
    };
}

/*
=====================================
Home Page View
=====================================
*/
const Homepage = Barba.BaseView.extend({
    namespace: 'home',
    onEnter() {
        homeSpeakerInit();
        initHeroSlides();
        smallHeightHacks();
        window.addEventListener('resize', () => {
            smallHeightHacks();
        });
    },
    onEnterCompleted() {
        // The Transition has just finished.
        speakerSlider();
        homeCellSlider();
    },
    onLeave() {
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted() {
        // The Container has just been removed from the DOM.
    },
});

/*
=====================================
BCL Page View
=====================================
*/
const BCLpage = Barba.BaseView.extend({
    namespace: 'business-consulting-lounge',
    onEnter() {
        BCLTopics();
    },
    onEnterCompleted() {
        // The Transition has just finished.
    },
    onLeave() {
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted() {
        // The Container has just been removed from the DOM.
    },
});

/*
=====================================
Agenda View
=====================================
*/
const Agendapage = Barba.BaseView.extend({
    namespace: 'agenda',
    onEnter() {
        // fixedAgenda();
        // scrollAgenda();
        // scrollSideNav();
        // showFilters();
        // filters();
    },
    onEnterCompleted() {
        // The Transition has just finished.
        fixedAgenda();
        scrollAgenda();
        // scrollSideNav();
    },
    onLeave() {
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted() {
        // The Container has just been removed from the DOM.
    },
});

/*
=====================================
Speakers Page View
=====================================
*/
const Speakers = Barba.BaseView.extend({
    namespace: 'speakers',
    onEnter() {
        // speakersInit();
    },
    onEnterCompleted() {
        // The Transition has just finished.
        speakersInit();
    },
    onLeave() {
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted() {
        // The Container has just been removed from the DOM.
    },
});

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
    hamburger();
    slideTheMenu();
    openAccordian();
    if (window.innerWidth > 990) {
        scrollSideNav();
    }
    if (window.innerHeight < 675 && window.innerWidth > 750) {
        document.body.classList.add('small');
    }

    window.addEventListener('resize', () => {
        if (window.innerHeight < 675 && window.innerWidth > 750) {
            document.body.classList.add('small');
        } else {
            document.body.classList.remove('small');
        }
    });
    let lastElementClicked;
    Homepage.init();
    BCLpage.init();
    Agendapage.init();
    Speakers.init();

    Barba.Pjax.start();
    Barba.Pjax.init();
    Barba.Prefetch.init();

    Barba.Dispatcher.on('linkClicked', function(el) {
        lastElementClicked = el;
    });

    const FadeTransition = Barba.BaseTransition.extend({
        start() {
            /**
             * This function is automatically called as soon the Transition starts
             * this.newContainerLoading is a Promise for the loading of the new container
             * (Barba.js also comes with an handy Promise polyfill!)
             */

            // As soon the loading is finished and the old page is faded out, let's fade the new page
            Promise.all([this.newContainerLoading, this.scrollTop()])
                // .then(this.fadeOut())
                .then(this.fadeIn.bind(this));
        },

        scrollTop() {
            return new Promise(resolve => {
                const obj = { y: window.pageYOffset };
                const container = this.oldContainer;
                const tl = new TimelineMax({ onComplete: resolve });

                tl.to(obj, 0.8, {
                    y: 0,
                    onUpdate() {
                        window.scroll(0, obj.y);
                    },
                    ease: Power4.easeOut,
                }).to(
                    container,
                    0.8,
                    { autoAlpha: 0, ease: Power4.easeOut },
                    0.1
                );
            });
        },

        fadeOut() {
            /**
             * this.oldContainer is the HTMLElement of the old Container
             */
            this.oldContainer.style.opacity = '0.5';

            return new Promise(resolve => {
                resolve();
            });
            // return this.oldContainer.animate({ opacity: 0 }).promise();
        },

        fadeIn() {
            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */

            const _this = this;
            const $el = this.newContainer;

            this.oldContainer.style.display = 'none';
            $el.style.opacity = '0';

            setTimeout(() => {
                TweenMax.to($el, 0.6, { autoAlpha: 1, onComplete: done });
            }, 2000);

            function done() {
                _this.done();
            }
        },
    });

    /**
     * Next step, you have to tell Barba to use the new Transition
     */

    Barba.Pjax.getTransition = function() {
        /**
         * Here you can use your own logic!
         * For example you can use different Transition based on the current page or link...
         */

        return FadeTransition;
    };
} else {
    document.addEventListener('DOMContentLoaded', () => {
        hamburger();
        slideTheMenu();
        openAccordian();
        if (window.innerWidth > 990) {
            scrollSideNav();
        }
        if (window.innerHeight < 675 && window.innerWidth > 750) {
            document.body.classList.add('small');
        }

        window.addEventListener('resize', () => {
            if (window.innerHeight < 675 && window.innerWidth > 750) {
                document.body.classList.add('small');
            } else {
                document.body.classList.remove('small');
            }
        });
        let lastElementClicked;
        Homepage.init();
        BCLpage.init();
        Agendapage.init();
        Speakers.init();

        Barba.Pjax.start();
        Barba.Pjax.init();
        Barba.Prefetch.init();

        Barba.Dispatcher.on('linkClicked', function(el) {
            lastElementClicked = el;
        });

        const FadeTransition = Barba.BaseTransition.extend({
            start() {
                /**
                 * This function is automatically called as soon the Transition starts
                 * this.newContainerLoading is a Promise for the loading of the new container
                 * (Barba.js also comes with an handy Promise polyfill!)
                 */

                // As soon the loading is finished and the old page is faded out, let's fade the new page
                Promise.all([this.newContainerLoading, this.scrollTop()])
                    // .then(this.fadeOut())
                    .then(this.fadeIn.bind(this));
            },

            scrollTop() {
                return new Promise(resolve => {
                    const obj = { y: window.pageYOffset };
                    const container = this.oldContainer;
                    const tl = new TimelineMax({ onComplete: resolve });

                    tl.to(obj, 0.8, {
                        y: 0,
                        onUpdate() {
                            window.scroll(0, obj.y);
                        },
                        ease: Power4.easeOut,
                    }).to(
                        container,
                        0.8,
                        { autoAlpha: 0, ease: Power4.easeOut },
                        0.1
                    );
                });
            },

            fadeOut() {
                /**
                 * this.oldContainer is the HTMLElement of the old Container
                 */
                this.oldContainer.style.opacity = '0.5';

                return new Promise(resolve => {
                    resolve();
                });
                // return this.oldContainer.animate({ opacity: 0 }).promise();
            },

            fadeIn() {
                /**
                 * this.newContainer is the HTMLElement of the new Container
                 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
                 * Please note, newContainer is available just after newContainerLoading is resolved!
                 */

                const _this = this;
                const $el = this.newContainer;

                this.oldContainer.style.display = 'none';
                $el.style.opacity = '0';

                setTimeout(() => {
                    TweenMax.to($el, 0.6, { autoAlpha: 1, onComplete: done });
                }, 2000);

                function done() {
                    _this.done();
                }
            },
        });

        /**
         * Next step, you have to tell Barba to use the new Transition
         */

        Barba.Pjax.getTransition = function() {
            /**
             * Here you can use your own logic!
             * For example you can use different Transition based on the current page or link...
             */

            return FadeTransition;
        };
    });
}
