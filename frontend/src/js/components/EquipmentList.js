import apiAction from "../api/api-actions";

export default{
    EquipmentList,
    NavEquipmentList,
    AddEquipment
}

const appDiv = document.getElementById('app');

function EquipmentList(equipmentList){
    return `
    <h1>Equipment List</h1>
    <ol>
        ${equipmentList.map(equipment =>{
            return `
                <li>
                    <h4 class="equipment_name" id="${equipment.id}">${equipment.name}</h4>
                </li>
            `
        }).join('')}
    </ol>

    <section class="equipmentForm">
            <input type="text" id="equipmentName" placeholder='Enter the name of this equipment' />
            <input type="text" id="serialNumber" placeholder='Enter Serial Number' />
            <select id="category">
            </select>
            <button id="saveEquipmentBtn">Save Item</button>
        </section>

    `
}

function NavEquipmentList() {
    const homeLink = document.querySelector(".nav_equipmentList");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
            appDiv.innerHTML = EquipmentList(data);
            fillCategories();
            AddEquipment();
        })
    })
}

function AddEquipment(){
    const saveEquipmentButton = document.getElementById('saveEquipmentBtn');
    saveEquipmentButton.addEventListener('click', function(){
        const equipName = document.getElementById('equipmentName').value;
        const serialNum = document.getElementById('serialNumber').value;
        const categoryId = document.getElementById('category').value;
        const requestBody = {
            Name: equipName,
            SerialNumber: serialNum,
            CategoryId: categoryId
        }
        apiAction.postRequest('https://localhost:44372/api/EquipmentList', requestBody, data => {
            appDiv.innerHTML = EquipmentList(data);
            AddEquipment();
        } )

    })
}

function fillCategories(){
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