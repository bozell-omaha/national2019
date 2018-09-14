const speakers = document.querySelectorAll('.speaker:not(.speaker--clone)');

function initSpeakers() {
    const sections = document.querySelectorAll('.speakers');
    sections.forEach(section => {
        const height = section.getBoundingClientRect().height;
        section.style.height = `${height}px`;
    });
}

speakers.forEach(speaker => {
    speaker.addEventListener('click', () => {
        speaker.classList.add('active');
        const close = speaker.querySelector('.close-speaker');
        const root = document.documentElement;
        const body = document.body;
        const hero = document.querySelector('.interior-hero');
        const footer = document.querySelector('#footer');
        const headlines = document.querySelectorAll('.speakers__heading');
        const notActive = document.querySelectorAll('.speaker:not(.active)');
        const hiddenBio = speaker.querySelector('.speaker__bio');
        const pattern = document.querySelector('.speaker-bio__pattern');

        const allTheThings = document.querySelectorAll(
            '.speaker:not(.active), .speakers__heading, .interior-hero '
        );

        const tl = new TimelineMax();

        if (window.innerWidth < 750) {
            const bioPs = hiddenBio.querySelectorAll('p');
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
                .to(close, 0.8, { autoAlpha: 1 });
        } else {
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
                    { y: 0, autoAlpha: 1, ease: Expo.easeOut },
                    0.15
                )
                .to(
                    pattern,
                    0.8,
                    { autoAlpha: 1, ease: Expo.easeOut },
                    '-=0.4'
                );
        }
    });
});

function flip(speaker) {
    const inner = speaker.querySelector('.speaker__inner');
    const first = inner.getBoundingClientRect();

    speaker.classList.add('expanding');

    if (window.innerWidth > 750) {
        const margin =
            (window.innerHeight - speaker.getBoundingClientRect().height) /
                2 /
                2 +
            'px';
        inner.style.marginTop = margin;
        inner.style.top = margin;
    }

    inner.classList.add('move');

    const last = inner.getBoundingClientRect();

    var deltaY = first.top - last.top;
    var deltaX = first.left - last.left;

    TweenMax.fromTo(
        inner,
        1.6,
        { x: deltaX, y: deltaY },
        { transform: 'none', ease: Expo.easeInOut }
    );
}

initSpeakers();
