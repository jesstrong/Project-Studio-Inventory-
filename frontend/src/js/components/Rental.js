import apiAction from "../api/api-actions";

export default{
    NavRentalForm
}

const appDiv = document.getElementById('app');

function RentalFormPage(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth()+1).padStart(2,'0');
    const year = today.getFullYear();
    const date = year + '-' + month + '-' + day;

    return `
    <h1>Rental Form</h1>

    <input type = "date" id = "rentalDate" value='${date}' min='${date}'>
    <button class="dateBtn">Check Availablity</button>
    <div id="availableEquipment">

    </div>
    `
}



function NavRentalForm() {
    const homeLink = document.querySelector(".nav_rental");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest('https://localhost:44372/api/Rental', data => {
            appDiv.innerHTML = RentalFormPage(data);
            DateBtn();
        })
    })
}

function DateBtn(){
    const dateBtnElement = document.querySelector(".dateBtn");
    const equipmentDiv = document.getElementById("availableEquipment");
    dateBtnElement.addEventListener('click', function(){
        apiAction.getRequest('https://localhost:44372/api/Category', data =>{
            equipmentDiv.innerHTML = PopulateEquipmentDiv(data);
        })
    })
}

function PopulateEquipmentDiv(categories){
    return `
    <h2>Available Equipment</h2>
    <ul>
        ${categories.map(category =>{
            return `
            <li>
                <h4>${category.name}</h4>
            </li>
            `
        }).join('')}
    </ul>
    `
}