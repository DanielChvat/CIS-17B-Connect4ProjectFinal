<?php
session_start();
require 'dbconnect.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    if(isset($_POST['signup'])) {
        if(isset($_POST['Username']) && isset($_POST['Password'])){
            $Username = $_POST['Username'];
            $optionsBC = ['cost' => 10];
            $Password = password_hash($_POST['Password'], PASSWORD_BCRYPT, $optionsBC);

            $stmt = $conn->prepare('INSERT INTO entity_accounts (`Username`, `Password` ) VALUES (?,?)');
            $stmt->bind_param("ss", $Username, $Password);
            $stmt->execute();
            header("Location: login.php");
        }
    }



    if(isset($_POST['login'])) {
        if(isset($_POST['Username']) && isset($_POST['Password'])){
            $Username = $_POST['Username'];
            $Password = $_POST['Password'];
            
            $stmt = $conn->prepare('SELECT Password, isAdmin FROM `entity_accounts` WHERE Username = ?');
            $stmt->bind_param("s", $Username);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($hashPW, $isAdmin);
            $stmt->fetch();
            
           
          if(password_verify($Password, $hashPW)) {
            $_SESSION['Username'] = $Username;
            echo "<script>console.log('Login successful!');</script>";
            if($isAdmin) {
                echo "<script>console.log('Welcome, Admin!');</script>";
                header("Location: adminMenu.php");
            } else {
              echo "<script>console.log('Welcome!');</script>";
              header("Location: game.php");
            }
        }
      }
    }
}

    









