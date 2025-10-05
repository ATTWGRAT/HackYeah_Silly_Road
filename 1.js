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
function getUserName() {
    return localStorage.getItem('userName') || 'Anonim';
}
document.addEventListener('DOMContentLoaded', function() {
    const createLobbyBtn = document.getElementById('createLobby');
    if (createLobbyBtn) {
        createLobbyBtn.onclick = function() {
            window.location.href = 'dane_lobby.html';
        };
    }
    const joinBtn = document.getElementById('joinButton');
    if (joinBtn) {
        joinBtn.onclick = function() {
            const entered = document.getElementById('lobbyCode').value.trim();
            const userName = getUserName();
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
            // SprawdŸ, które dane wyjazdu s¹ puste
            const wyjazdKeys = ['dojazd', 'zakwaterowanie'];
            let len = parseInt(lobby.length, 10);
            if (isNaN(len) || len < 2) len = 2;
            let attractionsCount = 2 + (len - 2) * 3;
            for (let i = 1; i <= attractionsCount; i++) {
                wyjazdKeys.push(`atrakcja${i}`);
            }
            wyjazdKeys.push('powrot');
            let firstEmpty = null;
            for (let i = 0; i < wyjazdKeys.length; i++) {
                if (!sessionStorage.getItem(`wyjazd_${entered}_${wyjazdKeys[i]}`)) {
                    firstEmpty = i;
                    break;
                }
            }
            if (firstEmpty === null) {
                window.location.href = 'podsumowanie.html';
            } else {
                sessionStorage.setItem('wyjazd_step', firstEmpty);
                window.location.href = 'dane_wyjazdu.html';
            }
        };
    }
    const backBtn = document.getElementById('backButton');
    if (backBtn) {
        backBtn.onclick = function() {
            window.location.href = 'start.html';
        };
    }
});
