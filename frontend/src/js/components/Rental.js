import apiAction from "../api/api-actions";
import Cookie from "../cookie/cookie-actions";
import User from "../components/User";

export default{
    NavRentalForm,
    UpdateNavRental,
    RentalDetailsButton
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

function UpdateNavRental(){
    const isAdmin = Cookie.getCookie("userIsAdmin");
    const rentalLink = document.querySelector(".nav_rental");
    if (isAdmin === "true"){
        rentalLink.innerText = "Pending Rentals";
    }
    else{
        rentalLink.innerText = "Create Rental";
    }
}

function NavRentalForm() {
    const rentalLink = document.querySelector(".nav_rental");
    UpdateNavRental();
    
    rentalLink.addEventListener('click', function (){
        const isAdmin = Cookie.getCookie("userIsAdmin");
        const userId = Cookie.getCookie("userId");
        if (userId == ""){
            appDiv.innerHTML = User.LoginPage();
            User.Login();
        }
        else if(isAdmin === "true"){
            apiAction.getRequest('https://localhost:44372/api/Rental', data => {
                appDiv.innerHTML = ApprovalPage(data);
                RentalApprovalButton();
                RentalDetailslButton();
            })
        }
        else{
            apiAction.getRequest('https://localhost:44372/api/Rental', data => {
                appDiv.innerHTML = RentalFormPage(data);
                DateBtn();
            })
        }
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
            SubmitRentalBtn(date);
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
        const deniedBool = false;
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
            RentalDate: rentalDate,
            IsApproved: approvedBool,
            IsDenied: deniedBool,
            FeedBack: message,
            EquipmentIds: rentalIdString
        } 

        console.log(requestBody);

        apiAction.postRequest('https://localhost:44372/api/Rental', requestBody, data =>{
            appDiv.innerHTML = `Your rental for ${data.rentalDate} has been submitted for approval.`;
        })
    })
}

function ApprovalPage(data){
    return`
        <h1>Pending Rentals</h1>
        <ol>
            ${data.map(rental =>{
                if(rental.isApproved == false && rental.isDenied == false){
                    return`
                        <li class ="rental_element" id ="${rental.id}">${rental.user.name}, ${rental.rentalDate}</li>
                    `
                }
            }).join("")}
        </ol>

        <h1>Approved Rentals</h1>
        <ol>
            ${data.map(rental =>{
                if(rental.isApproved == true){
                    return`
                        <li class ="rental_detail_element" id ="${rental.id}">${rental.user.name}, ${rental.rentalDate}</li>
                    `
                }
            }).join("")}
        </ol>
        <h1>Denied Rentals</h1>
        <ol>
            ${data.map(rental =>{
                if(rental.isDenied == true){
                    return`
                        <li  class ="rental_detail_element" id ="${rental.id}">${rental.user.name}, ${rental.rentalDate}</li>
                    `
                }
            }).join("")}
        </ol>
    `
}

function RentalApprovalButton(){
    const rentalDetailsElement = document.querySelectorAll('.rental_element');
    rentalDetailsElement.forEach(element => {
        element.addEventListener('click', function() {
            const rentalId = element.id;
            apiAction.getRequest(`https://localhost:44372/api/Rental/${rentalId}`, rental => {
                appDiv.innerHTML = RentalApprovalView(rental);
                apiAction.getRequest(`https://localhost:44372/api/EquipmentList/GetMultiple/${rental.equipmentIds}`, equipmentList =>{
                    const equipmentListDiv = document.getElementById('equipmentList');
                    equipmentListDiv.innerHTML = PopulateEquipmentList(equipmentList);
                    ApproveButton(rental, equipmentList);
                    DenyButton(rental);
                })
            })
        })
    })
}

function RentalApprovalView(data){
    return`
        <br/>
        <h4>Request Status: Pending</h4>
        <h4>Date: ${data.rentalDate}</h4>
        <h4>User: ${data.user.name}</h4>
        <br/>
        <div id="equipmentList"></div>
        <textarea rows="4" cols="50" id='feedBack'>${data.feedBack}</textarea>
        </br>
        <div id="warningText"></div>
        <button class="aprroveBtn">Approve Request</button>
        <button class="denyBtn">Deny Request</button>
    `
}

