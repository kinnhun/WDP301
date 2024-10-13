import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "./assets/css/light.css";
import "./assets/js/datatables.js";
import "./assets/js/fullcalendar.js";
import "./assets/js/settings.js";
import PublicRouter from "./routers/PublicRouter";
function App() {
  return (
    <div className="app">
      <PublicRouter />
      <Toaster position="top-right" reverseOrder="false" />
    </div>
  );
}

export default App;
