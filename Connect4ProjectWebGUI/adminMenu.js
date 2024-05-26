const leftButton = document.getElementById("left-arrow");
const rightButton = document.getElementById("right-arrow");
const pageLabel = document.getElementById("page-number");
const userList = document.getElementById("user-list");

var page = 1;
var pageCount = getPageCount();;

function handleLeft(){
    if(page != 1)page--;
    getUserList(page);
    updatePage();
}

function handleRight(){
    if(page != pageCount)page++;
    getUserList(page);
    updatePage();
}

function updatePage() {
    document.getElementById('pageNum').innerText = page;
    
}

leftButton.addEventListener('click', handleLeft);
rightButton.addEventListener('click', handleRight);
document.addEventListener('DOMContentLoaded', getUserList(page));

function getUserList(p){
    $.ajax({
        type: "POST",
        url: 'AdminPhp.php',
        data: {action: 'getPage', data: p},
        success:function(d){
            const userArray = JSON.parse(d);
            displayUsers(userArray);
        }
    });
}

function getPageCount(){
    $.ajax({
        type: "POST",
        url: 'AdminPhp.php',
        data: {action: 'getPageCount'},
        success:function(d){
            pageCount = parseInt(d);
        }
    });

    return pageCount;
}


function displayUsers(userArray){
    userList.replaceChildren();
    for(let i = 0; i < Object.keys(userArray).length; i++){
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(userArray[i]['Username']));
        userList.appendChild(li);
    }
}