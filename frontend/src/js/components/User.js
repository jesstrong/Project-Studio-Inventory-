export default {
    SignUpPage,
    NavProfile
}

const appDiv = document.getElementById('app');
const staticAdminKey = "IsAdmin"

function SignUpPage() {
    return `
        <h3>Please create your account or login.</h3>

        <section class='equipmentForm'>
            <input type='text' id='equipmentName' placeholder='User Name' />
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
    })
}

function CreateProfile() {
    const saveUserButton = document.getElementById('saveUserButton');
    saveUserButton.addEventListener('click', function(){
        const name = document.getElementById('equipmentName').value;
        const password = document.getElementById('serialNumber').value;
        const adminKey = document.getElementById('category').value;
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
    })
}