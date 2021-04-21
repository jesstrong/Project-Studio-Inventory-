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
    </br>
    <h3>Welcome ${User.name}</h3>
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

