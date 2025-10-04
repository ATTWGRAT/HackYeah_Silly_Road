const input = document.getElementById('name');
const btn = document.getElementById('go');

btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) {
        alert('Wpisz ksywkę');
        return;
    }
    sessionStorage.setItem('userName', name);
    window.location.href = 'strona_startowa.html';
});