function PopulateEquipmentList(data){
    return`
        <ol>
            ${data.map(equipment =>{
                return`
                    <li>${equipment.name} | ${equipment.category.name} | ${equipment.serialNumber}</li>
                `
            }).join("")}
        </ol>
    `
}

function ApproveButton(rental, equipmentList){
    const approvalButtonElement = document.querySelector('.aprroveBtn');
    approvalButtonElement.addEventListener('click', () =>{
        equipmentList.forEach(equipment =>{
            const requestBody = {
                Id: equipment.id,
                Name: equipment.name,
                SerialNumber: equipment.serialNumber,
                CategoryId: equipment.categoryId,
                Description: equipment.description,
                Image: equipment.image,
                RentalDates: rental.rentalDate
            }
            apiAction.putRequest('https://localhost:44372/api/EquipmentList/', equipment.id, requestBody, () => {})
        })

        const requestBody = {
            Id: rental.id,
            IsApproved: true,
            IsDenied: false,
            FeedBack: "Your rental has been approved, we look forward to working with you.",
            RentalDate: rental.rentalDate,
            UserId: rental.userId,
            EquipmentIds: rental.equipmentIds
        }

        apiAction.putRequest('https://localhost:44372/api/Rental/', rental.id, requestBody, () => {
            apiAction.getRequest('https://localhost:44372/api/Rental', data => {
                appDiv.innerHTML = ApprovalPage(data);
                RentalApprovalButton();
                RentalDetailsButton();
            })
        })    
    })
}

function DenyButton(rental){
    const denialButtonElement = document.querySelector('.denyBtn');
    denialButtonElement.addEventListener('click', () =>{
        const feedBack = document.getElementById('feedBack').value;
        if (feedBack === "Awaiting Approval"){
            const warningText = document.getElementById('warningText');
            warningText.innerHTML = "Please explain why the request is being denied."
        }
        else{
            const requestBody = {
                Id: rental.id,
                IsApproved: false,
                IsDenied: true,
                FeedBack: feedBack,
                RentalDate: rental.rentalDate,
                UserId: rental.userId,
                EquipmentIds: rental.equipmentIds
            }
            apiAction.putRequest('https://localhost:44372/api/Rental/', rental.id, requestBody, () => {
                apiAction.getRequest('https://localhost:44372/api/Rental', data => {
                    appDiv.innerHTML = ApprovalPage(data);
                    RentalApprovalButton();
                    RentalDetailsButton();
                })
            })
        }
    })
}

function RentalDetailsButton(){
    const rentalDetailsElement = document.querySelectorAll('.rental_detail_element');
    rentalDetailsElement.forEach(element => {
        element.addEventListener('click', function() {
            const rentalId = element.id;
            apiAction.getRequest(`https://localhost:44372/api/Rental/${rentalId}`, rental => {
                appDiv.innerHTML = RentalDetailView(rental);
                apiAction.getRequest(`https://localhost:44372/api/EquipmentList/GetMultiple/${rental.equipmentIds}`, equipmentList =>{
                    const equipmentListDiv = document.getElementById('equipmentList');
                    equipmentListDiv.innerHTML = PopulateEquipmentList(equipmentList);
                })
            })
        })
    })
}

function RentalDetailView(data){
    var rentalStatus = "";
    if(data.isApproved == true){
        rentalStatus = "Approved";
    }
    else if(data.isDenied == true){
        rentalStatus = "Denied";
    }
    else{
        rentalStatus = "Pending";
    }

    return`
        <br/>
        <h4>Request Status: ${rentalStatus}</h4>
        <h4>Date: ${data.rentalDate}</h4>
        <h4>User: ${data.user.name}</h4>
        <br/>
        <div id="equipmentList"></div>
        <br/>
        <p>${data.feedBack}</p>
    `
}