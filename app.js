//************ */ ** Sign In Function **  ***************************//
function signIn() {
    var name = document.getElementById("r-name");
    var email = document.getElementById("r-email");
    var password = document.getElementById("r-password");
    var userData = localStorage.getItem("userData")
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


    if (name.value == "") {
        swal({
            title: "Enter User Name",
            text: "User Name is necessary",
            icon: "warning"
        });
        return;
    } else if (!emailRegex.test(email.value)) {
        swal({
            title: "Enter Correct Email",
            text: "Email is necessary",
            icon: "warning"
        });
        return;
    } else if (password.value == "") {
        swal({
            title: "Enter Password",
            text: "Password is necessary",
            icon: "warning"
        });
        return;
    } else if (!passwordRegex.test(password.value)) {
        swal({
            title: "Suggest Strong Password",
            text: "Minimum eight characters, at least one letter, one number and one special character",
            icon: "error"
        });
        return;
    }
    else {
        swal({
            title: "Log in Successfully! ",
            icon: "success"
        });

    }
    // ** If userData exists, parse it; otherwise, initialize as empty array **
    if (userData) {
        userData = JSON.parse(userData)
    } else {
        userData = []
    }


    // ** user Data store in object **

    userObj = {
        name: name.value,
        email: email.value,
        password: password.value,
    }

    // ** Push userObj into userData if password is valid **
    if (passwordRegex.test(password.value)) {
        userData.push(userObj);
        name.value = "";
        email.value = "";
        password.value = "";
    }
    // ** Save updated userData to localStorage **
    localStorage.setItem("userData", JSON.stringify(userData));

    //  ** Redirect to login.html page ** 
    window.location.href = "../log-in/login.html";
}


//****************** */  ** Log In Function ** ************************//

function logIn() {
    var email = document.getElementById("l-email");
    var password = document.getElementById("l-password");
    var userData = localStorage.getItem("userData");
    var saveUser = {};
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


    if (!emailRegex.test(email.value)) {
        swal({
            title: "Enter Correct Email",
            text: "Email is necessary",
            icon: "warning"
        });
        return;
    } else if (password.value == "") {
        swal({
            title: "Enter Password",
            text: "Password is necessary",
            icon: "warning"
        });
        return;
    } else if (!passwordRegex.test(password.value)) {
        swal({
            title: "Suggest Strong Password",
            text: "Minimum eight characters, at least one letter, one number and one special character",
            icon: "error"
        });
        return;
    }

    if (userData) {
        userData = JSON.parse(userData)
    } else {
        userData = []
    }

    for (var i = 0; i < userData.length; i++) {
        if (email.value == userData[i].email) {
            saveUser = userData[i]
            break
        }
    }

    if (saveUser.email) {
        if (saveUser.password == password.value) {
            swal({
                title: "Log In Successfuly",
                icon: "success",
            });
            window.location.href = "../board/board.html";
            email.value = "";
            password.value = "";
        } else {
            swal({
                title: "Invalid Password",
                icon: "error",
            });
        }
    } else {
        swal({
            title: "User Not Found",
            icon: "error",
        });
    }


}


//****************** */  ** Log out Function ** ************************//
function logOut(e) {

    localStorage.removeItem(userData);
    window.location.href = "../index.html";
}







// ****  ************* Kanban Board functions ****   *****************

// **  ********************** Add Task function ** *****************

function addTask() {
    let taskTitle = document.getElementById("recipient-name").value;
    let taskDescription = document.getElementById("message-text").value;
    let todoList = document.getElementById("todo-list");
    let progressList = document.getElementById("in-progress-list");
    let doneList = document.getElementById("done-list");
    let status = document.getElementById("task-list-select").value;


    if (taskTitle == "" && taskDescription == "") {
        swal({
            title: "Input Is Empty",
            text: "Kindly Fill The input-field",
            icon: "warning"
        });
    }
    else {

        let taskId = new Date().getTime();

        if (status == "Add Task") {
            todoList.innerHTML += `<li id="${taskId}" class='task-li' draggable="true" ondragstart="drag(event)">
        <h4>Title</h4>
        <h5>${taskTitle}</h5>
        <h4 class="mt-3">Description:</h4>
        <p>${taskDescription}</p>
        <h5>Status:</h5>
        <p>${status}</p>
        <button onclick='deleteTask(${taskId})'><i class="fa-solid fa-xmark"></i></button>
    </li>`;
            taskDescription = "";
            taskTitle = ""

        } else if (status == "In Progress") {
            progressList.innerHTML += `<li id="${taskId}" class='task-li' draggable="true" ondragstart="drag(event)">
        <h4>Title</h4>
        <h5>${taskTitle}</h5>
        <h4 class="mt-3">Description:</h4>
        <p>${taskDescription}</p>
        <h5>Status:</h5>
        <p>${status}</p>
        <button onclick='deleteTask(${taskId})'><i class="fa-solid fa-xmark"></i></button>
    </li>`;
            taskDescription = "";
            taskTitle = ""

        } else if (status == "Done Task") {
            doneList.innerHTML += `<li id="${taskId}" class='task-li' draggable="true" ondragstart="drag(event)">
            <h4>Title</h4>
            <h5>${taskTitle}</h5>
            <h4 class="mt-3">Description:</h4>
            <p>${taskDescription}</p>
            <h5>Status:</h5>
            <p>${status}</p>
            <button onclick='deleteTask(${taskId})'><i class="fa-solid fa-xmark"></i></button>
        </li>`;
        }
    }
    document.getElementById("recipient-name").value = "";
    document.getElementById("message-text").value = "";
}

// **** ******************* Drag And Drop Functions **** *************
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add("dragging");
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let task = document.getElementById(data);
    task.classList.remove("dragging");
    event.target.closest(".dropzone").querySelector(".task-list").appendChild(task);
}

// ** ***************** Delete Task function ** **********************
function deleteTask(taskId) {
    let task = document.getElementById(taskId);
    if (task) {
        task.remove();
    } else {
        console.error("Task not found or taskId is incorrect.");
    }
}



