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
    const agendaDays = document.querySelectorAll('.agenda-day');
    dayWrappers.forEach((wrapper, i) => {
        const top = wrapper.getBoundingClientRect().top;
        const bottom = wrapper.getBoundingClientRect().bottom;
        const wrapperDay = wrapper.getAttribute('data-day');
        if (top <= 98 && bottom >= 98) {
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
}

fixedAgenda();
