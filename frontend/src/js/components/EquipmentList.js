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
                    ${equipment.name} 
                </li>
            `
        }).join('')}
    </ol>

    <section class="equipmentForm">
            <input type="text" id="equipmentName" placeholder='Enter the name of this equipment' />
            <input type="text id="serialNumber" placeholder='Enter Serial Number' />
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
        })
    })
}

function AddEquipment(){
    const saveEquipmentButton = document.getElementById('saveEquipmentBtn');
    saveEquipmentButton.addEventListener('click', function(){
        const equipmentName = document.getElementById('equipmentName').value;
        const serialNumber = document.getElementById('serialNumber').value;
        const categoryId = document.getElementById('category').value;
        const requestBody = {
            Name: equipmentName,
            SerialNumber: serialNumber,
            CategoryId: categoryId
        }
        apiAction.postRequest('https://localhost:44372/api/EquipmentList', requestBody, data => {
            appDiv.innerHTML = EquipmentList(data);
        } )

    })
}