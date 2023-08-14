import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import NavBar from "../navBar/NavBar";
import AppRouter from "../appRouter/AppRouter";

function App() {
  return (
  <Router>
    <NavBar></NavBar>
    <AppRouter></AppRouter>
  </Router>);
}

export default App;
