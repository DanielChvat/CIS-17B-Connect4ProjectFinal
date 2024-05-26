<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="login-container">
    <?php include 'signup-loginmethod.php' ?>
    <form method = "POST">
        <div class="form-group">
            <label for="">Username</label>
            <input type="text" id="Username" name="Username" required>
            <label for="">Password</label>
            <input type="text" id="Password" name="Password" required> 
            <button type="submit" class="btn" name="login">Login</button>
        </div>
    </form>
</div>
    
</body>
</html>