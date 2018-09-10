function fixedAgenda() {
    const agenda = document.querySelector('#agenda');
    const header = document.querySelector('#header');

    window.onscroll = () => {
        const agendaScroll = agenda.getBoundingClientRect().top;

        if (window.innerWidth < 750) {
            const headerBottom = header.getBoundingClientRect().bottom;
            console.log(agendaScroll);
            if (agendaScroll <= 80) {
                agenda.classList.add('fixed');
                header.classList.add('slide-up');
            } else if (agendaScroll >= 80) {
                agenda.classList.remove('fixed');
                header.classList.remove('slide-up');
            }
        }

        if (agendaScroll <= 0) {
            agenda.classList.add('fixed');
        } else if (agenda.classList.contains('fixed') && agendaScroll >= 0) {
            agenda.classList.remove('fixed');
        }
    };
}

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
        // else {
        //     header.classList.remove('slim');
        // }
    };
}

fixedAgenda();
