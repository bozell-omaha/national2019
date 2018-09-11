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
            secondaryHeader();
        } else if (agenda.classList.contains('fixed') && agendaScroll >= 0) {
            agenda.classList.remove('fixed');
        }
    };
}

function secondaryHeader() {
    const agenda = document.querySelector('#agenda');
    const headers = agenda.querySelectorAll('.agenda__events-header');
    const activeHeader = agenda.querySelector('.agenda__events-header.active');
    const activeBottom = activeHeader.getBoundingClientRect().bottom;
    const activeTop = activeHeader.getBoundingClientRect().top;

    headers.forEach(header => {
        if (!header.classList.contains('active')) {
            const headerTop = header.getBoundingClientRect().top;
            const headerBottom = header.getBoundingClientRect().bottom;
            console.log(Math.round(headerTop));
            console.log(Math.round(activeBottom));

            if (Math.round(headerTop) == Math.round(activeBottom)) {
                activeHeader.classList.add('past');
                activeHeader.classList.remove('active');
                header.classList.add('active');
            }
        }

        // if (header.classList.contains('active')) {
        //     const prevParentSibling =
        //         header.parentElement.previousElementSibling;
        //     if (prevParentSibling) {
        //         console.log(prevParentSibling);
        //     }
        // }
    });
}

fixedAgenda();
