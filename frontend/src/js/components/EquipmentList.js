import apiAction from "../api/api-actions";
import Equipment from "../components/Equipment";
import cookieAction from "../cookie/cookie-actions";

export default{
    NavEquipmentList,
    AdminEquipmentList,
    FillCategories,
    CategoryDropdownNav,
    UpdateEquipmentBtn,
    AddEquipment,
    RemoveEquipment
}

const appDiv = document.getElementById('app');
const equipmentURL = "https://localhost:44372/api/EquipmentList/";

function AdminEquipmentList(equipmentList){
    return `
    <section class="equipment">
        <h1>Equipment List</h1>
        <select id="category_dropdown"></select>
        <div class="equipment_list">
            ${equipmentList.map(equipment =>{
                return `
                    <article>
                        <h3 class="equipment_name" id="${equipment.id}">${equipment.name}</h3>
                        <img src="${equipment.image}" class="equipment_image" id="${equipment.id}">
                        <p class="equipment_category"><strong>${equipment.category.name}</strong></p>
                        <p class="equipment_description">${equipment.description.slice(0, 70)}<a class="description_link" id="${equipment.id}">...</a></p>
                        <button class="updateEquipmentBtn" id="${equipment.id}">Update Item</button>
                        <button class="deleteEquipmentBtn" id="${equipment.id}">Delete Item</button>
                    </article>
                    `
                }).join('')}
        </div>

        <section class="equipmentForm">
            <h3>Add Item</h3>
            <div id='helpRequired' class="text-danger">*Required</div>                
                <input type="text" id="equipmentName" placeholder='*Name' />            
                <input type="text" id="serialNumber" placeholder="*Serial Number" />               
                <input type = "text" id = "equipmentImage" placeholder = "*Image URL"/>               
                <select id="category">
                </select>
                <textarea rows="4" cols="100" id='description' placeholder='Description'></textarea>
                <input type='hidden' id='rentalDates' value=""/>
                <button id="saveEquipmentBtn">Save Item</button>
        </section>
    </section>
    `
}

function UserEquipmentList(equipmentList){
    return `
    <section class="equipment">
        <h1>Equipment List</h1>
        </br>
        <select id="category_dropdown"></select>
        <div class="equipment_list">
            ${equipmentList.map(equipment =>{
                return `
                    <article>
                        <h3 class="equipment_name" id="${equipment.id}">${equipment.name}</h3>
                        <img src="${equipment.image}" id="${equipment.id}" class="equipment_image">
                        <p class="equipment_category"><strong>${equipment.category.name}</strong></p>
                        <p class="equipment_description">${equipment.description.slice(0, 20)}</p>
                    </article>
                    `
                }).join('')}
        </div>
    </section>
    `
}

function NavEquipmentList() {
    const homeLink = document.querySelector(".nav_equipmentList");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
            var isAdmin = cookieAction.getCookie("userIsAdmin");
            if(isAdmin === "true"){
                appDiv.innerHTML = AdminEquipmentList(data);
                FillCategories('category');
                FillCategories('category_dropdown');
                CategoryDropdownNav();
                UpdateEquipmentBtn();
                AddEquipment();
                RemoveEquipment();
                NavEquipmentSingle();
            }
            else{
                appDiv.innerHTML = UserEquipmentList(data);
                FillCategories('category_dropdown');
                CategoryDropdownNav();
                NavEquipmentSingle();
            }
        })
    })
}

