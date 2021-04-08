import Home from "./components/Home";
import Header from "./components/Header";
import EquipmentList from "./components/EquipmentList";

const appDiv = document.getElementById('app');

export default() => {
 appDiv.innerHTML = "Test";
 Header.SetupHeader();
 Home.NavHome();
 EquipmentList.NavEquipmentList();
}
