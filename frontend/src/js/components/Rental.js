import apiAction from "../api/api-actions";
import Cookie from "../cookie/cookie-actions";

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
            const date = document.getElementById('rentalDate').value;
            equipmentDiv.innerHTML = PopulateEquipmentDiv(data, date);
            CheckboxFunctionality();
            SubmitRentalBtn(date.value);
        })
    })
}

function PopulateEquipmentDiv(categories, rentalDate){
    return `
    <h2>Available Equipment</h2>
    <ul>
        ${categories.map(category =>{
            return `
            <li>
                <h4>${category.name}</h4>
                <ol>
                ${category.equipmentList.map(equipment =>{
                    var isRented = false;
                    equipment.rentalDateList.forEach(date =>{
                        if(date === rentalDate){
                            isRented = true;
                        }
                    })

                    if (isRented == false){
                    return`
                    <li>
                        <input type="checkbox" class="equipmentSelector" id="${equipment.id}" name="${equipment.name}" value="${equipment.id}">
                        <label for="${equipment.name}">${equipment.name}</label><br>
                    </li>
                    `
                    }
                }).join('')}
                </ol>
            </li>
            `
        }).join('')}
    </ul>
    <button class="submitRentalBtn">Submit Rental for Approval</button>
    `
}

function CheckboxFunctionality(){
    const checkboxes = document.querySelectorAll('.equipmentSelector');
    checkboxes.forEach(checkbox =>{
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              equipmentIds.push(`${checkbox.id}`);
            } else {
              let index = equipmentIds.indexOf(`${checkbox.id}`);
              equipmentIds.splice(index,1);
            }
          })
    })
}

function SubmitRentalBtn(rentalDate){
    const SubmitBtnElement = document.querySelector(".submitRentalBtn");
    SubmitBtnElement.addEventListener('click', () =>{
        const userId = Cookie.getCookie("userId");
        const approvedBool = false;
        const deiniedBool = true;
        const message = "Awaiting Approval"
        var rentalIdString = "empty";
        equipmentIds.forEach(id =>{
            if(rentalIdString == "empty")
            {
                rentalIdString = id;
            }
            else
            {
                rentalIdString += ',' + id;
            }
        })
        const requestBody = {
            UserId: userId,
            Date: rentalDate,
            IsApproved: approvedBool,
            IsDenied: deiniedBool,
            Feedback: message,
            EquipmentIds: equipmentIds
        } 

    })
}