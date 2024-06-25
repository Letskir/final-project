const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
//localStorage.getItem('savedGames')-Це отримує збережені дані з браузера під ключем 'savedGames'.
// Якщо таких даних немає, повертається null.
//JSON.parse(...): Якщо дані знайдені, вони перетворюються з формату JSON (рядок) назад
// у JavaScript-об'єкт або масив. || []:

document.querySelector(".add-game-button").onclick = function() {
    const gameList = document.getElementById('game-list');
    const gameItem = document.createElement('div');
    gameItem.className = 'game-item';
    gameItem.innerHTML = `
        <input type="text" placeholder="Нова гра">
        <div class="icons">                 
            <div class="heart-icon" id="heart-icon" onclick="heartGame(this)"></div>
            <div class="delete-icon" onclick="deleteGame(this)"></div>
        </div>
    `;                                                                                      //вище додано клас icons і в ньому два контейнера для серця і відра
    gameList.appendChild(gameItem);
}

function deleteGame(element) {
    const gameItem = element.parentNode.parentNode; /*Використання parentNode.parentNode у функції deleteGame обумовлено структурою HTML-коду, де елемент, на який натискають (іконка смітника), знаходиться всередині декількох вкладених елементів. */
    gameItem.parentNode.removeChild(gameItem);
}


// function heartGame стоврена за анологією відра тільки для зберігання
function heartGame(element) {
    const gameItem = element.parentNode.parentNode;
    const gameTitle = gameItem.querySelector('input[type="text"]').value;
    if (!savedGames.includes(gameTitle)) {
        savedGames.push(gameTitle);
        localStorage.setItem('savedGames', JSON.stringify(savedGames)); 
                                                                             //Оновлює LocalStorage, зберігаючи оновлений масив savedGames. JSON.stringify(savedGames) перетворює масив savedGames у формат JSON (рядок), який може бути збережений у LocalStorage під ключем 'savedGames'.
    }
    alert('Ви додали гру до улюблених!');
}

document.querySelector(".saved-games-button").onclick = function() {
    const savedGameList = document.getElementById('saved-game-list');
    savedGameList.innerHTML = ''; // Очищуємо попередній список
    savedGames.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'saved-game-item';
        gameItem.textContent = game;
        savedGameList.appendChild(gameItem);
    });
    savedGameList.style.display = savedGameList.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    let container = document.querySelector(".container");
    let btn = document.querySelector(".btn");
    btn.onclick = function() {
        container.style.display = "block";
        btn.style.display = "none";
    }

    loadSavedGames(); //відповідає за завантаження збережених ігор з LocalStorage


});


function loadSavedGames() {
    const gameList = document.getElementById('game-list');
    savedGames.forEach(gameTitle => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <input type="text" value="${gameTitle}">
            <div class="icons">
                <div class="heart-icon" onclick="heartGame(this)"></div>
                <div class="delete-icon" onclick="deleteGame(this)"></div>
            </div>
        `;
        gameList.appendChild(gameItem);
    });
}

//Функція loadSavedGames() призначена для завантаження збережених ігор з масиву savedGames та їх відображення на сторінці у вигляді HTML-елементів.





