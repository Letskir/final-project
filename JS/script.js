const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
const sGames = JSON.parse(localStorage.getItem('sGames')) || [];

//localStorage.getItem('savedGames')-Це отримує збережені дані з браузера під ключем 'savedGames'.
// Якщо таких даних немає, повертається null.
//JSON.parse(...): Якщо дані знайдені, вони перетворюються з формату JSON (рядок) назад
// у JavaScript-об'єкт або масив. || []:
loadGames()
// Обробник для додавання нової гри
document.querySelector(".add-game-button").onclick = function() {
    addGameItem();
};
function addGameItem() {
    const gameList = document.getElementById('game-list');
    const gameItem = document.createElement('div');

    gameItem.className = 'game-item';
    gameItem.innerHTML = `
        <input type="text" placeholder="Нова гра">
        <div class="icons">
            <button class="save">Save</button>
            <div class="heart-icon"></div>
            <div class="delete-icon"></div>
        </div>
    `;

    gameList.appendChild(gameItem);

    // Додаємо обробник подій для кнопки "Save"
    gameItem.querySelector('.save').onclick = function() {
        saveGame(this);
    };

    // Додаємо обробник подій для кнопки "Delete"
    gameItem.querySelector('.delete-icon').onclick = function() {
        deleteGame(this);
    };

    // Додаємо обробник подій для кнопки "Heart"
    gameItem.querySelector('.heart-icon').onclick = function() {
        heartGame(this);
    };
};

function loadGames() {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = ''; // Очищуємо попередній список
    sGames.forEach((game, index) => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <input type="text" value="${game}">
            <div class="icons">
                <button class="save">Save</button>
                <div class="heart-icon ${savedGames.includes(game) ? 'active-heart' : ''}"></div>
                <div class="delete-icon"></div>
            </div>
        `;

        // Додаємо обробник подій для кнопки "Save"
        gameItem.querySelector('.save').onclick = function() {
            saveGame(this);
        };

        // Додаємо обробник подій для кнопки "Delete"
        gameItem.querySelector('.delete-icon').onclick = function() {
            deleteGame(this);
        };

        // Додаємо обробник подій для кнопки "Heart"
        gameItem.querySelector('.heart-icon').onclick = function() {
            heartGame(this);
        };

        gameList.appendChild(gameItem);
    });
}
// Функція для збереження гри
function saveGame(element) {
    const gameItem = element.parentElement.parentElement;
    const gameTitle = gameItem.querySelector('input[type="text"]').value;

    if (gameTitle.trim() === "") {
        alert("Будь ласка, введіть назву гри.");
        return;
    }

    if (!sGames.includes(gameTitle)) {
        sGames.push(gameTitle);
        localStorage.setItem('sGames', JSON.stringify(sGames));
        alert("Гра збережена.");
    } else {
        alert("Ця гра вже додана.");
    }

    // Оновлюємо список збережених ігор
    loadGames();
}









// Функція для видалення гри
function deleteGame(element) {
    const gameTitle = element.parentElement.parentElement.querySelector('input[type="text"]').value;
    const index1 = sGames.indexOf(gameTitle);
    const index = savedGames.indexOf(gameTitle);
    if (index > -1) {
        savedGames.splice(index, 1);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
    }
    if (index1 > -1) {
        sGames.splice(index, 1);
        localStorage.setItem('sGames', JSON.stringify(sGames));
    }

    element.parentElement.parentElement.remove();
}

// Функція для додавання/видалення гри з улюблених
function heartGame(element) {
    element.classList.toggle("active-heart");

    const gameItem = element.parentNode.parentNode;
    const gameTitle = gameItem.querySelector('input[type="text"]').value;

    const index = savedGames.indexOf(gameTitle);
    if (index > -1) {
        savedGames.splice(index, 1);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
        alert('Ви видалили гру з улюблених!');
    } else {
        savedGames.push(gameTitle);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
        alert('Ви додали гру до улюблених!');
    }
}

// Обробник для показу збережених ігор
document.querySelector(".saved-games-button").onclick = function() {
    const savedGameList = document.getElementById('saved-game-list');
    savedGameList.innerHTML = ''; // Очищуємо попередній список
    savedGames.forEach((game, index) => {
        const gameItem = document.createElement('button');
        gameItem.className = 'saved-game-item';
        gameItem.textContent = game;
        gameItem.onclick = () => openModal(game, index);
        savedGameList.appendChild(gameItem);
    });
    savedGameList.style.display = savedGameList.style.display === 'none' ? 'block' : 'none';
};

// Завантаження збережених ігор при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function() {
    let container = document.querySelector(".container");
    let btn = document.querySelector(".btn");
    btn.onclick = function() {
        container.style.display = "block";
        btn.style.display = "none";
    }

    loadSavedGames(); // Відповідає за завантаження збережених ігор з localStorage
});

// Функція для завантаження збережених ігор
function loadSavedGames() {
    const savedGameList = document.getElementById('saved-game-list');
    savedGameList.innerHTML = ''; // Очищуємо попередній список
    savedGames.forEach((game, index) => {
        const gameItem = document.createElement('button');
        gameItem.className = 'saved-game-item';
        gameItem.textContent = game;
        gameItem.onclick = () => openModal(game, index);
        savedGameList.appendChild(gameItem);
    });
}

// Функція для відкриття модального вікна
function openModal(game, index) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalInput = document.getElementById('modal-input');

    modalTitle.textContent = game;
    modalInput.value = localStorage.getItem(`gameNotes_${index}`) || '';
    modal.style.display = 'block';

    const saveButton = document.getElementById('modal-save');
    saveButton.onclick = () => saveModalInput(index);
}

// Функція для закриття модального вікна
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Функція для збереження нотаток з модального вікна
function saveModalInput(index) {
    const modalInput = document.getElementById('modal-input');
    localStorage.setItem(`gameNotes_${index}`, modalInput.value);
    closeModal();
}

document.getElementById('modal-close').onclick = closeModal;




