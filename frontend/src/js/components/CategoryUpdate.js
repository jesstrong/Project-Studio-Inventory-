import apiAction from "../api/api-actions";
import CategoryList from "./CategoryList";

export default{
EditCategoryForm,
UpdateCategory
}

const appDiv = document.getElementById('app');
const categoryURL = "https://localhost:44372/api/Category/";

function EditCategoryForm(category){
    return `
    <h1>Edit Category</h1>
        <section class='categoryForm'>
            <input type='text' id='categoryName' value='${category.name}' />
            <input type='hidden' id='categoryId' value='${category.id}' />
            <button id='btnUpdateCategory'>Save</button>
        </section>
    `
}

function UpdateCategory(){
    const updateCategoryBtn = document.getElementById('btnUpdateCategory');
    updateCategoryBtn.addEventListener('click', function(){
        const categoryName = document.getElementById('categoryName').value;
        const categoryId = document.getElementById('categoryId').value;
        const requestBody = {
            Id: categoryId,
            Name: categoryName
        }
        apiAction.putRequest(categoryURL, categoryId, requestBody, () => {
            apiAction.getRequest(categoryURL, data => {
                appDiv.innerHTML = CategoryList.AdminCategoryList(data);
                CategoryList.AddCategory();
                CategoryList.UpdateCategoryBtn();
                CategoryList.RemoveCategory();
            })
        })
    })
}

