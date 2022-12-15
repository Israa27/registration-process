let form=document.querySelector('.form')
let username=document.getElementById('username')
let email=document.getElementById('email')
let passsword=document.getElementById('password')
let confirmPassword=document.getElementById('confirm-password')



let regxUsername=/^[a-zA-Z]+\d\w{5,15}$/
let regxEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
let regxPassword=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
//Username must be between 5 and 15 characters,only letters and numbers
//Password must be at least 8 characters
//Password must be at least 8 characters
//The Password must contain at least one uppercase, lowercase letter, number, symbol and minimum 8 characters

form.addEventListener('submit', (e) => {
    e.preventDefault()
    validation()
    const formData={
    'username':username.value,
    'email':email.value,
    'password':passsword.value,
    'password_confirmation':confirmPassword.value,
    }
    console.log(formData)
    fetch('https://goldblv.com/api/hiring/tasks/register',{
        method:'POST',
        body:JSON.stringify(formData),
        cache: 'no-cache',
        mode: 'cors',
        redirect: 'follow',
        credentials: 'same-origin',
        headers:{"Content-type": "application/json;charset=UTF-8",'Accept': 'application/json'},
    }).then((response)=>response.json())
       .then((data)=>{
        window.localStorage.setItem("user", JSON.stringify(data.email));                            
        let user=JSON.parse(window.localStorage.getItem("user")); 
        console.log(typeof user)
         
        const ref="../welcome page/welcome_page.html";
        window.open(ref,"_self")
       
       })
       
       .catch((data)=>console.log('Error:',data.message))
    
})

const setError=(element,message)=>{
    let inputField=element.parentElement
    let dispalyError=inputField.querySelector('.error')
    dispalyError.innerText=message
    inputField.classList.add('error')
    inputField.classList.remove('success')


}

const setSuccess=(element)=>{
    let inputField=element.parentElement
    let dispalyError=inputField.querySelector('.error')
    dispalyError.innerText=''
    inputField.classList.remove('error')
    inputField.classList.add('success') 
   
}
let validation=()=>{
    let usernameValue=username.value.trim()
    let emailValue=email.value.trim()
    let passswordValue=passsword.value.trim()
    let confirmPasswordValue=confirmPassword.value.trim()
    
    //username validation
    if(usernameValue=== ''){
        setError(username,'Username is required.')
    }
    else if(!(regxUsername.test(usernameValue))){
        setError(username,'Username must be between 5 and 15 characters,only letters and numbers')
    }
    else{
        setSuccess(username)
    }

    //email validation
    if(emailValue===''){
        setError(email,'Email is required.')
    }
    else if(!(regxEmail.test(emailValue))){
        setError(email,'Invalid email.')
    }
    else{
        setSuccess(email)
    }

    //password validation
    if(passswordValue===''){
        setError(passsword,'Password is required.')
    }
    else if(passswordValue.length < 8){
        setError(passsword,'Password must be at least 8 characters.')
    }
    else if(!(regxPassword.test(passswordValue))){
        setError(passsword,'The Password must contain at least one uppercase, lowercase letter, number, symbol and minimum 8 characters')
    }
    else{
        setSuccess(passsword)
    }

    //confirm password validation
    if(confirmPasswordValue=== ''){
        setError(confirmPassword,'Please confirm your password.')
    }
    else if(passswordValue !== confirmPasswordValue){
        setError(confirmPassword,"Passwords doesn't match")
    }
    else{
        setSuccess(confirmPassword)
    }

}
