const display = document.getElementById('display');
const back = document.getElementById('back');

const name = sessionStorage.getItem('userName');
if (name) {
    display.textContent = name;
} else {
    display.textContent = 'Nie znaleziono imienia';
}

back.addEventListener('click', () => {
    window.location.href = 'strona_przedstartowa.html';
});