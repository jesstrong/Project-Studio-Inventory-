import apiAction from "../api/api-actions";

export default{
    NavRentalForm
}

const appDiv = document.getElementById('app');
var equipmentIds = [];

function RentalFormPage(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth()+1).padStart(2,'0');
    const year = today.getFullYear();

    const minDate = year + '-' + month + '-' + day;

    var monthRollover = today.getMonth()+2
    if(monthRollover > 12)
    {
        var maxMonth = "01";
        var maxYear = year + 1;
    }
    else
    {
        var maxMonth = String(today.getMonth()+2).padStart(2,'0');
        var maxYear = year;
    }

    console.log(year + 1);
    const maxDate = maxYear + '-' + maxMonth + '-' + day;

    return `
    <h1>Rental Form</h1>

    <input type = "date" id = "rentalDate" value='${minDate}' min='${minDate}' max='${maxDate}'>
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
            CheckboxFunctionality();
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
                <ol>
                ${category.equipmentList.map(equipment =>{
                    return`
                    <li>
                        <input type="checkbox" class="equipmentSelector" id="${equipment.id}" name="${equipment.name}" value="${equipment.id}">
                        <label for="${equipment.name}">${equipment.name}</label><br>
                    </li>
                    `
                }).join('')}
                </ol>
            </li>
            `
        }).join('')}
    </ul>
    `
}

function CheckboxFunctionality(){
    const checkboxes = document.querySelectorAll('.equipmentSelector');
    checkboxes.forEach(checkbox =>{
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              equipmentIds.push(`${checkbox.id}`);
              console.log(equipmentIds);
            } else {
              let index = equipmentIds.indexOf(`${checkbox.id}`);
              equipmentIds.splice(index,1);
              console.log(equipmentIds);
            }
          })
    })
}