function NavEquipmentSingle(){
    const equipmentNameElements = document.querySelectorAll(".equipment_name, .equipment_image, .description_link");
    equipmentNameElements.forEach(element =>{
        element.addEventListener("click", function(){
            const equipmentId = element.id;
            apiAction.getRequest(`https://localhost:44372/api/EquipmentList/${equipmentId}`, data =>{
                appDiv.innerHTML = Equipment.UserEquipmentDetails(data);
            })
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
        const equipmentImage = document.getElementById('equipmentImage').value;
        const rentalDates = document.getElementById('rentalDates').value;
        const requestBody = {
            Name: equipName,
            SerialNumber: serialNum,
            CategoryId: categoryId,
            Description: description,
            Image: equipmentImage,
            RentalDates: rentalDates
        }

        if(equipName == "")
        {
            document.getElementById('helpRequired').innerText = "*You are missing required information.";            
        } 
        else if (serialNum == "")
        {
            document.getElementById('helpRequired').innerText = "*You are missing required information."; 
        } 
        else if(equipmentImage == "")
        {
            document.getElementById('helpRequired').innerText = "*You are missing required information."; 
        }
        else if(categoryId == "Select a Category"){

            document.getElementById('helpRequired').innerText = "*You are missing required information."; 
        }
        else{
            console.log(categoryId);
            apiAction.postRequest('https://localhost:44372/api/EquipmentList', requestBody, () => {
                apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
                    appDiv.innerHTML = AdminEquipmentList(data);
                    UpdateEquipmentBtn();
                    FillCategories('category');
                    FillCategories('category_dropdown');
                    AddEquipment();
                    RemoveEquipment();
                })
            })
        }
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

function FillCategories(dropdownId){
    let dropdown = document.getElementById(`${dropdownId}`);
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = '*Select a Category';
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

function CategoryDropdownNav(){
    const dropdownNavElement = document.getElementById("category_dropdown");
    dropdownNavElement.addEventListener('change', function() {
        const dropdownValue = dropdownNavElement.value;
        apiAction.getRequest(`https://localhost:44372/api/Category/${dropdownValue}`, category => {
            var isAdmin = cookieAction.getCookie("userIsAdmin");
            if(isAdmin === "true"){
                appDiv.innerHTML = AdminCategoryDropdownList(category);
                CategoryDropdownNav();
                FillCategories('category_dropdown');
                UpdateEquipmentBtn();
                FillCategories('category');
                AddEquipment();
                RemoveEquipment();
            }
            else{

                appDiv.innerHTML = UserCategoryDropdownList(category);
                CategoryDropdownNav();
                FillCategories('category_dropdown');
            }
        })
    })
}

function AdminCategoryDropdownList(category){
    return `
    <section class="equipment">
        <h1>${category.name} List</h1>
        </br>
        <select id="category_dropdown"></select>
        <div class="equipment_list">
            ${category.equipmentList.map(equipment =>{
                return `
                    <article>
                        <h3 class="equipment_name">${equipment.name}</h3>
                        <p class="equipment_description">${equipment.description}</p>
                        <button class="updateEquipmentBtn" id="${equipment.id}">Update Item</button>
                        <button class="deleteEquipmentBtn" id="${equipment.id}">Delete Item</button>
                    </article>
                    `
                }).join('')}
        </div>
        <section class="equipmentForm">
            <h3>Add Item</h3>
                <input type="text" id="equipmentName" placeholder='Enter the name of this equipment' />
                <div id='helpName' class="text-danger"></div>
                <input type="text" id="serialNumber" placeholder='Enter Serial Number' />
                <div id='helpSerial' class="text-danger"></div>
                <select id="category">
                </select>
                <br/>
                <input type='text' id='description' placeholder='Description' />
                <input type='hidden' id='rentalDates' value=""/>
                <button id="saveEquipmentBtn">Save Item</button>
        </section>
    </section>
    `
}

function UserCategoryDropdownList(category){
    return `
    <section class="equipment">
        <h1>${category.name} List</h1>
        </br>
        <select id="category_dropdown"></select>
        <div class="equipment_list">
            ${category.equipmentList.map(equipment =>{
                return `
                    <article>
                        <h3 class="equipment_name">${equipment.name}</h3>
                        <p class="equipment_description">${equipment.description}</p>
                    </article>
                    `
                }).join('')}
        </div>
    </section>
    `
}

function RemoveEquipment(){
    const updateEquipmentElement = document.querySelectorAll('.deleteEquipmentBtn');
    updateEquipmentElement.forEach(element => {
        element.addEventListener('click', function() {
            const equipmentId = element.id;
            apiAction.deleteRequest('https://localhost:44372/api/EquipmentList/', equipmentId, data => {
                if(data.indexOf("Deleted") > -1){
                    const liItem = document.getElementById(equipmentId).parentElement;
                    liItem.remove();
                }
            })
        })
    })
}