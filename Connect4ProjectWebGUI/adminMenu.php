<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
        <a href="login.php">Home <i class="fa fa-home"></i></a>
        <button id="edit-button">Edit <i class="fa fa-pencil"></i></button>
        <div class="users-container">
            <ul id="user-list"></ul>
        </div>
        <div class="admin-menu-buttons">
            <button id="left-arrow"><</button>
            <label id="pageNum">1</label>
            <button id="right-arrow">></button>
        </div>
        <form method = "POST">
            <div class="form-group">
                <label for="">Username</label>
                <input type="text" id="Username" name="Username" required>
                <label for="">Password</label>
                <input type="text" id="Password" name="Password" required>  
                <label for="">Last Name</label>
                <input type="text" id="LastName" name="LastName" required> 
                <label for="">First Name</label>
                <input type="text" id="FirstName" name="FirstName" required> 
                <label for="">Admin</label>
                <input type="checkbox" id="isAdmin" name="isAdmin">
                <button type="submit" class="btn" name="addUser">Add User</button>
            </div>
        </form>
        <script src="adminMenu.js"></script>
</body>
</html>
