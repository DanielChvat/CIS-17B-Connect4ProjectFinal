<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css" />
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- React/Bable modules have to be exported and imported inside the <script></script> tags. -->
    <script type="text/babel" data-presets="react" src="components/Board.js">
        export { Board() };
    </script>
    <script type="text/babel" data-presets="react" src="index.js">
        import { Board } from './components/Board.js';
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect4</title>
    <?php
        session_start();
    ?>
    <script>
        function checkCookie() {
            var username = getCookie("user");
            var isAdmin = getCookie("admin");
            if (username !== "") {
                if (isAdmin === "true") {
                    alert("Welcome back, Admin " + username + "!");
                    window.location.href = "gameAdmin.php";
                } else {
                    alert("Welcome back, " + username + "!");
                    window.location.href = "game.php";
                }
                
            }
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
</script>

</head>
<body onload="checkCookie()">
    <img class="board_main_menu" src="board_main_menu.svg"></img>
    <div class="menu_container">
        <h1 class="title">CONNECT4</h1>
        <div class="menu_buttons">
            <button><a href = "signup.php">Sign Up</a></button>
            <button><a href = "login.php">Login</a></button>
        </div>
    </div>
    <div class="background_clouds"></div>
</body>
</html>
