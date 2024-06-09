<?php
session_start();

require 'dbconnect.php';
$display = 20;

// Handle user deletion and addition
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['delete'])) {
        $userID = $_POST['UserID'];
        
        $sql2 = "DELETE FROM xref_admin WHERE UserID = ?";
        $sql = "DELETE FROM enum_login WHERE UserID = ?";
        $sql3 = "DELETE FROM entity_accounts WHERE UserID = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([$userID]);
        $stmt->close();
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute([$userID]);
        $stmt2->close();
        
        $stmt3 = $conn->prepare($sql3);
        $stmt3->execute([$userID]);
        $stmt3->close();
        
    }
    
    elseif (isset($_POST['addUser'])) {
        $username = strtolower($_POST['Username']);
        $password = password_hash($_POST['Password'], PASSWORD_BCRYPT);
        $LastName = $_POST['LastName'];
        $FirstName = $_POST['FirstName'];
        $isAdmin = isset($_POST['isAdmin']) ? 1 : 0;
        
        $sql = "INSERT INTO entity_accounts (Username, LastName, FirstName) VALUES (?, ?, ?)";
        $sql2 = "SELECT UserID FROM entity_accounts WHERE Username = ?";
        $sql3 = "INSERT INTO enum_login (UserID, Password) VALUES (?,?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $LastName, $FirstName);
        $stmt->execute();
        $stmt->close();
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("s", $username);
        $stmt2->execute();
        $stmt2->store_result();
        $stmt2->bind_result($result);
        $stmt2->fetch();
        $stmt2->close();
        
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param("is", $result, $password);
        $stmt3->execute();
        $stmt3->close();
        
        
        if($isAdmin) {
            $role = "ADMIN";
            $sql4 = "INSERT INTO xref_admin (UserID, Role) VALUES(?, ?)";
            $stmt4 = $conn->prepare($sql4);
            $stmt4->bind_param("is", $result, $role);
            $stmt4->execute();
            $stmt4->close();
        }
        
        
        
        
    } 

    elseif (isset($_POST['editUser'])){
        $userID = $_POST['UserID'];
        $_SESSION["UserID"] = $userID;
        header("Location: editUser.php");
    }
    
    elseif (isset($_POST['addEdit'])){
        $userID = $_SESSION['UserID'];
        $username = strtolower($_POST['Username']);
        $LastName = $_POST['LastName'];
        $FirstName = $_POST['FirstName'];
        $password = password_hash($_POST['Password'], PASSWORD_BCRYPT);
        $isAdmin = isset($_POST['isAdmin']) ? 1 : 0;
        $sql = "UPDATE entity_accounts SET Username = ?, LastName = ?, FirstName = ? WHERE UserID = ?";
        $sql2 = "UPDATE enum_login SET Password = ? WHERE UserID = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $username, $LastName, $FirstName, $userID);
        $stmt->execute();
        $stmt->close();
        
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("si", $password, $userID);
        $stmt2->execute();
        $stmt2->close();
        
        
        if($isAdmin) {
            
            $sql3 = "SELECT AdminID FROM xref_admin WHERE UserID = ?";
            
            $stmt3 = $conn->prepare($sql3);
            $stmt3->bind_param("i", $userID);
            $stmt3->execute();
            $stmt3->store_result();
            
            if($stmt3->num_rows() >0) {
                
            }
            else {
                
                $result = $_SESSION['UserID'];
                $role = "ADMIN";
                $sql4 = "INSERT INTO xref_admin (UserID, Role) VALUES(?, ?)";
                $stmt4 = $conn->prepare($sql4);
                $stmt4->bind_param("is", $result, $role);
                $stmt4->execute();
                $stmt4->close();
            }
            
            $stmt3->close();
            
        }
        
        else {
            $sql3 = "SELECT AdminID FROM xref_admin WHERE UserID = ?";
            
            $stmt3 = $conn->prepare($sql3);
            $stmt3->bind_param("i", $userID);
            $stmt3->execute();
            $stmt3->store_result();
            
            if($stmt3->num_rows >0) {
                $sql4 = "DELETE FROM xref_admin WHERE UserID = ?";
                $stmt4 = $conn->prepare($sql4);
                $stmt4->bind_param("i", $userID);
                $stmt4->execute();
                $stmt4->close();
            }
            
            $stmt3->close();
            
        }
        
        unset($_SESSION['UserID']);
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
$sql = "SELECT UserID, Username, LastName, FirstName, Wins FROM entity_accounts LIMIT $display OFFSET $offset";
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














