<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect4</title>
</head>
<body>
    <?php include 'AdminPhp.php' ?>
    <div class="admin-container">
        <h1>ADMIN PAGE</h1>
        <div class="users-container">
            <ul id="user-list">

            </ul>
        </div>
        <div class="admin-menu-buttons">
            <button id="left-arrow"><</button>
            <label id="pageNum">1</label>
            <button id="right-arrow">></button>
                
        </div>
        <script src="adminMenu.js"></script>
</body>
</html>
