const back = document.getElementById('back');
const createBtn = document.getElementById('nowe_lobby');
const nameInput = document.getElementById('name');

const STORAGE_KEY = 'lobbies';

back.addEventListener('click', () => {
    window.location.href = 'strona_przedstartowa.html';
});

function loadLobbies() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}
function saveLobbies(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function gen4Digit() {
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}
function generateUniqueCode(existing) {
    const existingSet = new Set(existing.map(l => l.code));
    for (let i = 0; i < 10000; i++) {
        const code = gen4Digit();
        if (!existingSet.has(code)) return code;
    }
    return null;
}

createBtn.addEventListener('click', () => {
    const owner = nameInput.value.trim() || 'Anonim';
    const lobbies = loadLobbies();

    const code = generateUniqueCode(lobbies);
    if (!code) {
        alert('Brak dostępnych kodów — spróbuj później.');
        return;
    }

    const createdAt = new Date().toISOString();
    const lobby = { code, owner, createdAt };

    lobbies.push(lobby);
    saveLobbies(lobbies);

    sessionStorage.setItem('currentLobby', JSON.stringify(lobby));
    sessionStorage.setItem('userName', owner);

    window.location.href = `lobby.html?code=${encodeURIComponent(code)}`;
});

document.getElementById('przycisk_kodzik').addEventListener('click', () => {
    const entered = nameInput.value.trim();
    // Sprawdzenie formatu: dokładnie 4 cyfry
    if (!/^\d{4}$/.test(entered)) {
        alert('Wpisz poprawny 4-cyfrowy kod (np. 0423).');
        return;
    }

    // Pobierz listę lobby z localStorage
    let lobbies = [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        lobbies = raw ? JSON.parse(raw) : [];
    } catch {
        lobbies = [];
    }

    // Znajdź lobby o podanym kodzie
    const lobby = lobbies.find(l => l.code === entered);
    if (!lobby) {
        alert('Lobby o podanym kodzie nie istnieje.');
        return;
    }

    // Zapisz aktualne lobby i imię (opcjonalnie) oraz przekieruj
    sessionStorage.setItem('currentLobby', JSON.stringify(lobby));
    sessionStorage.setItem('userName', lobby.owner || '');
    window.location.href = `lobby.html?code=${encodeURIComponent(entered)}`;
});