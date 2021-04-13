import apiAction from "../api/api-actions";
import Home from "./Home";

export default {
    SignUpPage,
    NavProfile,
    CreateProfile
}

const appDiv = document.getElementById('app');
const staticAdminKey = "IsAdmin"

function SignUpPage() {
    return `
        <h3>Please create your account or login.</h3>

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

function NavProfile() {
    const homeLink = document.querySelector(".nav_profile");
    homeLink.addEventListener('click', function (){
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