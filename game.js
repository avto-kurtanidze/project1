const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];

let currentPlayer = players[0];
let gameOver = false; 

const endMessage = document.createElement('h2');
endMessage.style.marginTop = '10px';
endMessage.style.fontFamily = 'inter';
endMessage.style.textAlign = 'center';
endMessage.style.fontSize = '40px';
endMessage.style.color = 'rgb(22, 24, 39)';

function updateEndMessage(winner) {
  if (winner === 'Tie') {
    endMessage.textContent = `Game is tied!`;
  } else if (winner === 'X') {
    endMessage.innerHTML = `Game over! <span style="color: #FF5733">X</span> wins!`;
  } else if (winner === 'O') {
    endMessage.innerHTML = `Game over! <span style="color: #1E90FF">O</span> wins!`;
  } else {
    endMessage.innerHTML = `${currentPlayer === 'X' ? "<span style='color: #FF5733'>X</span>'s turn!" : "<span style='color: #1E90FF'>O</span>'s turn!"}`;
  }
}

updateEndMessage();
board.after(endMessage);

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWin(currentPlayer) {
  for (let i = 0; i < winning_combinations.length; i++) {
    const [a, b, c] = winning_combinations[i];
    if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
      highlightWinningLine([a, b, c]);
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
    squares[i].style.fontSize = '2em'; 
    squares[i].style.color = 'black'; 
    squares[i].classList.remove('winning'); 
  }
  currentPlayer = players[0]; 
  gameOver = false; 
  updateEndMessage();
}


function highlightWinningLine(indices) {
  indices.forEach(index => {
    squares[index].classList.add('winning'); 
  });
}


function styleSquare(square, player) {
  if (player === 'X') {
    square.style.color = '#FF5733'; 
    square.style.fontSize = '5em'; 
    square.style.fontWeight = 'bold'; 
    square.style.fontFamily = 'Chewy';
  } else if (player === 'O') {
    square.style.color = '#1E90FF'; 
    square.style.fontSize = '5em'; 
    square.style.fontWeight = 'normal'; 
    square.style.fontFamily = 'Chewy';
  }
}

document.getElementById('modeButton').addEventListener('click', restartButton);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', () => {
    if (gameOver || squares[i].textContent !== '') {
      return; 
    }

   
    squares[i].textContent = currentPlayer;
    styleSquare(squares[i], currentPlayer); 

    if (checkWin(currentPlayer)) {
      gameOver = true;
      updateEndMessage(currentPlayer);
      return;
    }

    if (checkTie()) {
      gameOver = true;
      updateEndMessage('Tie');
      return;
    }

   
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    updateEndMessage();
  });
}
