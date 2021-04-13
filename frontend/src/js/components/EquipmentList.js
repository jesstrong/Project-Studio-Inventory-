import apiAction from "../api/api-actions";
import Equipment from "../components/Equipment";

export default{
    EquipmentList,
    NavEquipmentList,
    AddEquipment,
    UpdateEquipmentBtn,
    FillCategories,
    RemoveEquipment
}

const appDiv = document.getElementById('app');
const equipmentURL = "https://localhost:44372/api/EquipmentList/";

function EquipmentList(equipmentList){
    return `
    <h1>Equipment List</h1>
    <ol>
        ${equipmentList.map(equipment =>{
            return `
                <li>
                    <h4 class="equipment_name">${equipment.name}</h4>
                    <button class="updateEquipmentBtn" id="${equipment.id}">Update Item</button>
                    <button class="deleteEquipmentBtn" id="${equipment.id}">Delete Item</button>
                </li>
            `
        }).join('')}
    </ol>

    <section class="equipmentForm">
            <input type="text" id="equipmentName" placeholder='Enter the name of this equipment' />
            <input type="text" id="serialNumber" placeholder='Enter Serial Number' />
            <select id="category">
            </select>
            <br/>
            <input type='text' id='description' placeholder='Decription' />
            <input type='hidden' id='rentalDates' value=""/>
            <button id="saveEquipmentBtn">Save Item</button>
        </section>

    `
}

function NavEquipmentList() {
    const homeLink = document.querySelector(".nav_equipmentList");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
            appDiv.innerHTML = EquipmentList(data);
            UpdateEquipmentBtn();
            FillCategories();
            AddEquipment();
            RemoveEquipment();
        })
    })
}

function AddEquipment(){
    const saveEquipmentButton = document.getElementById('saveEquipmentBtn');
    saveEquipmentButton.addEventListener('click', function(){
        const equipName = document.getElementById('equipmentName').value;
        const serialNum = document.getElementById('serialNumber').value;
        const categoryId = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const rentalDates = document.getElementById('rentalDates').value;
        const requestBody = {
            Name: equipName,
            SerialNumber: serialNum,
            CategoryId: categoryId,
            Description: description,
            RentalDates: rentalDates
        }
        apiAction.postRequest('https://localhost:44372/api/EquipmentList', requestBody, () => {
            apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
                appDiv.innerHTML = EquipmentList(data);
                UpdateEquipmentBtn();
                FillCategories();
                AddEquipment();
                RemoveEquipment();
            })
        })
    })
}

function UpdateEquipmentBtn(){
    const updateEquipmentElement = document.querySelectorAll('.updateEquipmentBtn');
    updateEquipmentElement.forEach(element => {
        element.addEventListener('click', function() {
            const equipmentId = element.id;
            apiAction.getRequest(`https://localhost:44372/api/EquipmentList/${equipmentId}`, equipment => {
                appDiv.innerHTML = Equipment.EquipmentDetails(equipment);
                Equipment.UpdateEquipment();
            })
        })
    })
}

function FillCategories(){
    let dropdown = document.getElementById('category');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select a Category';
    defaultOption.disabled = 'disabled';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    apiAction.getRequest('https://localhost:44372/api/Category', categories => {
        let option;
        categories.forEach(function(category){
            option = document.createElement('option');
            option.text = category.name;
            option.value = category.id;
            dropdown.add(option);
        })
    })
}

function RemoveEquipment(){
    const updateEquipmentElement = document.querySelectorAll('.deleteEquipmentBtn');
    updateEquipmentElement.forEach(element => {
        element.addEventListener('click', function() {
            const equipmentId = element.id;
            apiAction.deleteRequest('https://localhost:44372/api/EquipmentList', equipmentId, data => {
                if(data.indexOf("Deleted") > -1){
                    const liItem = document.getElementById(equipmentId).parentElement;
                    liItem.remove();
                }
            })
        })
    })
}