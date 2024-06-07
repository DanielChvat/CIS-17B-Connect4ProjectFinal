<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="signup.css">
</head>
<body>

<div class="signup-container">
    <?php include "signup-loginmethod.php" ?>
    <form method = "POST">
        <div class="heading">
            <h1>welcome to connect!</h1>
        </div>
        <div class="form-group">
            <div class="username">
                <label for="">First Name</label>
                <input type="text" id="Firstname" name="Firstname" required>
            </div>
            <div class="pass">
                <label for="">Last Name</label>
                <input type="text" id="Lastname" name="Lastname" required> 
            </div>
            <div class="pass">
                <label for="">username</label>
                <input type="text" id="Username" name="Username" required> 
            </div>
            <div class="pass">
                <label for="">password</label>
                <input type="text" id="Password" name="Password" required> 
            </div>
        </div>
        <div class="group2">
            <button type="submit" class="btn" name="signup">Sign Up</button>
        </div>
    </form>
</div>
    
</body>
</html>