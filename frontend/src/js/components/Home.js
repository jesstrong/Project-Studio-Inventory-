export default {
    Home,
    NavHome
}

const appDiv = document.getElementById('app');

function Home() {
    return `
        <h1>Welcome to the Thing!!</h1>
    `;
}

function NavHome() {
    const homeLink = document.querySelector(".nav_home");
    homeLink.addEventListener('click', function (){
        appDiv.innerHTML = Home();
    })
}