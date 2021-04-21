import apiAction from "../api/api-actions";
import Rental from "../components/Rental";

const appDiv = document.getElementById('app');

export default{
    ProfilePage,
    NavUserProfile,
    CancelRentalRequest
}

function ProfilePage(User){
    if(User.rentals == null)
    {
        User.rentals = [];
    }
    
    return `
    <h3>Welcome ${User.name}</h3>
    
    <h4>Here is a record of your rentals:</h4>
    <ul>
    ${User.rentals.map(rental =>{
        var cancelButton = "";
        if(rental.isApproved === false)
        {
            cancelButton = `<button class="cancelRequest" id="${rental.id}">Cancel</button>`
        }
        return `
        <li>
            <h4 class ="rental_detail_element" id ="${rental.id}">${rental.rentalDate}</h4>
            <p>Is approved: ${rental.isApproved}</p>
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
        Rental.RentalDetailslButton();
        CancelRentalRequest();
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

