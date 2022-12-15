let emailOfUser=document.querySelector('.right-side #user-email')
emailOfUser.innerText=JSON.parse(window.localStorage.getItem("user"));