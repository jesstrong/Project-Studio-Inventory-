import apiAction from "../api/api-actions";
import cookieActions from "../cookie/cookie-actions";

const appDiv = document.getElementById('app');

export default{
ProfilePage,
NavUserProfile
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
        var blah = "";
        return `
        <li>
        <h4 class="equipment_name">${rental.rentalDate}</h4>
                <p>Is approved: ${rental.isApproved}</p>
            </li>
        `
    }).join('')}
    </ul>
    `
}

function NavUserProfile(userId){
    apiAction.getRequest(`https://localhost:44372/api/User/${userId}`, user => {
        appDiv.innerHTML = ProfilePage(user);
    })
}

