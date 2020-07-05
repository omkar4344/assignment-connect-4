// Variables
var playerConfig = {
    player1: {
        name: 'Player-1',
        color: 'red'
    },
    player2: {
        name: 'Player-2',
        color: 'yellow'
    }
};
var currentPlayer = {
    name: null,
    color: null
};
var won = false;

// Selectors
var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-name');
var playerColor = document.querySelector('#colorIndicator');
const slots = document.querySelectorAll('.slot');
const resetBtn = document.querySelector('.reset');

setCurrentPlayer();
addEventListenersOnCells();

function setCurrentPlayer() {
    currentPlayer = JSON.parse(JSON.stringify(playerConfig.player1));
    playerTurn.textContent = `${currentPlayer.name}'s turn!`;
    playerColor.style.backgroundColor = `${currentPlayer.color}`;
}

function addEventListenersOnCells() {
    for (let cell of tableData) {
        cell.addEventListener('click', changeColor);
        // Set all slots to white for new game.
        cell.style.backgroundColor = 'white';
    }
}

function changeColor(e) {
    if (won) {
        return;
    }
    let clickedColumnIndex = e.target.cellIndex;
    for (i = 5; i > -1; i--) {
        ithCellOfClickedColumn = tableRow[i].children[clickedColumnIndex];
        if (ithCellOfClickedColumn.style.backgroundColor == 'white') {
            ithCellOfClickedColumn.style.backgroundColor = currentPlayer.color;
            if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                setWinner();
                return;
            } else if (drawCheck()) {
                setGameAsDraw();
                return;
            } else {
                switchPlayer();
                return;
            }
        }
    }

}

function setWinner() {
    won = true;
    playerTurn.textContent = `${currentPlayer.name} WINS!!`;
    playerTurn.style.color = currentPlayer.color;
}

function setGameAsDraw() {
    playerTurn.textContent = 'DRAW!';
    alert('DRAW!');
}

function switchPlayer() {
    let newPlayer = currentPlayer.name === playerConfig.player1.name ? playerConfig.player2 : playerConfig.player1;
    currentPlayer = JSON.parse(JSON.stringify(newPlayer));
    playerTurn.textContent = `${currentPlayer.name}'s turn`;
    playerColor.style.backgroundColor = `${currentPlayer.color}`;
}

function horizontalCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col + 1].style.backgroundColor,
                tableRow[row].children[col + 2].style.backgroundColor, tableRow[row].children[col + 3].style.backgroundColor)) {
                markMatchedCells(tableRow[row].children[col], tableRow[row].children[col + 1], tableRow[row].children[col + 2], tableRow[row].children[col + 3]);
                return true;
            }
        }
    }
}

function verticalCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col].style.backgroundColor,
                tableRow[row + 2].children[col].style.backgroundColor, tableRow[row + 3].children[col].style.backgroundColor)) {
                markMatchedCells(tableRow[row].children[col], tableRow[row + 1].children[col], tableRow[row + 2].children[col], tableRow[row + 3].children[col]);
                return true;
            };
        }
    }
}

function diagonalCheck() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                markMatchedCells(tableRow[row].children[col], tableRow[row + 1].children[col + 1], tableRow[row + 2].children[col + 2], tableRow[row + 3].children[col + 3]);
                return true;
            }
        }
    }

}

function diagonalCheck2() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                markMatchedCells(tableRow[row].children[col], tableRow[row - 1].children[col + 1], tableRow[row - 2].children[col + 2], tableRow[row - 3].children[col + 3]);
                return true;
            }
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function drawCheck() {
    let fullSlot = []
    for (i = 0; i < tableData.length; i++) {
        if (tableData[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length) {
        return true;
    }
}

function markMatchedCells(a, b, c, d) {
    a.style.border = '5px solid green';
    b.style.border = '5px solid green';
    c.style.border = '5px solid green';
    d.style.border = '5px solid green';
}

function resetGame() {
    won = false;
    resetSlots();
    playerTurn.style.color = 'black';
    switchPlayer();
}

function resetSlots() {
    slots.forEach(slot => {
        slot.style.backgroundColor = 'white';
        slot.style.border = '2px solid black';
    });
}