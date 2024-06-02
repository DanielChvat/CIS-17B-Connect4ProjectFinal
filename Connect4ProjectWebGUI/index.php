<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect Four</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Connect Four</h1>
  <div id="color-selection">
    <h2>Select Player 1 Color</h2>
    <div>
      <label for="player1-color">Player 1 Color:</label>
      <select id="player1-color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </div>
    <button id="start-button">Start Game</button>
  </div>
  <div id="game-board" style="display: none;"></div>
  <div id="winner-message" style="display: none;"></div>
  <button id="reset-button" style="display: none;">Reset Game</button>
  <br>
  <button id="undo-button" style="display: none;">Undo Move</button>
  <script src="game.js"></script>
</body>
</html>
