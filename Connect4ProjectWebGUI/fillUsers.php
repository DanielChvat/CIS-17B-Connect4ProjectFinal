<?php
session_start();
require 'dbconnect.php';

function getRandomString($length) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$optionsBC = ['cost' => 10];

$firstNames = ["Chelsea", "Lisa", "Michaela", "Sarah", "Valerie", "Maria", "Aleya", "Brenda", "Christy", "Liam", "William", "Mason", "James", "Daniel", "Jacob", "Michael", "Elijah", "Ethan"];
$lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Santoso", "So", "Nyguyen", "Lehr"];

for ($i = 0; $i < 1000; $i++) {
    $username = strtolower(getRandomString(8));
    $password = password_hash(getRandomString(10), PASSWORD_BCRYPT, $optionsBC);
    $lastname = ucwords(strtolower(trim($lastNames[array_rand($lastNames)])));
    $firstname = ucwords(strtolower(trim($firstNames[array_rand($firstNames)])));
    $wins = rand(0, 100);
    
    
    
    $sql = $conn->prepare('SELECT Username FROM entity_accounts WHERE Username = ?');
    $sql->bind_param('s', $username);
    $sql->execute();
    $sql->store_result();
    
    if($sql->num_rows == 0) {
        $stmt = $conn->prepare('INSERT INTO entity_accounts (Username, LastName, FirstName, Wins) VALUES (?, ?, ?, ?)');
        $stmt->bind_param("sssi", $username, $lastname, $firstname, $wins);
        $stmt->execute();
        $stmt->close();

        $stmt2 = $conn->prepare('SELECT UserID FROM entity_accounts WHERE Username = ?');
        $stmt2->bind_param("s", $username);
        $stmt2->execute();
        $stmt2->store_result();
        $stmt2->bind_result($result);
        $stmt2->fetch();
        $stmt2->close();

        $stmt3 = $conn->prepare('INSERT INTO enum_login (UserID, Password) VALUES (?, ?)');
        $stmt3->bind_param("is", $result, $password);
        $stmt3->execute();
        $stmt3->close();
    }

    $sql->close();
}

echo "1000 random users have been inserted into the database.";



