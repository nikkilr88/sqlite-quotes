const button = document.querySelector('button');
const howTo = document.querySelector('.howTo');
const logo = document.querySelector('#logo-grey');

button.addEventListener('click', function() {
   scrollTo(howTo);
});

logo.addEventListener('click', function () {
    scrollTo(null);
});

function scrollTo(elem) {
    let pos = (!elem) ? 0 : elem.offsetTop;
    window.scroll({
        top: pos,
        behavior: "smooth"
    });
}