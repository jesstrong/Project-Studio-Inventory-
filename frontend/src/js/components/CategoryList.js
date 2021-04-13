import apiAction from "../api/api-actions";

export default {

}

const appDiv = document.getElementById('app');
const categoryURL = "https://localhost:44372/api/Category/";

function CategoryList(CategoryList){
    return `
    <h1>Categories</h1>
    <ol>
        ${category.map(category =>{
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