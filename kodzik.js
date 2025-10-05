// Mechanizm generowania unikalnego kodu lobby i zapisywania go w localStorage
const STORAGE_KEY = 'lobbies';
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
document.getElementById('joinButton').onclick = function() {
    const entered = document.getElementById('lobbyCode').value.trim();
    const userName = localStorage.getItem('userName') || 'Anonim';
    if (!/^\d{4}$/.test(entered)) {
        alert('Wpisz poprawny 4-cyfrowy kod (np. 0423).');
        return;
    }
    const lobbies = loadLobbies();
    const lobby = lobbies.find(l => l.code === entered);
    if (!lobby) {
        alert('Lobby o podanym kodzie nie istnieje.');
        return;
    }
    if (!lobby.users) lobby.users = [];
    if (!lobby.users.includes(userName)) {
        lobby.users.push(userName);
        saveLobbies(lobbies);
    }
    sessionStorage.setItem('currentLobby', JSON.stringify(lobby));
    sessionStorage.setItem('userName', userName);
    window.location.href = `lobby.html?code=${encodeURIComponent(entered)}`;
};
document.getElementById('backButton').onclick = function() {
    window.location.href = 'index.html';
};
document.getElementById('createLobby').onclick = function() {
    window.location.href = 'dane_lobby.html';
};
