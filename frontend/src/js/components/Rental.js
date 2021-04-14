import apiAction from "../api/api-actions";

export default{
    NavRentalForm
}

const appDiv = document.getElementById('app');

function RentalFormPage(){
    return `
    <h1>Rental Form</h1>
    `
}



function NavRentalForm() {
    const homeLink = document.querySelector(".nav_rental");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest('https://localhost:44372/api/Rental', data => {
            appDiv.innerHTML = RentalFormPage(data);
            
        })
    })
}