let errors = 0;
let cardList = [
  'darkness',
  'double',
  'fairy',
  'fighting',
  'fire',
  'grass',
  'lightning',
  'metal',
  'psychic',
  'water',
];

let cardSet;
let board = [];
const rows = 4;
const columns = 5;
let hiddenCards = rows * columns;
let card1Selected;
let card2Selected;

window.onload = function () {
  shuffleCards();
  startGame();

  // Add event listener to the restart button
  const restartButton = document.getElementById('restart-game');
  restartButton.addEventListener('click', restartGame);
};

function shuffleCards() {
  cardSet = cardList.concat(cardList); //Gives two of each card. Basically 2x cardList

  // Shuffle Cards
  for (let i = 0; i < cardSet.length; i++) {
    const randomIndex = Math.floor(Math.random() * cardSet.length);

    let temp = cardSet[i];
    cardSet[i] = cardSet[randomIndex];
    cardSet[randomIndex] = temp;
  }
}

function startGame() {
  // arrange board 4x5

  for (let r = 0; r < rows; r++) {
    //r loop executes 4 times
    let row = [];
    for (let c = 0; c < columns; c++) {
      //c loop executes 5 times for each iteration of the r loop. Every 5 times, it pops the last element of the cardSet array, pushes it to the cardImg array, creates "img" element with id that corresponds to the position in the grid, class of card and src that links to a image file with the help of the cardImg variable, then appends each img element to the "board". After 5 times of execution ends in each r loop iteration, it pushes the completed "row" to the board.
      let cardImg = cardSet.pop();
      row.push(cardImg); // for js
      // <img id="0-0" class="card" src ="water.jpg"> then id="0-1...0-2 and so on."
      let card = document.createElement('img');
      card.id = `${r.toString()} - ${c.toString()}`;
      card.src = cardImg + '.jpg';
      card.classList.add('card');
      card.addEventListener('click', selectCard);

      document.getElementById('board').append(card);
    }
    board.push(row);
    setTimeout(hideCards, 2000);
  }
}

function hideCards() {
  // Runs and gets the card elements by their id with the help of the for loop's indexs stored in r and c variables. Then changes all the images to "back.jpg"
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(`${r.toString()} - ${c.toString()}`);
      card.src = 'back.jpg';
    }
  }
}
// This function is called when a card is selected. It checks whether the selected card is facing down ('back.jpg').
function selectCard() {
  if (this.src.includes('back')) {
    // Checks if the first card has been selected.
    if (!card1Selected) {
      card1Selected = this;

      // Extracts the coordinates from the ID of the selected card.
      const coords = card1Selected.id.split('-'); // "0-1" -> ["0", "1"];
      const r = parseInt(coords[0]); // Extracts the row number.
      const c = parseInt(coords[1]); // Extracts the column number.

      // Changes the source of the selected card to the corresponding image from the 'board' array.
      card1Selected.src = board[r][c] + '.jpg';
    }
    // If the first card has already been selected, it checks if the second card has not been selected and if it hasn't been, it assign the current selected card to card2Selected variable then it checks if the second card is not the same as the first one.
    else if (!card2Selected && this !== card1Selected) {
      card2Selected = this;

      // Extracts the coordinates from the ID of the selected card.
      const coords = card2Selected.id.split('-'); // "0-1" -> ["0", "1"];
      const r = parseInt(coords[0]); // Extracts the row number.
      const c = parseInt(coords[1]); // Extracts the column number.

      // Changes the source of the selected card to the corresponding image from the 'board' array.
      card2Selected.src = board[r][c] + '.jpg';

      // Calls the 'update' function after 1 second.
      setTimeout(update, 1000);
    }
  }
}

// This function is called after 1 second to update the state of the cards.
function update() {
  // Checks if the two selected cards are not the same.
  if (card1Selected.src !== card2Selected.src) {
    // Flips both cards back by changing their source to 'back.jpg'.
    card1Selected.src = 'back.jpg';
    card2Selected.src = 'back.jpg';

    // Increments the count of errors and updates the corresponding element in the DOM.
    errors++;
    document.getElementById('errors').innerText = errors;
  } else {
    // Decrease the count of hidden cards if the cards are the same.
    hiddenCards -= 2;
    // Check if all cards have been matched
    checkGameCompletion();
  }

  // Resets the selected cards to 'false' for the next selection process.
  card1Selected = false;
  card2Selected = false;
}

function checkGameCompletion() {
  if (hiddenCards === 0) {
    // Logic to execute when the game is completed
    alert('Congratulations! You have completed the game.');
    restartGame();
  }
}

function restartGame() {
  // Resets all necessary variables to their initial states
  errors = 0;
  cardList = [
    'darkness',
    'double',
    'fairy',
    'fighting',
    'fire',
    'grass',
    'lightning',
    'metal',
    'psychic',
    'water',
  ];
  cardSet = null;
  board = [];
  card1Selected = null;
  card2Selected = null;
  hiddenCards = rows * columns;

  // Clears the board
  const boardElement = document.getElementById('board');
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  // Updates Error counter
  document.getElementById('errors').innerText = errors;

  // Restarts the game
  shuffleCards();
  startGame();
}
