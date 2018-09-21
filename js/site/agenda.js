function fixedAgenda() {
    const agenda = document.querySelector('#agenda');
    const header = document.querySelector('#header');
    const agendaHeight = agenda.getBoundingClientRect().height;
    const daysHeight = agenda
        .querySelector('.agenda__days')
        .getBoundingClientRect().height;
    const theHeight = (agendaHeight - daysHeight) * -1;

    window.onscroll = () => {
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
    };
}

function removeActive() {
    const agenda = document.querySelector('#agenda');
    const actives = agenda.querySelectorAll('.active');
    if (actives.length > 0) {
        actives.forEach(item => {
            item.classList.remove('active');
        });
    }
}

function fixDays() {
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
}

function scrollAgenda() {
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
}

function showFilters() {
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
}

function filters() {
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
                console.log(iso);
                iso.arrange({ filter: theFilters });
                // if (iso.filteredItems.length == 0) {
                //     iso.element.parentElement.style.display = 'none';
                // } else {
                //     iso.element.parentElement.style.display = 'block';
                // }
            });
        });
    });
}

fixedAgenda();
scrollAgenda();
showFilters();
filters();
