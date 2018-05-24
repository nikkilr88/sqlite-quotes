const button = document.querySelector('button');
const reqBtn = document.querySelector('#request');
const learnBtn = document.querySelector('#learnMore');
const logo = document.querySelector('#logo-grey');

const howTo = document.querySelector('.howTo');
const request = document.querySelector('.request');

window.__forceSmoothScrollPolyfill__ = true;

[button, learnBtn].map(function(btn) {
    btn.addEventListener('click', function () {
        scrollTo(howTo);
    });
})

reqBtn.addEventListener('click', function() {
    scrollTo(request);
})

logo.addEventListener('click', function () {
    scrollTo(null);
});

function scrollTo(elem) {
    let pos = (!elem) ? 0 : elem.offsetTop;
    window.scroll({
        top: pos - 100,
        behavior: "smooth"
    });
}