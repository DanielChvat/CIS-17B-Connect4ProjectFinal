<?php
session_start();

require 'dbconnect.php';
$display = 4;

// Handle user deletion and addition
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['delete'])) {
        $userID = $_POST['ID'];
        $sql = "DELETE FROM entity_accounts WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$userID]);
    }
    
    elseif (isset($_POST['addUser'])) {
        $username = $_POST['Username'];
        $password = password_hash($_POST['Password'], PASSWORD_BCRYPT);
        $isAdmin = isset($_POST['isAdmin']) ? 1 : 0;
        $sql = "INSERT INTO entity_accounts (Username, Password, isAdmin) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$username, $password, $isAdmin]);
    } 

    elseif (isset($_POST['editUser'])){
        $userID = $_POST['ID'];
        $_SESSION["ID"] = $userID;
        header("Location: editUser.php");
    }
    
    elseif (isset($_POST['addEdit'])){
        $userID = $_SESSION['ID'];
        $username = $_POST['Username'];
        $password = password_hash($_POST['Password'], PASSWORD_BCRYPT);
        $isAdmin = isset($_POST['isAdmin']) ? 1 : 0;
        $sql = "UPDATE entity_accounts SET Username = ?, Password = ?, isAdmin = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$username, $password, $isAdmin, $userID]);
        header("Location: adminMenu.php");
    }
}









//function

if (isset($_POST['action']) && $_POST['action'] == 'getPage') {
    

//Get the total num of usrs

$ttuq = "SELECT COUNT(*) AS total FROM entity_accounts";
$result = $conn->query($ttuq);
$totalUsers = $result->fetch_assoc()['total'];

$totalPages = ceil($totalUsers / $display);

//Determing page and offset
$currentPage = isset($_POST['data']) ? intval($_POST['data']) :1;
if($currentPage < 1) $currentPage = 1;
if($currentPage > $totalPages) $currentPage = $totalPages;

$offset = ($currentPage -1) * $display;



// Fetch users from the database
$sql = "SELECT ID, Username, Password, isAdmin, Wins FROM entity_accounts LIMIT $display OFFSET $offset";
$users = $conn->query($sql);

$userArray = array();

while ($row = $users->fetch_assoc()) {
    // echo json_encode($row);
    array_push($userArray, $row);
}

echo json_encode($userArray);



}

if (isset($_POST['action']) && $_POST['action'] == 'getPageCount') {
    $ttuq = "SELECT COUNT(*) AS total FROM entity_accounts";
    $result = $conn->query($ttuq);
    $totalUsers = $result->fetch_assoc()['total'];

    $totalPages = ceil($totalUsers / $display);

    echo $totalPages;
}














