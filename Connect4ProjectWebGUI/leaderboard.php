<?php
session_start();
require 'dbconnect.php';
$display = 30;


function send_json_response($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}


if (isset($_POST['action']) && $_POST['action'] == 'getLeaderboardPage') {
   
    $ttuq = "SELECT COUNT(*) AS total FROM entity_accounts";
    $result = $conn->query($ttuq);
    $totalUsers = $result->fetch_assoc()['total'];

    $totalPages = ceil($totalUsers / $display);

    
    $currentPage = isset($_POST['data']) ? intval($_POST['data']) : 1;
    if ($currentPage < 1) $currentPage = 1;
    if ($currentPage > $totalPages) $currentPage = $totalPages;

    $offset = ($currentPage - 1) * $display;

   
    $sql = "SELECT Username, Wins FROM entity_accounts ORDER BY Wins DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $display, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $userArray = array();
    while ($row = $result->fetch_assoc()) {
        array_push($userArray, $row);
    }

    send_json_response($userArray);
}

if (isset($_POST['action']) && $_POST['action'] == 'getLeaderboardPageCount') {
    $ttuq = "SELECT COUNT(*) AS total FROM entity_accounts";
    $result = $conn->query($ttuq);
    $totalUsers = $result->fetch_assoc()['total'];

    $totalPages = ceil($totalUsers / $display);

    send_json_response($totalPages);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="leaderboard.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
</head>
<body>
    <div class="leaderboard-container">
        <h1>Leaderboard</h1>
        <div class="leaderboard-users-container">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody id="leaderboard-list"></tbody>
            </table>
        </div>
        <div class="leaderboard-menu-buttons">
            <button id="left-arrow"><<</button>
            <label id="page-number">1</label>
            <button id="right-arrow">>></button>
        </div>
    </div>

   <script>
    const leftButton = document.getElementById("left-arrow");
    const rightButton = document.getElementById("right-arrow");
    const pageLabel = document.getElementById("page-number");
    const leaderboardList = document.getElementById("leaderboard-list");

    let page = 1;
    let pageCount = 1;

    leftButton.addEventListener('click', handleLeft);
    rightButton.addEventListener('click', handleRight);

    document.addEventListener('DOMContentLoaded', function() {
        getPageCount().then(count => {
            pageCount = count;
            getLeaderboardPage(page);
        }).catch(error => {
            console.error('Error fetching page count:', error);
        });
    });

    function handleLeft() {
        if (page > 1) {
            page--;
            getLeaderboardPage(page);
            updatePage();
        }
    }

    function handleRight() {
        if (page < pageCount) {
            page++;
            getLeaderboardPage(page);
            updatePage();
        }
    }

    function updatePage() {
        pageLabel.innerText = page;
    }

    function getLeaderboardPage(p) {
        $.ajax({
            type: "POST",
            url: 'leaderboard.php',
            data: { action: 'getLeaderboardPage', data: p },
            success: function(d) {
                let userArray = d;
                
                if (typeof d === "string") {
                    try {
                        userArray = JSON.parse(d);
                    } catch (e) {
                        console.error("Invalid JSON response:", d);
                        return;
                    }
                }
                displayLeaderboard(userArray);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching leaderboard page:', error);
            }
        });
    }

    function getPageCount() {
        return $.ajax({
            type: "POST",
            url: 'leaderboard.php',
            data: { action: 'getLeaderboardPageCount' },
            success: function(d) {
                let pageCount = d;
                
                if (typeof d === "string") {
                    try {
                        pageCount = JSON.parse(d);
                    } catch (e) {
                        console.error("Invalid JSON response:", d);
                        return 1;
                    }
                }
                return pageCount;
            },
            error: function(xhr, status, error) {
                console.error('Error fetching page count:', error);
                return 1;
            }
        });
    }

    function displayLeaderboard(userArray) {
        leaderboardList.replaceChildren();
        for (let i = 0; i < userArray.length; i++) {
            const tr = document.createElement('tr');
            const tdUsername = document.createElement('td');
            const tdWins = document.createElement('td');

            tdUsername.appendChild(document.createTextNode(userArray[i]['Username']));
            tdWins.appendChild(document.createTextNode(userArray[i]['Wins']));

            tr.appendChild(tdUsername);
            tr.appendChild(tdWins);
            leaderboardList.appendChild(tr);
        }
    }
</script>

</body>
</html>

