const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextSlide = document.querySelector('.slide__nav-btn--next');
const prevSlide = document.querySelector('.slide__nav-btn--prev');

function init() {
    if (window.innerWidth < 990) {
        const slider = document.querySelector('.slider');
        const width = window.innerWidth;
        const slide = document.querySelector('.slide.active');
        const contentHeight = slide.querySelector('.slide__content')
            .offsetHeight;
        const theHeight = contentHeight + width + 96;
        slider.style.height = theHeight + 'px';
    }
    //Hide all slide that aren't active
    slides.forEach(slide => {
        if (!hasClass(slide, 'active')) {
            TweenLite.set(slide, { autoAlpha: 0 });
        }
    });
    // Disable arrow down on page load
    TweenLite.set(prevSlide, { autoAlpha: 0.2 });
}

function goToNextSlide(slideOut, slideIn) {
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
        TweenLite.to(nextSlide, 0.3, { autoAlpha: 0.2, ease: Linear.easeNone });
    }
}

function goToPrevSlide(slideOut, slideIn) {
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
    TweenLite.set(nextSlide, { autoAlpha: 1 });
    // Fade out arrow up on last slide
    if (slideInPos === 1) {
        TweenLite.to(prevSlide, 0.3, { autoAlpha: 0.2, ease: Linear.easeNone });
    }
}

nextSlide.addEventListener('click', e => {
    const slideOut = document.querySelector('.slide.active');
    const slideIn = document.querySelector('.slide.active').nextElementSibling;

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

init();
