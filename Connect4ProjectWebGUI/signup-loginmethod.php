<?php
session_start();
require 'dbconnect.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    if(isset($_POST['signup'])) {
        if(isset($_POST['Username']) && isset($_POST['Password'])){
            $Username = strtolower($_POST['Username']); // converting username to lowercase for case-insensitive design
            $optionsBC = ['cost' => 10];
            $Password = password_hash($_POST['Password'], PASSWORD_BCRYPT, $optionsBC);
            $lastname = ucwords(strtolower(trim($_POST['Lastname'])));
            $firstname = ucwords(strtolower(trim($_POST['Firstname'])));
            
            $sql = $conn->prepare('SELECT Username FROM entity_accounts WHERE Username = ?');
            $sql->bind_param('s', $Username);
            $sql->execute();
            $sql->store_result();
            
            
            
            if($sql->num_rows > 0) {
                echo 'Username taken';
                
            }
            
            else {
                
                $stmt = $conn->prepare('INSERT INTO entity_accounts (Username, LastName, FirstName) VALUES (?, ?, ?)');
                $stmt->bind_param("sss", $Username, $lastname, $firstname);
                $stmt->execute();
                $stmt->close();
                
                $stmt2 = $conn->prepare('SELECT UserID FROM  entity_accounts WHERE Username = ?');
                $stmt2->bind_param("s", $Username);
                $stmt2->execute();
                $stmt2->store_result();
                $stmt2->bind_result($result);
                $stmt2->fetch();
                $stmt2->close();

                

                $stmt3 = $conn->prepare('INSERT INTO enum_login (UserID, Password) VALUES (?, ?)');
                $stmt3->bind_param("is", $result, $Password);
                $stmt3->execute();
                $stmt3->close();
                header("Location: login.php");
            }
            
            $sql->close();
            
            
            
            
        }
    }



    if(isset($_POST['login'])) {
        if(isset($_POST['Username']) && isset($_POST['Password'])){
            $Username = strtolower($_POST['Username']);
            $Password = $_POST['Password'];
            
            $stmt = $conn->prepare("SELECT UserID FROM entity_accounts WHERE Username = ?");
            $stmt->bind_param('s', $Username);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($userID);
            $stmt->fetch();
            $stmt->close();

            
            
            $stmt2 = $conn->prepare('SELECT Password FROM enum_login WHERE UserID = ?');
            $stmt2->bind_param('i',$userID);
            $stmt2->execute();
            $stmt2->store_result();
            $stmt2->bind_result($hashPW);
            $stmt2->fetch();
            
       
          if(password_verify($Password, $hashPW)) {
            $_SESSION['Username'] = $Username;
            echo "<script>console.log('Login successful!');</script>";
            
            
            setcookie("user", $Username, time() + (86400 * 30), "/"); 
            
            
            $stmt = $conn->prepare("SELECT adminID FROM xref_admin WHERE UserID = ?");
            $stmt->bind_param('i', $userID);
            $stmt->execute();
            $stmt->store_result();
            
            if($stmt->num_rows > 0) {
                echo "<script>console.log('Welcome Admin!');</script>";
                header("Location: gameAdmin.php");
            }
            
            else {
                header("Location: game.php");
            }
            
            
            
            
            
          }
          else {
              echo "<script>console.log('Login failed!');</script>";
          }
      }
    }
}


    









