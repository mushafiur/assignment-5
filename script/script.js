// login script authenticate 
const handleLogin=()=>{
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === ""){
        alert("Enter your username.");
        return;
    }

    if(password === ""){
        alert("Enter your password");
        return;
    }

    if(username === "admin" && password === "admin123"){
        localStorage.setItem("isLoggedIn", "true");
        window.location.href= "main.html";
    }else{
        alert("Invalid username or password!");
    }

};