let signUpLink=document.querySelector(".sign-up");
let heading=document.querySelector(".heading");
let userNameInput=document.createElement("input");
let loginSignUpBtn=document.querySelector(".login-signup-button");
let paragraphElement=document.querySelector(".paragraph");
let alarmMsg=document.querySelector(".inc-msg");
let emailInput=document.getElementById("email");
let emailMsg=document.querySelector(".email-msg");
let passwordInput=document.getElementById("password");
let passwordMsg=document.querySelector(".pass-msg")
let data=[]
let mainPage=document.querySelector(".main-page");
let form=document.querySelector(".form");
let navBar=document.querySelector(".navbar");
let logoutButton=document.querySelector(".logout-button");


// console.log(JSON.parse(localStorage.getItem("users")))
JSON.parse(localStorage.getItem("users"))!==null ? data=JSON.parse(localStorage.getItem("users")):true;

signUpLink.addEventListener("click",(e)=>{
    ! signUpLink.classList.contains("active")?signInFormFunction ():signUpFormFunction ();
    
})
loginSignUpBtn.addEventListener("click",function(){
    ! loginSignUpBtn.classList.contains("login") ?  signingUp (): login();
})

logoutButton.addEventListener("click",function(){
    logout();
})

function signUpFormFunction (){
    alarmMsg.classList.add("d-none")
    //adding attributes to created ele
    userNameInput.setAttribute("id","username")
    userNameInput.setAttribute("type","text")
    userNameInput.setAttribute("name","username")
    userNameInput.setAttribute("class","form-control my-3 bg-transparent text-white")
    userNameInput.setAttribute("placeholder","Enter Your Name")
    
    // get heading ele to put the created ele (username) after it 
    
    heading.after(userNameInput);

   loginSignUpBtn.textContent="sign Up";
   loginSignUpBtn.classList.remove("login")

   paragraphElement.textContent="You have an account?";

   signUpLink.textContent="sign In";
    signUpLink.classList.remove("active") 
}

function signInFormFunction (){
    userNameInput.value=''
    emailInput.value=''
    passwordInput.value=''
    alarmMsg.classList.add("d-none");
    emailMsg.classList.add("d-none") ;
    passwordMsg.classList.add("d-none");
    userNameInput.remove();
    loginSignUpBtn.textContent="login";
    loginSignUpBtn.classList.add("login")
    paragraphElement.textContent="Don’t have an account?";
    signUpLink.textContent="sign up";
    signUpLink.classList.add("active") 
}

function signingUp (){
    let emailInputRe=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRe=/^.{8,}$/;
    let flag=0;
    alarmMsg.classList.add("d-none");
    emailMsg.classList.add("d-none") ;
    passwordMsg.classList.add("d-none");
    
    if(emailInput.value==="" || userNameInput.value==="" || passwordInput.value===""){
        alarmMsg.innerHTML="* all fields are required";
        alarmMsg.style="color:red !important;"
        alarmMsg.classList.remove("d-none");
        return
    }
    if ( !  emailInputRe.test(emailInput.value) ){
        
        emailMsg.classList.remove("d-none") ;
      
        return; 
    }
    
    else if(! passwordRe.test(passwordInput.value)){
        emailMsg.classList.add("d-none") ;
       return  passwordMsg.classList.remove("d-none");
    }
    
    flag=checkingInputsInDataBase();
   
    if (flag===1){
        alarmMsg.innerHTML="email already exists";
        alarmMsg.classList.remove("success")
        alarmMsg.classList.remove("d-none");
        return;
    }
   
    else{

        passwordMsg.classList.add("d-none");
        emailMsg.classList.add("d-none") ;
        
    let userData={

        name:userNameInput.value,
        email:emailInput.value,
        pass:passwordInput.value,

    }
    data.push(userData);

    console.log(data)
    localStorage.setItem("users",JSON.stringify(data));
    userNameInput.value='';
    emailInput.value='';
    passwordInput.value='';

    // console.log("success")
    alarmMsg.innerHTML="success";
    alarmMsg.classList.add("success")
    alarmMsg.classList.remove("d-none");
}
}

function login (){
   
let flag='';
if (JSON.parse(localStorage.getItem("users"))==null){
    alarmMsg.classList.remove("d-none");
    alarmMsg.classList.remove("success");
    alarmMsg.innerHTML='incorrect email or password';  
}
else{
    alarmMsg.classList.add("d-none");
console.log
    data.forEach(e => {
        console.log(e.email)
        console.log(e.pass)
        if (e.email===emailInput.value && e.pass==passwordInput.value )
        {
            flag=e.name }
            else{
                alarmMsg.classList.remove("d-none");
                alarmMsg.classList.remove("success");
                alarmMsg.innerHTML='incorrect email or password';  
            } 
    });

   


    if(flag!==""){
    
      
        alarmMsg.classList.add("d-none");
        form.classList.add("d-none");
        mainPage.classList.remove("d-none");
        document.querySelector(".container").classList.replace("align-items-start","align-items-center");
        navBar.classList.remove("d-none");
        mainPage.innerHTML=`<p style="font-size:40px;color:rgb(23, 162, 184);padding:40px 60px;">Hello ${flag}</p>`;
        emailInput.value='';
        passwordInput.value='';
    }
}




}
function logout(){
    mainPage.classList.add("d-none");
    form.classList.remove("d-none");
    navBar.classList.add("d-none")

}
function checkingInputsInDataBase(){
    if(JSON.parse(localStorage.getItem("users"))==null){
        return 0;
    }
    for (let i=0;i<data.length;i++){
       
        if(data[i].email===emailInput.value ){
        
                    return 1;
                }
                
    }

}