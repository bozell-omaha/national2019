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

initHeroSlides();
