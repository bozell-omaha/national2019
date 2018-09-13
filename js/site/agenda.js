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

        if (agendaScroll <= -1) {
            agenda.classList.add('fixed');
            fixDays();
        } else if (agenda.classList.contains('fixed') && agendaScroll >= 1) {
            const agendaEvents = agenda.querySelector(
                '.agenda__day-wrapper.active'
            );
            agenda.classList.remove('fixed');
            agendaEvents.classList.remove('active');
        }
    };
}

function fixDays() {
    const dayWrappers = document.querySelectorAll('.agenda__day-wrapper');
    dayWrappers.forEach(wrapper => {
        const top = wrapper.getBoundingClientRect().top;
        const bottom = wrapper.getBoundingClientRect().bottom;
        if (top < 98) {
            wrapper.classList.add('active');
        } else {
            wrapper.classList.remove('active');
        }

        if (bottom < 98) {
            // wrapper.classList.remove('active');
            console.log('HEY!');
        }
    });
}

fixedAgenda();
