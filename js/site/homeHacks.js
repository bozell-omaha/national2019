function smallHeightHacks() {
    const tdaLogo = document.querySelector('.header__td-logo');
    const links = document.querySelectorAll('.nav-link--large');
    const heroImg = document.querySelector('.home-hero__img');

    if (window.innerHeight < 675 && window.innerWidth > 750) {
        tdaLogo.style.display = 'none';
        links.forEach(link => {
            link.style.margin = '6px 0';
        });
        heroImg.style.right = '-30%';
    } else if (window.innerHeight > 675 && window.innerWidth > 750) {
        tdaLogo.style.display = 'flex';
        links.forEach(link => {
            link.style.margin = '12px 0';
        });
        heroImg.style.right = '-64px';
    }
}

smallHeightHacks();

window.addEventListener('resize', () => {
    smallHeightHacks();
});
