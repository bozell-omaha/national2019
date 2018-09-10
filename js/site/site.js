// "babel-poly.js";
// @codekit-prepend "helper.js";
// "slider.js";
// "topics.js";
console.log('Hi');

function hamburger() {
    const burger = document.querySelector('.menu-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('.header');

    burger.addEventListener('click', () => {
        if (window.innerWidth <= 990) {
            if (!burger.classList.contains('open')) {
                burger.classList.add('open');
                mobileNav.style.transform = 'none';
            } else {
                burger.classList.remove('open');
                mobileNav.style.transform = 'translateX(-100%)';
            }
        } else {
            if (!header.classList.contains('slim')) {
                header.classList.add('slim');
            } else {
                header.classList.remove('slim');
            }
        }
    });
}

/*
=====================================
MOBILE NAV
=====================================
*/
function openAccordian(e) {
    event.preventDefault();
    const parent = e.parentElement;
    const dropdown = e.nextElementSibling;
    const arrow = e.querySelector('.arrow-down');

    if (!parent.classList.contains('open')) {
        parent.classList.add('open');
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
    } else {
        parent.classList.remove('open');
        dropdown.style.maxHeight = '0';
    }
    console.log(arrow);
}

/*
=====================================
LARGE NAV - SLIDE MENU
=====================================
*/
function slideTheMenu() {
    const links = document.querySelectorAll(
        '.nav-link--overview, .slide-menu__back'
    );
    const arrow = document.querySelector('.arrow-forward');
    const slideMenu = document.querySelector('.slide-menu');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if (!slideMenu.classList.contains('open')) {
                slideMenu.classList.add('open');
                TweenMax.to(slideMenu, 0.4, {
                    autoAlpha: 1,
                    transform: 'none',
                });
                TweenMax.to(arrow, 0.4, { rotation: 180 });
            } else {
                slideMenu.classList.remove('open');
                TweenMax.to(slideMenu, 0.4, {
                    xPercent: -100,
                    autoAlpha: 0,
                });
                TweenMax.to(arrow, 0.4, { rotation: 360 });
            }
        });
    });
}

/*
=====================================
ON SCROLL DOWN - HIDE SIDE NAV
=====================================
*/
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */

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

hamburger();
slideTheMenu();
if (window.innerWidth > 990) {
    scrollSideNav();
}

function smallHeightHacks() {
    const tdaLogo = document.querySelector('.header__td-logo');
    const links = document.querySelectorAll('.nav-link--large');
    const heroImg = document.querySelector('.home-hero__img');

    if (window.innerHeight < 675) {
        tdaLogo.style.display = 'none';
        links.forEach(link => {
            link.style.margin = '6px 0';
        });
        heroImg.style.right = '-30%';
    } else if (window.innerHeight > 675) {
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
