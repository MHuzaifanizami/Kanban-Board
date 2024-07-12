// ** Sign In Function **  //
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


//  ** Log In Function ** //

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


// ****  Kanban Board functions ****

// ** Add Task function **

function addTask() {
    let taskTitle = document.getElementById("recipient-name").value;
    let taskDescription = document.getElementById("message-text").value;
    let list = document.getElementById("list");


    list.innerHTML += `<li class='task-li'>
     <h4>Title</h4>
          <h5>${taskTitle}</h5>
          <h4 class="mt-3">Description : </h4>
          <p>${taskDescription}</p>
          <h5>Status : <span>Add Task</span></h5>
          <button onclick='deleteTask()'><i class="fa-solid fa-xmark"></i></button>
    <li>`
}

// ** Delete Task function **
function deleteTask() {
    let taskList = document.querySelector(".task-li");
    taskList.innerHTML = ""
}