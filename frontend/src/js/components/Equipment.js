import apiAction from "../api/api-actions";
import EquipmentList from "./EquipmentList";

export default{
    EquipmentDetails,
    UpdateEquipment,
    UserEquipmentDetails
}

const appDiv = document.getElementById('app');

function EquipmentDetails(equipment){
    return `
    <section class="equipmentDetails">
        <h1>Edit Equipment</h1>
        </br>
        <section class='equipmentForm'>
            <div class="inputDiv"> 
                <h5>Equipment Name:</h5>
                <input type='text' id='equipmentName' value='${equipment.name}' />
                <h5>Image URL:</h5>
                <input type='text' id='changeEquipmentImage' value='${equipment.image}' />
                <input type='hidden' id='categoryId' value='${equipment.categoryId}' />
                <input type='hidden' id='equipmentId' value='${equipment.id}' />
                <h5>Serial Number:</h5>
                <input type='text' id='serialNumber' value='${equipment.serialNumber}' />
            </div>
            <br/>
            <h5>Description:</h5>
            <textarea rows="4" cols="90" id='description'>${equipment.description}</textarea>
            <input type='hidden' id='rentalDates' value='' />
            </br>
            <button id='btnEditEquipment'>Save</button>
        </section>
    </section>    
    `
}

function UserEquipmentDetails(equipment){
    return `
    <section class="equipmentDetailPage">
        <h1>${equipment.name}</h1>
            <section class='equipmentView'>
                <img src="${equipment.image}" class='equipmentDetailsImage'>
                <br/>
                <div><em>${equipment.name}</em></div>
                <br/>
                <p>${equipment.description}</p>
                <br/>
            </section>
    <section>
    `
}

function UpdateEquipment(){
    const updateEquipmentBtn = document.getElementById('btnEditEquipment');
    updateEquipmentBtn.addEventListener('click', function(){
        const equipId = document.getElementById('equipmentId').value;
        const equipName = document.getElementById('equipmentName').value;
        const serialNum = document.getElementById('serialNumber').value;
        const categoryId = document.getElementById('categoryId').value;
        const description = document.getElementById('description').value;
        const changeEquipmentImage = document.getElementById('changeEquipmentImage').value;
        const rentalDates = document.getElementById('rentalDates').value;
        const requestBody = {
            Id: equipId,
            Name: equipName,
            SerialNumber: serialNum,
            CategoryId: categoryId,
            Description: description,
            Image: changeEquipmentImage,
            RentalDates: rentalDates
        }
        apiAction.putRequest('https://localhost:44372/api/EquipmentList/', equipId, requestBody, () => {
            apiAction.getRequest('https://localhost:44372/api/EquipmentList', data => {
                appDiv.innerHTML = EquipmentList.AdminEquipmentList(data);
                EquipmentList.FillCategories('category');
                EquipmentList.FillCategories('category_dropdown');
                EquipmentList.CategoryDropdownNav();
                EquipmentList.UpdateEquipmentBtn();
                EquipmentList.AddEquipment();
                EquipmentList.RemoveEquipment();
                EquipmentList.NavEquipmentSingle();
            })
        })
    })
}