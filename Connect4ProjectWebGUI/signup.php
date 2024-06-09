<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="signup.css">
    <script>
        function regexValidation() {
            var username = document.getElementById("Username").value;
            var lastname = document.getElementById("Lastname").value;
            var firstname = document.getElementById("Firstname").value;
            var password = document.getElementById("Password").value;
            
            var namePattern = /^[A-Za-z]+$/;
            var userPattern = /^\S+$/;
            var pswrdPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            if (!userPattern.test(username)) {
                alert("Username must not contain spaces.");
                return false;
            }
            if (!namePattern.test(lastname)) {
                alert("Last name can only contain letters.");
                return false;
            }
            if (!namePattern.test(firstname)) {
                alert("First name can only contain letters.");
                return false;
            }
            if(!pswrdPattern.test(password)){
                alert("Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character.");
                return false;
            }
            return true;
            
        }
    
    
    </script>
</head>
<body>

<div class="signup-container" onsubmit="return regexValidation()">
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