export default {
    Header,
    SetupHeader
}

function Header(){
    return `
    <nav>
        <ul>
            <li class='nav_home'>Home</li>
            <li class='nav_users'>Users</li>
            <li class='nav_equipmentList'>Equipment</li>
            <li class='nav_category'>Category</li>
        </ul>
    </nav>
    `;
}

function SetupHeader() {
    const headerElement = document.querySelector(".header");
    headerElement.innerHTML = Header();
}