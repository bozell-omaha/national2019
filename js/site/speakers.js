const speakers = document.querySelectorAll('.speaker:not(.speaker--clone)');
const closeBtns = document.querySelectorAll('.close-speaker');
const mobileCloseBtns = document.querySelectorAll('.close-speaker--mobile');

function initSpeakers() {
    const sections = document.querySelectorAll('.speakers');
    sections.forEach(section => {
        const height = section.getBoundingClientRect().height;
        section.style.height = `${height}px`;
    });

    if (window.innerWidth < 750) {
        const speakerInners = document.querySelectorAll('.speaker__inner');
        speakers.forEach(speaker => {
            const bio = speaker.querySelector('.speaker__bio');
            const height = speaker.getBoundingClientRect().height;
            speaker.style.height = `${height}px`;
            setTimeout(() => {
                bio.style.display = 'block';
            }, 200);
        });
    }
}

speakers.forEach(speaker => {
    speaker.addEventListener('click', () => {
        if (speaker.classList.contains('active')) {
            return;
        }
        speaker.classList.add('active');
        const root = document.documentElement;
        const body = document.body;
        const footer = document.querySelector('#footer');
        const hiddenBio = speaker.querySelector('.speaker__bio');
        const pattern = document.querySelector('.speaker-bio__pattern');
        const allTheThings = document.querySelectorAll(
            '.speaker:not(.active), .speakers__heading, .interior-hero '
        );
        const tl = new TimelineMax();

        if (window.innerWidth < 750) {
            const bioPs = hiddenBio.querySelectorAll('p');
            const close = speaker.querySelector('.close-speaker--mobile');
            tl.set(bioPs, { autoAlpha: 0 })
                .set(hiddenBio, {
                    display: 'block',
                    position: 'relative',
                    zIndex: 12,
                    autoAlpha: 1,
                })
                .set(root, { className: '+=no-scroll' })
                .set(body, { className: '+=no-scroll' })
                .set(footer, { autoAlpha: 0, ease: Expo.easeInOut })
                .to(
                    allTheThings,
                    0.9,
                    { scale: 1.3, autoAlpha: 0, ease: Expo.easeInOut },
                    0.1
                )
                .call(flip, [speaker], this, '-=0.7')
                .staggerFromTo(
                    bioPs,
                    1,
                    { y: 40 },
                    { y: 0, autoAlpha: 1, ease: Expo.easeOut },
                    0.15
                )
                .to(close, 0.8, { autoAlpha: 1 })
                .set(speaker, { overflow: 'initial' });
        } else {
            const close = speaker.querySelector('.close-speaker');
            const bioContainer = document.querySelector(
                '.speaker-bio__container'
            );
            let theBioInner = document.querySelector('.speaker-bio__inner');
            theBioInner.innerHTML = hiddenBio.innerHTML;
            const bioPs = theBioInner.querySelectorAll('p');

            tl.set(bioPs, { autoAlpha: 0 })
                .set(bioContainer, { autoAlpha: 1, zIndex: 5 })
                .set(root, { className: '+=no-scroll' })
                .set(body, { className: '+=no-scroll' })
                .set(footer, { autoAlpha: 0, ease: Expo.easeInOut })
                .to(
                    allTheThings,
                    0.9,
                    { scale: 1.3, autoAlpha: 0, ease: Expo.easeInOut },
                    0.1
                )
                .call(flip, [speaker], this, '-=0.7')
                .staggerFromTo(
                    bioPs,
                    1,
                    { y: 40 },
                    { y: 0, autoAlpha: 1, ease: Power4.easeOut },
                    0.15
                )
                .to(pattern, 0.8, { autoAlpha: 1, ease: Expo.easeOut }, '-=0.4')
                .to(close, 0.8, { autoAlpha: 1, ease: Expo.easeOut });
        }
    });
});

function flip(speaker) {
    const inner = speaker.querySelector('.speaker__inner');
    const first = inner.getBoundingClientRect();

    speaker.classList.add('expanding');

    if (window.innerWidth < 750) {
        inner.style.height = '100vh';
        inner.classList.add('move');
        const last = inner.getBoundingClientRect();
        var deltaY = first.top - last.top;
        var deltaX = first.left - last.left;
        var deltaW = first.width / window.innerWidth;
        var deltaH = window.innerHeight / last.height;
        TweenMax.fromTo(
            inner,
            1.3,
            {
                transformOrigin: 'top left',
                x: deltaX,
                y: deltaY,
                scale: deltaW,
            },
            {
                transformOrigin: 'top left',
                x: 0,
                y: 0,
                transform: 'none',
                ease: Power4.easeOut,
            }
        );
    }

    if (window.innerWidth > 750) {
        const margin =
            (window.innerHeight - speaker.getBoundingClientRect().height) / 2 +
            'px';
        inner.style.top = margin;
        inner.classList.add('move');
        const last = inner.getBoundingClientRect();
        let deltaY = first.top - last.top;
        let deltaX = first.left - last.left;

        TweenMax.fromTo(
            inner,
            1.3,
            { x: deltaX, y: deltaY },
            { transform: 'none', ease: Power2.easeOut }
        );
    }
}

