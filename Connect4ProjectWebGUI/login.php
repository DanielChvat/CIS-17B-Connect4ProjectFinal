<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
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
                <input type="password" id="password" name="Password" required>
                <span class="toggle-password" onclick="togglePasswordVisibility()"><i class="fa fa-eye-slash"></i></span>
            </div>
        </div>
        <div class="group2">
            <button type="submit" class="btn" name="login">Login</button>
        </div>
        

    </form>
</div>
    
<script>
function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var toggleIcon = document.querySelector(".toggle-password i");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}
</script>
    
</body>
</html>