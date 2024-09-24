const koder = {
  "christmasSpecials": [
    { "label": "Läppärit -20%", "code": "ASDJKL9023", "image": "./img/bild1.jpg" },
    { "label": "Ilmainen toimitus", "code": "VNKJDO0987", "image": "./img/bild2.jpg" },
    { "label": "Muistikortit ja muistitikut puoleen hintaan", "code": "IOSDFJ872", "image": "./img/bild3.jpg" },
    { "label": "Geforce näytönohjaimet -30%", "code": "KLHJ8976", "image": "./img/bild1.jpg" },
    { "label": "Samsung 55'' televisio 399€", "code": "SDFJKL9080", "image": "./img/bild2.jpg" },
    { "label": "Robottipölynimuri 129€", "code": "PQWO23894", "image": "./img/bild3.jpg" },
    { "label": "Verkkotuotteet -40%", "code": "Doe", "image": "./img/bild1.jpg" },
    { "label": "1Tb SSD 49€", "code": "Doe", "image": "./img/bild2.jpg" },
    { "label": "Intel tuotteet -22%", "code": "Doe", "image": "./img/bild3.jpg" },
    { "label": "AMD 6600XT 249€", "code": "Doe", "image": "./img/bild1.jpg" }
  ]
};

const idag = new Date();
const dagensDatum = idag.getDate();

document.addEventListener("DOMContentLoaded", function () {
    // Targetta kalender kroppen
    const calendarBody = document.getElementById("calendar-body");

    // Shuffla rea array:n
    const rea = koder.christmasSpecials;
    const shuffledSpecials = shuffleArray(rea.slice());

    // Skapa 24 luckor med loop
    for (let i = 1; i <= 24; i++) {
        // Skapa en div för varje lucka
        const door = document.createElement("div");
        
        // id för luckan
        door.classList.add("calendar-door");
        door.id = `door${i}`;

        // Lägg nummer in i luckan
        door.innerHTML = i;

        const rea = shuffledSpecials[(i - 1) % shuffledSpecials.length] || {};
        door.dataset.rea = JSON.stringify(rea);

        // Lägg till event listener för att öppna luckan
        door.addEventListener("click", function() {
            openDoor(i, dagensDatum);
        });

        calendarBody.appendChild(door);
    }
});

// Kör då luckan klickas
function openDoor(nummer) {
    if (nummer > dagensDatum) {
        // Om användaren vill öppna luckan i förtid
        alert(`Du kan inte öppna luckan än`);
    } else {
        // Luckan kan öppnas
        const door = document.getElementById(`door${nummer}`);

        // Hämta rea från data attribute:n
        const rea = JSON.parse(door.dataset.rea);

        if (rea && rea.code) {
            // Visa koden i en alert
            alert(`Din rabattkod är: ${rea.code}`);
        } else {
            alert(`Ingen rabattkod tillgänglig idag.`);
        }

        // Visa innehåll med bild
        let content = "";
        if (rea.image) {
            content = `<img src="${rea.image}" alt="bild">`;
        } else {
            content = `<p>Ingen bild idag :(</p>`;
        }

        // Append:a content
        door.innerHTML += `<div class="door-content">${content}</div>`;
    }
}
// Shuffl:a array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
