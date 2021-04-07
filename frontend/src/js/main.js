import Home from "./components/Home";
import Header from "./components/Header";

const appDiv = document.getElementById('app');

export default() => {
 appDiv.innerHTML = "Test";
 Header.SetupHeader();
 Home.NavHome();
}
