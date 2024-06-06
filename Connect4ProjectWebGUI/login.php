<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>

<div class="login-container">
    <?php include 'signup-loginmethod.php' ?>
    <form method = "POST">
        <div class="heading">
            <h1>welcome back!</h1>
        </div>
        <div class="form-group">
            <div class="username">
                <label for="">username</label>
                <input type="text" id="Username" name="Username" required>
            </div>
            <div class="pass">
                <label for="">password</label>
                <input type="text" id="Password" name="Password" required> 
            </div>
        </div>
        <div class="group2">
            <button type="submit" class="btn" name="login">Login</button>
        </div>

    </form>
</div>
    
</body>
</html>