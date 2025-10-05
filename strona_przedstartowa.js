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
})

const normalEmojis = ['🚗', '🚙', '🚲', '🚂'];
const sillyEmojis = ['😵‍💫', '🌀', '🌪️', '😵‍💫'];
const inputs = document.querySelectorAll('.text-input');

inputs.forEach(input => {
    input.addEventListener('mouseenter', function (e) {
        if (e.target.id === 'budzet') {
            createExplosion(e.target, normalEmojis);
        } else if (e.target.id === 'panstwo') {
            createExplosion(e.target, normalEmojis);
        } else {
            createExplosion(e.target, normalEmojis);
        }
    });

    input.addEventListener('focus', function (e) {
        if (e.target.id === 'budzet') {
            createExplosion(e.target, normalEmojis);
        } else if (e.target.id === 'panstwo') {
            createExplosion(e.target, normalEmojis);
        } else {
            createExplosion(e.target, normalEmojis);
        }
    });
});

function createExplosion(input, emojiList) {
    const rect = input.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const emojiCount = 8; /* jeszcze mniej emoji */

    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

        // Losowa pozycja startowa w obszarze inputa
        const startX = centerX + (Math.random() - 0.5) * rect.width;
        const startY = centerY + (Math.random() - 0.5) * rect.height;

        emoji.style.left = startX + 'px';
        emoji.style.top = startY + 'px';

        // Losowy wybór animacji eksplozji
        const explosions = ['explode1', 'explode2', 'explode3', 'explode4', 'explode5', 'explode6'];
        const randomExplosion = explosions[Math.floor(Math.random() * explosions.length)];

        // Zmieniona prędkość animacji
        const randomDuration = 1.8 + Math.random() * 1.5;
        const randomDelay = Math.random() * 0.1; // Bardzo małe opóźnienie

        emoji.style.animation = `${randomExplosion} ${randomDuration}s ease-out ${randomDelay}s forwards`;

        // Dodatkowe efekty wizualne
        if (Math.random() > 0.7) {
            emoji.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(${0.8 + Math.random() * 0.4})`;
        }

        // Losowe skalowanie
        const randomScale = 0.8 + Math.random() * 0.6;
        emoji.style.transform = `scale(${randomScale})`;

        document.body.appendChild(emoji);

        // Usuwanie emotki po zakończeniu animacji
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        }, (randomDuration + randomDelay) * 1000);
    }
};