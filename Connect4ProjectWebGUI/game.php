<?php session_start();
require 'dbconnect.php';
echo "<script>console.log('Current User: ".$_SESSION['Username']."' );</script>";

//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//
//// Debug: Check if the session and POST data are being received
//file_put_contents('debug.log', 'Session Username: ' . $_SESSION['Username'] . "\n", FILE_APPEND);
//file_put_contents('debug.log', 'POST data: ' . print_r($_POST, true) . "\n", FILE_APPEND);



if (isset($_POST['action']) && $_POST['action'] == 'sendWinner') {
    $winner = isset($_POST['data']) ? $_POST['data'] : 'no winner';
    
    
    
    
    
    
    if($winner != "Computer") {
        
        $sql = "UPDATE entity_accounts SET Wins = Wins+1 WHERE Username = ?";
       $stmt = $conn->prepare($sql);
       $stmt->execute([$_SESSION['Username']]);
       
        
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect Four</title>
  <link rel="stylesheet" href="game.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <!-- <h1>Connect Four</h1> -->
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

