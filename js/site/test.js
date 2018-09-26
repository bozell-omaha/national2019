const eventTitles = document.querySelectorAll('.event__title');

eventTitles.forEach(title => {
    const description = title.nextElementSibling;
    const arrow = title.querySelector('.arrow-forward');
    title.addEventListener('click', e => {
        e.stopPropagation;
        // description.style.maxHeight = description.scrollHeight + 'px';
        if (!title.classList.contains('open')) {
            title.classList.add('open');
            description.style.transform = 'none';
        } else {
            title.classList.remove('open');
            description.style.transform = 'translateX(100%)';
        }
    });
});
