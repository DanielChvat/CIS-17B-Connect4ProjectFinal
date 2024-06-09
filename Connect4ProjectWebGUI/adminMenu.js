const leftButton = document.getElementById("left-arrow");
const rightButton = document.getElementById("right-arrow");
const pageLabel = document.getElementById("page-number");
const editButton = document.getElementById("edit-button");
const userList = document.getElementById("user-list");

var page = 1;
var pageCount = getPageCount();
let editing = false;

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

function handleEdit(){
    editing = !editing;
    getUserList(page);
}

leftButton.addEventListener('click', handleLeft);
rightButton.addEventListener('click', handleRight);
editButton.addEventListener('click', handleEdit);
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
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(userArray[i]['Username']));
        

        const form = document.createElement('form');
        form.method = "POST";
        form.style="display:inline;";
        form.appendChild(li);
        if(editing){
            const eButton = document.createElement('button');
            const eicon = document.createElement('i');
            eicon.className = "fa fa-pencil";
            eButton.appendChild(eicon);
            eButton.name = 'editUser';
            eButton.type = 'submit';


            const userInput = document.createElement('input');
            userInput.type = 'hidden';
            userInput.name = 'UserID';
            userInput.id = 'UserID';
            userInput.value = userArray[i]['UserID'];




            const dButton = document.createElement('button');
            const dicon = document.createElement('i');
            dicon.className = "fa fa-trash";
            dButton.appendChild(dicon);
            dButton.name = 'delete';
            dButton.type = 'submit';
            dButton.onclick = ()=>confirm("Are you sure you want to delete " + userArray[i]['Username'] + "?");


            li.appendChild(userInput);
            li.appendChild(document.createTextNode(" "));
            li.appendChild(eButton);
            li.appendChild(document.createTextNode(" "));
            li.appendChild(dButton);
        }

        userList.appendChild(form);
    }
}