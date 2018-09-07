const topicContainer = document.querySelector('.ones-topics');
const topicSlides = topicContainer.querySelectorAll('.ones-topics__content');
const topicLinks = topicContainer.querySelectorAll('.ones-topics__topic');

function initTopics() {
    //Hide all slide that aren't active
    topicSlides.forEach(slide => {
        if (!hasClass(slide, 'active')) {
            TweenLite.set(slide, { autoAlpha: 0 });
        }
    });
}

function goToTopic(slideOut, slideIn) {
    let tl = new TimelineMax();

    tl.set(slideIn, { className: '+=active' })
        .set(slideOut, { className: '-=active' })
        .to(slideOut, 0.9, { y: 32, autoAlpha: 0, ease: Expo.easeInOut }, 0.1)
        .fromTo(
            slideIn,
            0.9,
            { y: 32, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, ease: Expo.easeInOut },
            0.1
        );
}

topicLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const slideOut = topicContainer.querySelector(
            '.ones-topics__content.active'
        );
        let slideIn;
        const dataIndex = this.getAttribute('data-index');
        const activeLink = topicContainer.querySelector(
            '.ones-topics__topic.active'
        );

        if (this.classList.contains('active')) {
            return;
        }

        activeLink.classList.remove('active');
        this.classList.add('active');

        topicSlides.forEach(slide => {
            if (slide.getAttribute('data-index') === dataIndex) {
                slideIn = slide;
            }
            return;
        });

        goToTopic(slideOut, slideIn);
    });
});

initTopics();
