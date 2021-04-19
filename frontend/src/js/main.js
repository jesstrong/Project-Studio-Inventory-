import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EquipmentList from "./components/EquipmentList";
import User from "./components/User";
import Rental from "./components/Rental";
import CategoryList from "./components/CategoryList";
import Profile from "./components/Profile";
import ContactPage from "./components/ContactPage";

const appDiv = document.getElementById('app');

export default() => {
 appDiv.innerHTML = Home.Home();
 Header.SetupHeader();
 Footer.SetupFooter();
 Home.NavHome();
 EquipmentList.NavEquipmentList();
 CategoryList.NavCategoryList();
 User.NavSignUp();
 User.NavLogin();
 Rental.NavRentalForm();
 Profile.NavUserProfile();
 ContactPage.ContactPage();
 ContactPage.NavContact();
}

//test comment