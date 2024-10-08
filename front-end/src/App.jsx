import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import '../public/css/light.css';
import "../public/js/datatables.js";
import "../public/js/fullcalendar.js";
import "../public/js/settings.js";
import Header from "../src/components/general/Header.jsx";
import Sidebar from "../src/components/general/Sidebar.jsx";
import PublicRouter from "./routers/PublicRouter";
function App() {
  return (
    <div className="app">
      <div className="d-flex">
        <Sidebar />
        <div className="main flex-grow-1">
          <Header />

          <div className="container mt-4">
          <PublicRouter />
          <Toaster position="top-right" reverseOrder="false" />
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