closeBtns.forEach(btn => {
    const parent = btn.parentElement;
    const speaker = parent.parentElement;

    btn.addEventListener('click', () => {
        if (!parent.classList.contains('move')) {
            return;
        }
        const root = document.documentElement;
        const body = document.body;
        const footer = document.querySelector('#footer');
        const bioContainer = document.querySelector('.speaker-bio__container');
        const bioPs = bioContainer.querySelectorAll('p');
        const pattern = document.querySelector('.speaker-bio__pattern');
        const allTheThings = document.querySelectorAll(
            '.speaker:not(.active), .speakers__heading, .interior-hero '
        );
        const tl = new TimelineMax({ onComplete: removeTransform });

        tl.to(btn, 0.8, { autoAlpha: 0, ease: Expo.easeOut })
            .staggerTo(
                bioPs,
                0.8,
                { y: -40, autoAlpha: 0, ease: Power4.easeIn },
                0.1,
                '-=0.6'
            )
            .to(pattern, 0.8, { autoAlpha: 0, ease: Expo.easeOut }, '-=0.6')
            .set(bioContainer, { autoAlpha: 0, zIndex: -1 })
            .set(root, { className: '-=no-scroll' })
            .set(body, { className: '-=no-scroll' })
            .set(footer, { autoAlpha: 1, ease: Expo.easeInOut })
            .call(flipBack, [speaker], this, '-=0.6')
            .to(allTheThings, 0.9, {
                scale: 1,
                autoAlpha: 1,
                ease: Power3.easeInOut,
            })
            .set(speaker, { className: '-=active' });

        function removeTransform() {
            speakers.forEach(speaker => {
                speaker.style.transform = 'none';
            });
        }
    });
});

mobileCloseBtns.forEach(btn => {
    const speaker = btn.parentElement;
    btn.addEventListener('click', () => {
        const root = document.documentElement;
        const body = document.body;
        const footer = document.querySelector('#footer');
        const bioContainer = document.querySelector('.speaker-bio__container');
        const bioPs = bioContainer.querySelectorAll('p');
        const allTheThings = document.querySelectorAll(
            '.speaker:not(.active), .speakers__heading, .interior-hero '
        );
        const tl = new TimelineMax({ onComplete: removeTransform });

        if (window.innerWidth < 750) {
            tl.to(btn, 0.8, { autoAlpha: 0, ease: Expo.easeOut })
                .staggerTo(
                    bioPs,
                    0.8,
                    { y: -40, autoAlpha: 0, ease: Power4.easeIn },
                    0.1,
                    '-=0.6'
                )
                .set(root, { className: '-=no-scroll' })
                .set(body, { className: '-=no-scroll' })
                .set(footer, { autoAlpha: 1, ease: Expo.easeInOut })
                .call(flipBack, [speaker], this, '-=0.6')
                .to(allTheThings, 0.9, {
                    scale: 1,
                    autoAlpha: 1,
                    zIndex: 'initial',
                    ease: Power3.easeInOut,
                })
                .set(speaker, { className: '-=active' });
        }

        function removeTransform() {
            speakers.forEach(speaker => {
                speaker.style.transform = 'none';
            });
        }
    });
});

function flipBack(speaker) {
    const inner = speaker.querySelector('.speaker__inner');
    const first = inner.getBoundingClientRect();

    speaker.classList.remove('expanding');

    if (window.innerWidth < 750) {
        inner.querySelector('.speaker__bio').style.display = 'none';
        inner.style.top = 0;
        inner.style.height = 'initial';
        inner.classList.remove('move');
        const last = inner.getBoundingClientRect();

        var deltaY = first.top - last.top;
        var deltaX = first.left - last.left;
        var deltaW = window.innerWidth / last.width;
        var deltaH = last.height / last.height;

        TweenMax.fromTo(
            inner,
            1.1,
            {
                transformOrigin: 'top left',
                x: deltaX,
                y: deltaY,
                scale: deltaW,
            },
            {
                transformOrigin: 'top left',
                transform: 'none',
                ease: Power4.easeOut,
            }
        );
    } else {
        inner.classList.remove('move');

        const last = inner.getBoundingClientRect();

        var deltaY = first.top - last.top;
        var deltaX = first.left - last.left;

        TweenMax.fromTo(
            inner,
            1.6,
            { x: deltaX, y: deltaY },
            { transform: 'none', ease: Power4.easeOut }
        );
    }
}

initSpeakers();
