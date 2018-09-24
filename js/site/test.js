// const homeCarouselInner = document.querySelectorAll('.carousel-cell__copy-inner');
const homeCarouselHeadings = document.querySelectorAll(
    '.carousel-cell__copy-inner > h1'
);

homeCarouselHeadings.forEach(heading => {
    charming(heading);
});
