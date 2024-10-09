import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "../public/css/light.css";
import "../public/js/datatables.js";
import "../public/js/fullcalendar.js";
import "../public/js/settings.js";
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
