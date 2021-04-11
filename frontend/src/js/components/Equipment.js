import apiAction from "../api/api-actions";

export default{
    Equipment
}

const appDiv = document.getElementById('app');

function Equipment(equipment){
    return `
    <h1>Edit Equipment</h1>
        <section class='equipmentForm'>
            <input type='text' id='equipmentName' value='${equipment.name}' />
            <input type='hidden' id='categoryId' value='${equipment.categoryId}' />
            <input type='hidden' id='equipmentId' value='${equipment.id}' />
            <button id='btnEditEquipment'>Save</button>
        </section>
    `
}

function UpdateEquipment(){
    const updateEquipmentBtn = document.querySelector('.updateEquipmentBtn');
    updateEquipmentBtn.addEventListener('click', function(){
        const equipId = document.getElementById('equipmentId').value;
        const equipName = documeny.getElementById('equipmentName').value;
        const serialNum = document.getElementById('serialNumber').value;
        const categoryId = document.getElementById('category').value;
        const requestBody = {
            Name: equipName,
            SerialNumber: serialNum,
            CategoryId: categoryId 
        }
        apiAction.putRequest('https://localhost:44372/api/EquipmentList', requestBody, data => {
            appDiv.innerHTML = EquipmentList(data);
            AddEquipment();
            UpdateEquipment();
            FillCategories();
        })
    })
}