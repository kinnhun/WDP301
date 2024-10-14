import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
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
