function signIn() {
    var name = document.getElementById("r-name");
    var email = document.getElementById("r-email");
    var password = document.getElementById("r-password");
    var userData = localStorage.getItem("userData")
    var emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (name.value == "") {
        swal({
            title: "Enter User Name",
            text: "User Name is necessary",
            icon: "error"
        });
    }else if(!emailregex.test(email.value)){
        swal({
            title: "Enter Correct Email",
            // text: "User Name is necessary",
            icon: "error"
        });
    }
}