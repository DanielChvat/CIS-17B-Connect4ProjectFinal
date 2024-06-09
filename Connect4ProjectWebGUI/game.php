<?php 

session_start();

require 'dbconnect.php';




if (!isset($_SESSION['Username']) && isset($_COOKIE['user'])) {
    $_SESSION['Username'] = $_COOKIE['user'];
}

echo "<script>console.log('Current User: " . $_SESSION['Username'] . "' );</script>";




//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//
//// Debug: Check if the session and POST data are being received
//file_put_contents('debug.log', 'Session Username: ' . $_SESSION['Username'] . "\n", FILE_APPEND);
//file_put_contents('debug.log', 'POST data: ' . print_r($_POST, true) . "\n", FILE_APPEND);

//echo "<h1>Debug Information</h1>";
//
//if (isset($_COOKIE['user'])) {
//    echo "Cookie 'user' is set!<br>";
//    echo "Value: " . htmlspecialchars($_COOKIE['user'], ENT_QUOTES, 'UTF-8') . "<br>";
//} else {
//    echo "Cookie 'user' is not set.<br>";
//}
//
//if (isset($_SESSION['Username'])) {
//    echo "Session 'Username' is set!<br>";
//    echo "Value: " . htmlspecialchars($_SESSION['Username'], ENT_QUOTES, 'UTF-8') . "<br>";
//} else {
//    echo "Session 'Username' is not set.<br>";
//}


if (isset($_POST['action']) && $_POST['action'] == 'sendWinner') {
  $winner = isset($_POST['data']) ? $_POST['data'] : 'no winner';

  if ($winner != "Computer") {

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

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<!-- <h1>Connect Four</h1> -->
<div id="color-selection" class="container">
  <h2>Select Your Color</h2>
  <div>
    <label for="player1-color">Player 1 Color:</label>
    <select id="player1-color">
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
    </select>
  </div>
  <div class="button-container">
    <button id="start-button">Start Game</button>
    
    <form action="leaderboard.php" method="post">
        <button id="lb-button" type="submit" >Leaderboard</button>
    </form>
    
    <form action="logout.php" method="post">
        <button id="logout-button" type="submit" >Logout</button>
    </form>
  </div>
</div>

<div id="turns-container" style="display: none;">
<!-- <div id="turns-container"> -->
  <h3>Turns</h3>
  <div class="container-com">
    <p>Computer</p>
  </div>
  <div class="container-player">
    <p>Player</p>
  </div>

</div>

<div id="game-container">
  <div id="game-board" style="display: none;"></div>
  <!-- <div class="win-banner"> -->
    <div id="winner-message" style="display: none;"></div>
  <!-- </div> -->
  <div class="options">
  <button id="reset-button" style="display: none;" width="50px">Reset Game</button>
  <button id="undo-button" style="display: none;" width="50px">Undo Move</button>
</div>
  </div>


<script src="game.js"></script>
</body>

</html>