import apiAction from "../api/api-actions";
import Home from "./Home";

export default {
    SignUpPage,
    NavSignUp,
    CreateProfile,
    NavLogin
}

const appDiv = document.getElementById('app');
const staticAdminKey = "IsAdmin"

function SignUpPage() {
    return `
        <h3>Please create your account.</h3>

        <section class='equipmentForm'>
            <input type='text' id='userName' placeholder='User Name' />
            <br/>
            <input type='password' id='password' placeholder='Password' />
            <br/>
            <input type='password' id='adminKey' placeholder='Admin Key' />
            <br/>
            <button id='saveUserButton'>Create Account</button>
        </section>
    `;
}

function NavSignUp() {
    const signUpLink = document.querySelector(".nav_signUp");
    signUpLink.addEventListener('click', function (){
        appDiv.innerHTML = SignUpPage();
        CreateProfile();
    })
}

function CreateProfile() {
    const saveUserButton = document.getElementById('saveUserButton');
    saveUserButton.addEventListener('click', function(){
        const name = document.getElementById('userName').value;
        const password = document.getElementById('password').value;
        const adminKey = document.getElementById('adminKey').value;
        var isAdmin

        if (adminKey === staticAdminKey)
        {
            isAdmin = true;
        }
        else
        {
            isAdmin = false;
        }

        const requestBody = {
            Name: name,
            Password: password,
            isAdmin: isAdmin
        }
        
        apiAction.postRequest('https://localhost:44372/api/User', requestBody, () => {
                appDiv.innerHTML = Home.Home();
        })
    })
}

function NavLogin(){
    const logInLink = document.querySelector(".nav_login");
    logInLink.addEventListener('click', function (){
        appDiv.innerHTML = LoginPage();
    })
}

function LoginPage() {
    return `
        <h3>Please login.</h3>

        <section class='equipmentForm'>
            <input type='text' id='userName' placeholder='User Name' />
            <br/>
            <input type='password' id='password' placeholder='Password' />
            <br/>
            <button id='loginButton'>Login</button>
        </section>
    `;
}