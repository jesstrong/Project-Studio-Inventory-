import Home from "./components/Home";
import Header from "./components/Header";
import EquipmentList from "./components/EquipmentList";
import User from "./components/User";
import CategoryList from "./components/CategoryList";

const appDiv = document.getElementById('app');

export default() => {
 appDiv.innerHTML = "Welcome to Studio Access Ally";
 Header.SetupHeader();
 Home.NavHome();
 EquipmentList.NavEquipmentList();
 User.NavProfile();
 CategoryList.NavCategoryList();
}
