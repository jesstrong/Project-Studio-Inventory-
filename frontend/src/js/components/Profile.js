import apiAction from "../api/api-actions";
import Rental from "../components/Rental";

const appDiv = document.getElementById('app');

export default{
    ProfilePage,
    NavUserProfile,
    CancelRentalRequest,
    UpdateProfileButton
}

function ProfilePage(User){
    if(User.rentals == null)
    {
        User.rentals = [];
    }
    
    return `
    </br>
    <h3>Welcome ${User.name}</h3>
    <button class="updateProfileBtn" id="${User.id}">Update Profile</button>
    </br>
    <h4>Here is a record of your rentals:</h4>
    <ul>
    ${User.rentals.map(rental =>{
        var cancelButton = "";
        var rentalStatus = "";

        if(rental.isApproved === false)
        {
            cancelButton = `<button class="cancelRequest" id="${rental.id}">Cancel</button>`
        }

        if(rental.isApproved == true){
            rentalStatus = "Approved";
        }
        else if (rental.isDenied == true){
            rentalStatus = "Denied";
        }
        else{
            rentalStatus = "Pending";
        }

        return `
        <li>
        </br>
            <h4 class ="rental_detail_element" id ="${rental.id}">${rental.rentalDate}</h4>
            <p>Request Status: ${rentalStatus}</p>
            ${cancelButton}
        </li>
        `
    }).join('')}
    </ul>
    `
}

function NavUserProfile(userId){
    apiAction.getRequest(`https://localhost:44372/api/User/${userId}`, user => {
        appDiv.innerHTML = ProfilePage(user);
        Rental.RentalDetailsButton();
        CancelRentalRequest();
        UpdateProfileButton();
    })
}

function CancelRentalRequest(){
    const cancelRentalElement = document.querySelectorAll('.cancelRequest');
    cancelRentalElement.forEach(element => {
      element.addEventListener('click',function(){
          const rentalId = element.id;
          apiAction.deleteRequest('https://localhost:44372/api/Rental/', rentalId, data => {  
            if(data.indexOf("denied!") > -1){
                    const liItem = document.getElementById(rentalId).parentElement;
                    liItem.remove();
            }
        })
      })  
    })
}

function UpdateProfileButton(){
    const updateProfileElement = document.querySelector('.updateProfileBtn')
    updateProfileElement.addEventListener('click', function(){
        const userId = updateProfileElement.id;
        apiAction.getRequest(`https://localhost:44372/api/User/${userId}`, user => {
            appDiv.innerHTML = UpdateProfilePage(user);
            UpdateUserButton(user);
        })
    })
}

function UpdateProfilePage(data){
    return`
        <section class='updateProfileForm'>
            </br>
            <input type='text' id='userName' value='${data.name}' />
            <br/>
            <input type='password' id='newPassword' placeholder='New Password'/>
            <br/>
            <input type='password' id='oldPassword' placeholder='Old Password'/>
            <br/>
            <button id='updateUserButton'>Update Profile</button>
            <div id="warningText"></div>
        </section>
    `
}

function UpdateUserButton(data){
    const updateUserElement = document.getElementById('updateUserButton');
    updateUserElement.addEventListener('click', function(){
        const oldUserName = data.name;
        const oldPassword = document.getElementById('oldPassword').value;
        var newUserName = document.getElementById('userName').value;
        var newPassword = document.getElementById('newPassword').value;
        const userId = data.id;
        const userIsAdmin = data.isAdmin;

        const userCheck = {
            Name: oldUserName,
            Password: oldPassword
        }

        var isUnique = true;
        
        
        apiAction.postRequest('https://localhost:44372/api/Account', userCheck, data =>{
            if(data.result == true){
                if(newUserName === ""){
                    newUserName = oldUserName;
                }
                if(newPassword === ""){
                    newPassword = oldPassword;
                }

                const requestBody = {
                    Id: userId,
                    Name: newUserName,
                    Password: newPassword,
                    IsAdmin: userIsAdmin
                }

                if(newUserName != oldUserName){
                    apiAction.getRequest('https://localhost:44372/api/User', users =>{
                        users.forEach(user => {
                            if (user.name === newUserName){
                                isUnique = false;
                            }
                        });

                        if(isUnique == true){
                            UpdateProfile(requestBody, userId);
                        }
                        else{
                            const warningElement = document.getElementById('warningText');
                            warningElement.innerHTML = "That User Name already exists.";
                        }
                    })
                }   
                else{
                    UpdateProfile(requestBody, userId);
                }
 
            }
            else{
                const warningElement = document.getElementById('warningText');
                warningElement.innerHTML = data.message;
            }
        })
    })
}

function UpdateProfile(requestBody, id){
    apiAction.putRequest('https://localhost:44372/api/User/', id, requestBody, user =>{
        appDiv.innerHTML = "Your profile has been updated";
    })
}