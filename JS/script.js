document.querySelector(".add-game-button").onclick = function(){
    const gameList = document.getElementById('game-list');
    const gameItem = document.createElement('div');
    gameItem.className = 'game-item';
    gameItem.innerHTML = `
        <input type="text" value="Нова гра">
        <div class="delete-icon" onclick="deleteGame(this)"></div>
    `;
    gameList.appendChild(gameItem);
}
function deleteGame(element) {
    const gameItem = element.parentNode;
    gameItem.parentNode.removeChild(gameItem);
}
