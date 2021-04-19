import apiAction from "../api/api-actions";
import CategoryUpdate from "./CategoryUpdate";
import cookieAction from "../cookie/cookie-actions";

export default {
    NavCategoryList
}

const appDiv = document.getElementById('app');
const categoryURL = "https://localhost:44372/api/Category/";

function AdminCategoryList(CategoryList){
    return `
    <h1>Categories</h1>
    <ol>
        ${CategoryList.map(category =>{
            return `
                <li>
                    <h4 class="category_name_user" id="${category.id}">${category.name}</h4>
                    <button class="updateCategoryBtn" id="${category.id}">Update Item</button>
                    <button class="deleteCategoryBtn" id="${category.id}">Delete Item</button>
                </li>
            `
        }).join('')}
    </ol>

    <section class="categoryForm">
            <input type="text" id="categoryName" placeholder='Enter the name of this category' />
            <div id='helpName' class="text-danger"></div>
            <button id="saveCategoryBtn">Save Item</button>
        </section>

    `
}

function UserCategoryList(CategoryList){
    return `
    <h1>Categories</h1>
    <ol>
        ${CategoryList.map(category =>{
            return `
                <li>
                    <h4 class="category_name_user" id="${category.id}">${category.name}</h4>
                </li>
            `
        }).join('')}
    </ol>
    `
}

function CategorySingle(Category){
    return `
    <section class="category">
        <h1>${Category.name}</h1>
        <div class="equipment_list">
            ${Category.equipmentList.map(item =>{
                console.log(item);
                return `
                    <article>
                        <h3 class="equipment_name">${item.name}</h3>
                        <img src="${item.image}" class="equipment_image">
                        <p class="equipment_description">${item.description}</p>
                    </article>
                    `
                }).join('')}
        </div>
    </section>
    `
}

function NavCategorySingle(){
    const categoryNameElements = document.querySelectorAll(".category_name_user");
    categoryNameElements.forEach(element =>{
        element.addEventListener("click", function(){
            const categoryId = element.id;
            apiAction.getRequest(`https://localhost:44372/api/Category/${categoryId}`, data =>{
                appDiv.innerHTML = CategorySingle(data);
            })
        })
    })
}


function NavCategoryList() {
    const homeLink = document.querySelector(".nav_category");
    
    homeLink.addEventListener('click', function (){
        apiAction.getRequest(categoryURL, data => {
            var isAdmin = cookieAction.getCookie("userIsAdmin");
            if(isAdmin === "true"){
                appDiv.innerHTML = AdminCategoryList(data);
                AddCategory();
                UpdateCategoryBtn();
                RemoveCategory();
                NavCategorySingle();
            }
            else{
                appDiv.innerHTML = UserCategoryList(data);
                NavCategorySingle();
            }
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
        if(categoryName == "")
        {
            document.getElementById('helpName').innerText = "*This Field Is Required.";
        } 
        else{
            apiAction.postRequest(categoryURL, requestBody, () => {
                apiAction.getRequest(categoryURL, data => {
                    appDiv.innerHTML = CategoryList(data);
                    AddCategory();
                    UpdateCategoryBtn();
                    RemoveCategory();
                })
            })
        }
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