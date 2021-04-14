import apiAction from "../api/api-actions";
import CategoryUpdate from "./CategoryUpdate";

export default {
CategoryList,
NavCategoryList,
AddCategory,
UpdateCategoryBtn,
RemoveCategory
}

const appDiv = document.getElementById('app');
const categoryURL = "https://localhost:44372/api/Category/";

function CategoryList(CategoryList){
    return `
    <h1>Categories</h1>
    <ol>
        ${CategoryList.map(category =>{
            return `
                <li>
                    <h4 class="category_name">${category.name}</h4>
                    <button class="updateCategoryBtn" id="${category.id}">Update Item</button>
                    <button class="deleteCategoryBtn" id="${category.id}">Delete Item</button>
                </li>
            `
        }).join('')}
    </ol>

    <section class="categoryForm">
            <input type="text" id="categoryName" placeholder='Enter the name of this category' />
            <button id="saveCategoryBtn">Save Item</button>
        </section>

    `
}

function NavCategoryList() {
    const homeLink = document.querySelector(".nav_category");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest(categoryURL, data => {
            appDiv.innerHTML = CategoryList(data);
            AddCategory();
            UpdateCategoryBtn();
            RemoveCategory();
        })
    })
}

function AddCategory(){
    const saveCategoryButton = document.getElementById('saveCategoryBtn');
    saveCategoryButton.addEventListener('click', function(){
        const categoryName = document.getElementById('categoryName').value;
        const requestBody = {
            Name: categoryName
        }
        apiAction.postRequest(categoryURL, requestBody, () => {
            apiAction.getRequest(categoryURL, data => {
                appDiv.innerHTML = CategoryList(data);
                AddCategory();
                UpdateCategoryBtn();
                RemoveCategory();
            })
        })
    })
}

function UpdateCategoryBtn(){
    const updateCategoryElement = document.querySelectorAll('.updateCategoryBtn');
    updateCategoryElement.forEach(element => {
        element.addEventListener('click', function() {
            const categoryId = element.id;
            apiAction.getRequest(`https://localhost:44372/api/Category/${categoryId}`, category => {
                appDiv.innerHTML = CategoryUpdate.EditCategoryForm(category);
                CategoryUpdate.UpdateCategory();
            })
        })
    })
}

function RemoveCategory(){
    const updateCategoryElement = document.querySelectorAll('.deleteCategoryBtn');
    updateCategoryElement.forEach(element => {
        element.addEventListener('click', function() {
            const categoryId = element.id;
            apiAction.deleteRequest(categoryURL, categoryId, data => {
                if(data.indexOf("Deleted") > -1){
                    const liItem = document.getElementById(categoryId).parentElement;
                    liItem.remove();
                }
            })
        })
    })
}