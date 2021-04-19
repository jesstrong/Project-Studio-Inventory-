export default {
    Header,
    SetupHeader
}

function Header(){
    return `
    <h3>STUDI/O ACCESS ALLY</h3>
    <div class="user_nav">
        <img id="user" src="images/User_Icon.png">
        <ul class="login_links">
            <li class='nav_signUp'>Sign Up</li>
            <li class='nav_login'>Login</li>
        </ul>
    </div>
    <nav>
        <ul class="nav_links">
            <li class='nav_home'>Home</li>
            <li class='nav_profile'>Profile</li>
            <li class='nav_equipmentList'>Equipment</li>
            <li class='nav_category'>Category</li>
            <li class='nav_rental'>Create Rental</li>
            <li class='nav_contact'>Contact Us</li>
        </ul>
    </nav>
    `;
}

function SetupHeader() {
    const headerElement = document.querySelector(".header");
    headerElement.innerHTML = Header();
}