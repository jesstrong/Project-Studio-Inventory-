import apiAction from "../api/api-actions";
import EquipmentList from "./EquipmentList";

export default{
    EquipmentDetails,
    UpdateEquipment
}

const appDiv = document.getElementById('app');

function EquipmentDetails(equipment){
    return `
    <h1>Edit Equipment</h1>
        <section class='equipmentForm'>
            <input type='text' id='equipmentName' value='${equipment.name}' />
            <input type='hidden' id='categoryId' value='${equipment.categoryId}' />
            <input type='hidden' id='equipmentId' value='${equipment.id}' />
            <input type='text' id='serialNumber' value='${equipment.serialNumber}' />
            <button id='btnEditEquipment'>Save</button>
        </section>
    `
}

function UpdateEquipment(){
    const updateEquipmentBtn = document.getElementById('btnEditEquipment');
    updateEquipmentBtn.addEventListener('click', function(){
        const equipId = document.getElementById('equipmentId').value;
        const equipName = document.getElementById('equipmentName').value;
        const serialNum = document.getElementById('serialNumber').value;
        const categoryId = document.getElementById('categoryId').value;
        const requestBody = {
            Id: equipId,
            Name: equipName,
            SerialNumber: serialNum,
            CategoryId: categoryId 
        }
        apiAction.putRequest('https://localhost:44372/api/EquipmentList/', equipId, requestBody, data => {
            apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
                appDiv.innerHTML = EquipmentList.EquipmentList(data);
                EquipmentList.UpdateEquipmentBtn();
                EquipmentList.FillCategories();
                EquipmentList.AddEquipment();
                EquipmentList.RemoveEquipment();
            })
        })
    })
}