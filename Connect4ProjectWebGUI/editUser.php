<?php include 'AdminPhp.php'?>



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
    <div class="admin-container">
        <h1>Edit User</h1>
        <a href="login.php">Home<i class="fa fa-house"></i></a>
        <form method = "POST">
            <div class="form-group">
                <label for="">New Username</label>
                <input type="text" id="Username" name="Username" required>
                <label for="">New Password</label>
                <input type="text" id="Password" name="Password" required> 
                <label for="">New Last Name</label>
                <input type="text" id="LastName" name="LastName" required> 
                <label for="">New First Name</label>
                <input type="text" id="FirstName" name="FirstName" required>
                <label for="">Admin</label>
                <input type="checkbox" id="isAdmin" name="isAdmin">
                <button type="submit" class="btn" name="addEdit">Confirm</button>
            </div>
        </form>
</body>
</html>
