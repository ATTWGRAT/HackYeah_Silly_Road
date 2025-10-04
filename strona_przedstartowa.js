// Przyciski i element wyniku
//const przycisk_ksywy = document.getElementById("przycisk_ksywy");
const przycisk2 = document.getElementById("przycisk2");
//const przejdz = document.getElementById("przejdz");
const wynik = document.getElementById("wynik");

//przejdz.addEventListener("click", () => {
 //   window.location.href = "strona_startowa.html";
//});

// 1. Po kliknięciu pierwszego przycisku zmień kolor tła

document.getElementById("przejdz").addEventListener("click", () => {
    window.location.href = "strona_startowa.html";
})
document.getElementById("iksde").addEventListener("click", () => {
    window.location.href = "lobbiszcze.html";
   // document.body.style.backgroundColor = getRandomColor();
    //wynik.textContent = "Kolor tła został zmieniony!";
})


// 2. Po kliknięciu drugiego przycisku pokaż wiadomość
przycisk2.addEventListener("click", () => {
    wynik.textContent = "Kliknąłeś drugi przycisk 🎉";
})

// Funkcja losująca kolor
function getRandomColor() {
    const kolory = ["lightblue", "lightgreen", "lightpink", "lightyellow", "lavender"];
    return kolory[Math.floor(Math.random() * kolory.length)];
}

