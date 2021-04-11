import Home from "./components/Home";
import Header from "./components/Header";
import EquipmentList from "./components/EquipmentList";
// import Equipment from "./components/Equipment";

const appDiv = document.getElementById('app');

export default() => {
 appDiv.innerHTML = "Welcome to Studio Access Ally";
 Header.SetupHeader();
 Home.NavHome();
 EquipmentList.NavEquipmentList();
 EquipmentList.AddEquipment();
 EquipmentList.UpdateEquipmentBtn();
//  Equipment.Equipment();
}
