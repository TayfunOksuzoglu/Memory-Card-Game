# Memory Game

This is a simple memory game implemented using HTML, CSS, and JavaScript. The game involves flipping cards and finding matching pairs to complete the game. Here is an overview of the game's functionalities and features:

## Functionality

1. **Shuffling Cards**: The cards are shuffled at the beginning of the game to ensure randomness and variation in each playthrough.
2. **Board Setup**: The game is played on a 4x5 board, with a total of 20 cards arranged in a grid. Each card has an image associated with it.
3. **Card Selection**: Players can select two cards at a time by clicking on them. If the cards match, they remain face up. Otherwise, they are flipped face down again.
4. **Error Counting**: The game keeps track of the number of errors made by the player. An error is counted when two cards are selected that do not match.
5. **Game Completion**: The game alerts the player when all the cards have been matched successfully.
6. **Restart Option**: Players can restart the game at any time, resetting the board and all related variables.

## Implementation Details

The game uses simple DOM manipulation and event handling in JavaScript. It dynamically creates the game board and assigns functionality to each card. The card images are initially hidden, and the game's logic ensures that the images are only revealed temporarily when selected.

Have fun playing the memory game!
